import { useState } from "react";
import CreateUserModal from "../CreateUserModal/CreateUserModal";

const CreateButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-6 py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm transition-colors shrink-0 rounded-l-lg"
      >
        Create
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
      </button>
      {isModalOpen && <CreateUserModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default CreateButton;
