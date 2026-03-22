import CreateButton from "@/components/CreateButton/CreateButton";
import Filters from "@/components/Filters/Filters";

const Toolbar = () => (
  <div className="flex items-center mb-8 bg-white rounded-lg shadow-sm">
    <CreateButton />
    <Filters />
  </div>
);

export default Toolbar;
