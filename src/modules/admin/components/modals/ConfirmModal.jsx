import React from 'react';
import { FiAlertTriangle, FiX } from 'react-icons/fi';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirm", cancelText = "Cancel", isDestructive = false }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto h-full w-full p-4">
            <div className="relative w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                    onClick={onClose}
                    type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                >
                    <FiX className="w-5 h-5" />
                    <span className="sr-only">Close modal</span>
                </button>
                <div className="p-6 text-center">
                    <FiAlertTriangle className={`mx-auto mb-4 w-12 h-12 ${isDestructive ? 'text-red-500' : 'text-yellow-500'} dark:text-gray-200`} />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        {title || "Are you sure?"}
                    </h3>
                    <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                        {message}
                    </p>
                    <button
                        onClick={onConfirm}
                        type="button"
                        className={`text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 ${isDestructive
                                ? 'bg-red-600 hover:bg-red-800 focus:ring-red-300 dark:focus:ring-red-800'
                                : 'bg-blue-600 hover:bg-blue-800 focus:ring-blue-300 dark:focus:ring-blue-800'
                            }`}
                    >
                        {confirmText}
                    </button>
                    <button
                        onClick={onClose}
                        type="button"
                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
