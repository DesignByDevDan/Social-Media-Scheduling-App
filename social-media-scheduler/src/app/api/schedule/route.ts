import { NextRequest, NextResponse } from "next/server";
import { scheduleJobs } from "@/worker";
import cron from "node-cron";
import Redis from "ioredis";

const redis = new Redis();
let cronTask: cron.ScheduledTask | null = null;

export async function POST(req: NextRequest) {
    const { schedule } = await req.json();

    try {
        // Save schedule to Redis
        await redis.set("schedule", JSON.stringify(schedule));

        // Clear any existing cron tasks to avoid duplicate schedules
        if (cronTask) {
            cronTask.stop();
            cronTask = null;
        }

        // Schedule a new cron job
        cronTask = cron.schedule("15 * * * * *", async () => {
            console.log("Triggering jobs...");
            await scheduleJobs(schedule);
        });

        return NextResponse.json(
            { message: "Schedule updated!", schedule },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating schedule:", error);
        return NextResponse.json(
            { message: "Error updating schedule", error },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        // Get the schedule from Redis
        const schedule = await redis.get("schedule");

        if (schedule) {
            return NextResponse.json(
                { message: "Schedule found", schedule: JSON.parse(schedule) },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { message: "No schedule found" },
                { status: 404 }
            );
        }
    } catch (error) {
        console.error("Error fetching schedule:", error);
        return NextResponse.json(
            { message: "Error fetching schedule", error },
            { status: 500 }
        );
    }
}
