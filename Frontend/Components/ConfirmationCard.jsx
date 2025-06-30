import React from "react";


const ConfirmationCard = ({title, description, setShowCard, confirmationFunction}) => {
    return (
        <>
            <div
            className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modalTitle"
            >
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <h2 id="modalTitle" className="text-xl font-bold text-gray-900 sm:text-2xl">{title}</h2>

                <div className="mt-4">
                <p className="text-pretty text-gray-700">
                    {description}
                </p>
                </div>

                <footer className="mt-6 flex justify-end gap-2">
                <button onClick={() => {setShowCard(false)}}
                    type="button"
                    className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </button>

                <button
                    onClick={confirmationFunction}
                    type="button"
                    className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                    Sure
                </button>
                </footer>
            </div>
            </div>
        </>
    )
}


export default ConfirmationCard