import { Dialog, Transition } from "@headlessui/react";
import { CopilotTextarea } from "@copilotkit/react-textarea";
import { FormEventHandler, Fragment, Dispatch, SetStateAction } from "react";

interface Props {
	setAddEventModal: Dispatch<SetStateAction<boolean>>;
	updateYourSchedule: Dispatch<SetStateAction<AvailableScheduleItem[]>>;
	addEventModal: boolean;
	selectedCell: SelectedCell;
	yourSchedule: AvailableScheduleItem[];
	content: string;
	minute: number;
	setContent: Dispatch<SetStateAction<string>>;
	setMinute: Dispatch<SetStateAction<number>>;
}

export default function AddScheduleModal({
	setAddEventModal,
	addEventModal,
	selectedCell,
	updateYourSchedule,
	yourSchedule,
	content,
	minute,
	setContent,
	setMinute,
}: Props) {
	const closeModal = () => setAddEventModal(false);

	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		// Ensure minute is valid, content is not empty, and selected cell is valid
		if (
			Number(minute) < 60 &&
			content.trim().length > 0 &&
			selectedCell.time_id !== undefined &&
			selectedCell.day_id !== undefined
		) {
			const newSchedule = [...yourSchedule];
			const selectedDay =
				newSchedule[selectedCell.time_id].schedule[selectedCell.day_id - 1];
			// Add the new event to the schedule
			selectedDay.push({
				content,
				published: false,
				minutes: minute,
				day: selectedCell.day_id,
			});
			// Update the database with the new schedule
			updateScheduleDB(newSchedule);
		}
	};

	const updateScheduleDB = async (schedule: AvailableScheduleItem[]) => {
		try {
			// Make an API call to save the updated schedule to the backend
			const res = await fetch("/api/schedule", {
				method: "POST",
				body: JSON.stringify({ schedule }),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (res.ok) {
				const data = await res.json();
				updateYourSchedule(schedule); // Update local state with new schedule
				console.log(data);
				closeModal(); // Close the modal after saving
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const handleSaveAsDraft: FormEventHandler<HTMLButtonElement> = async () => {
		try {
			const draft = {
				content,
				minutes: minute,
				day: selectedCell.day_id,
				timeId: selectedCell.time_id,
			};

			const res = await fetch("/api/drafts", {
				method: "POST",
				body: JSON.stringify({ draft }),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (res.ok) {
				const data = await res.json();
				console.log(data.message);
				alert("Draft saved successfully!");
				closeModal();
			} else {
				const errorData = await res.json();
				console.error("Error saving draft:", errorData.message);
				alert("Failed to save draft.");
			}
		} catch (error) {
			console.error("Error:", error);
			alert("Failed to save draft.");
		}
	};

	return (
		<div>
			<Transition appear show={addEventModal} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-80" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-xl font-bold leading-6 text-gray-900"
									>
										Schedule a post on {selectedCell.day} by {selectedCell.time}
									</Dialog.Title>

									<form className="mt-2" onSubmit={handleSubmit}>
										{/* Display error if minute exceeds 59 */}
										{minute > 59 && (
											<p className="text-red-600">
												Error, please minute must be less than 60
											</p>
										)}
										<label htmlFor="minute" className="opacity-60">
											How many minutes past?
										</label>
										<input
											type="number"
											className="w-full border-[1px] px-4 py-2 rounded-md mb-2"
											name="minute"
											id="minute"
											value={minute}
											onChange={(e) => setMinute(parseInt(e.target.value, 10))}
											max={59}
											required
										/>

										<label htmlFor="content" className="opacity-60">
											Post content
										</label>
										{/* CopilotTextarea used for enhanced user experience */}
										<CopilotTextarea
											className="w-full border-[1px] px-4 py-2 rounded-md mb-2 text-sm"
											name="content"
											id="content"
											value={content}
											onValueChange={(value: string) => setContent(value)}
											required
											placeholder="What would you like to post about?"
											autosuggestionsConfig={{
												textareaPurpose:
													"Provide suggestions about the post content to help users write better posts.",
												chatApiConfigs: {
													suggestionsApiConfig: {
														maxTokens: 20,
														stop: [".", "?", "!"],
													},
												},
											}}
										/>

										<div className="mt-4 flex items-center justify-between space-x-4">
											<button
												type="submit"
												className="inline-flex justify-center rounded-md border border-transparent bg-blue-200 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
											>
												Save
											</button>

											<button
												type="button"
												className="inline-flex justify-center rounded-md border border-transparent bg-yellow-200 px-4 py-2 text-sm font-medium text-yellow-900 hover:bg-yellow-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
												onClick={handleSaveAsDraft}
											>
												Save as Draft
											</button>

											<button
												type="button"
												className="inline-flex justify-center rounded-md border border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
												onClick={closeModal}
											>
												Cancel
											</button>
										</div>
									</form>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
}
