import { useEffect, useState } from "react";
import { type Status } from "@/types";
import StatusSelect from "@/components/StatusSelect/StatusSelect";

interface CreateEmployeeModalProps {
  onClose: () => void;
}

const CreateEmployeeModal = ({ onClose }: CreateEmployeeModalProps) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status>("Working");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
      <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={onClose}
      >
        <div
            className="bg-white rounded-xl w-full max-w-md mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Create New User</h2>

            <div className="mb-5">
              <label className="block text-xs text-gray-400 mb-1">User name:</label>
              <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z]/g, ""))}
                  placeholder="Enter user name"
                  className="w-full border-0 border-b border-gray-200 pb-2 text-gray-800 text-base focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>

            <div className="mb-8">
              <label className="block text-xs text-gray-400 mb-1">Status:</label>
              <StatusSelect value={status} onChange={(s) => { if (s) setStatus(s); }} />
            </div>

            <div className="flex items-center gap-4">
              <button
                  onClick={onClose}
                  disabled={name.trim().length === 0}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-blue-500"
              >
                Create
              </button>
              <button
                  onClick={onClose}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CreateEmployeeModal;
