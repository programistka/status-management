import { useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import CreateEmployeeModal from "@/components/CreateEmployeeModal/CreateEmployeeModal";

const CreateButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-6 py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm transition-colors shrink-0 rounded cursor-pointer"
      >
        Create
        <PlusIcon className="w-4 h-4" />
      </button>
      {isModalOpen && <CreateEmployeeModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default CreateButton;
