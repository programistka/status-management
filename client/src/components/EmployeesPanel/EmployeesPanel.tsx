import { FiltersProvider } from "@/context/FiltersContext";
import EmployeesList from "@/components/EmployeesList/EmployeesList";
import Toolbar from "@/components/Toolbar/Toolbar";

const EmployeesPanel = () => (
  <FiltersProvider>
    <main className="px-8 pb-8">
      <Toolbar />
      <EmployeesList />
    </main>
  </FiltersProvider>
);

export default EmployeesPanel;
