'use client';

import React, { useState } from "react";
import AddScheduleModal from "@/app/components/AddScheduleModal";

const SchedulePage: React.FC = () => {
  // States for AddScheduleModal props
  const [addEventModal, setAddEventModal] = useState<boolean>(false);
  const [yourSchedule, setYourSchedule] = useState<AvailableScheduleItem[]>([]);
  const [selectedCell, setSelectedCell] = useState<SelectedCell>({
    day_id: 1,
    time_id: 1,
    day: "Monday",
    time: "9:00 AM",
  });
  const [content, setContent] = useState<string>("");
  const [minute, setMinute] = useState<number>(0);

  // Function to update the schedule
  const updateYourSchedule = (newSchedule: AvailableScheduleItem[]) => {
    setYourSchedule(newSchedule);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-12 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">
        Schedule a Post
      </h1>

      <button
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={() => setAddEventModal(true)}
      >
        Open Schedule Modal
      </button>

      <div className="mt-12 w-full lg:w-3/4">
        {yourSchedule.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {yourSchedule.map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-md border border-gray-200 transition-transform transform hover:scale-105"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.day} - {item.time}
                </h2>
                <p className="text-gray-600">{item.content}</p>
                <span className="mt-2 inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
                  {item.minutes} minutes past
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-700 text-xl mt-8">
            No scheduled posts yet. Start adding your events!
          </p>
        )}
      </div>

      <AddScheduleModal
        setAddEventModal={setAddEventModal}
        updateYourSchedule={updateYourSchedule}
        addEventModal={addEventModal}
        selectedCell={selectedCell}
        yourSchedule={yourSchedule}
        content={content}
        minute={minute}
        setContent={setContent}
        setMinute={setMinute}
      />
    </div>
  );
};

export default SchedulePage;
