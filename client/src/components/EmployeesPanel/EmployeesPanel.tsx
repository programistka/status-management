import { FiltersProvider } from "@/context/FiltersContext";
import EmployeesList from "@/components/EmployeesList/EmployeesList";
import Toolbar from "@/components/Toolbar/Toolbar";

const EmployeesPanel = () => (
  <FiltersProvider>
    <div className="px-20 py-8">
      <main className="px-8 pb-8">
        <Toolbar />
        <EmployeesList />
      </main>
    </div>
  </FiltersProvider>
);

export default EmployeesPanel;
