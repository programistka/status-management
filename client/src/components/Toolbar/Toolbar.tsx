import CreateButton from "@/components/CreateButton/CreateButton";
import Filters from "@/components/Filters/Filters";

const Toolbar = () => (
  <div className="flex items-center gap-2 mb-8">
    <CreateButton />
    <Filters />
  </div>
);

export default Toolbar;
