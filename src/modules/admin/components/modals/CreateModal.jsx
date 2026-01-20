import React from 'react';
import { FiX } from 'react-icons/fi';

const CreateModal = ({ isOpen, onClose, title, children, width = "max-w-2xl" }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto h-full w-full p-4">
            <div className={`relative w-full ${width} bg-white rounded-lg shadow dark:bg-gray-700`}>
                {/* Header */}
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        <FiX className="w-5 h-5" />
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                {/* Body */}
                <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default CreateModal;
