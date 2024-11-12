import { NextRequest, NextResponse } from "next/server";
import Redis from "ioredis";

const redis = new Redis();

export async function POST(req: NextRequest) {
    try {
        const { draft } = await req.json();

        if (!draft.content || draft.content.trim().length === 0) {
            return NextResponse.json(
                { message: "Draft content cannot be empty" },
                { status: 400 }
            );
        }

        const draftId = `draft:${new Date().getTime()}`; // Create a unique ID for the draft
        await redis.hset("drafts", draftId, JSON.stringify(draft));

        return NextResponse.json(
            { message: "Draft saved successfully!", draftId },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error saving draft:", error);
        return NextResponse.json(
            { message: "Error saving draft", error },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        const drafts = await redis.hgetall("drafts");

        if (Object.keys(drafts).length === 0) {
            return NextResponse.json(
                { message: "No drafts found" },
                { status: 404 }
            );
        }

        const formattedDrafts = Object.keys(drafts).map((key) => ({
            id: key,
            ...JSON.parse(drafts[key]),
        }));

        return NextResponse.json(
            { message: "Drafts retrieved successfully", drafts: formattedDrafts },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error retrieving drafts:", error);
        return NextResponse.json(
            { message: "Error retrieving drafts", error },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { draftId } = await req.json();

        if (!draftId) {
            return NextResponse.json(
                { message: "Draft ID is required" },
                { status: 400 }
            );
        }

        const deleted = await redis.hdel("drafts", draftId);

        if (deleted === 0) {
            return NextResponse.json(
                { message: "Draft not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Draft deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting draft:", error);
        return NextResponse.json(
            { message: "Error deleting draft", error },
            { status: 500 }
        );
    }
}
