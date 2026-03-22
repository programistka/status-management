import { FiltersProvider } from "../../context/FiltersContext";
import EmployeesList from "../EmployeesList/EmployeesList";
import Toolbar from "../Toolbar/Toolbar";

const EmployeesPanel = () => (
  <FiltersProvider>
    <main className="px-8 pb-8">
      <Toolbar />
      <EmployeesList />
    </main>
  </FiltersProvider>
);

export default EmployeesPanel;
