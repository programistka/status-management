import Search from "../Search/Search";
import { useEmployees } from "../../hooks/useEmployees";

const EmployeesPanel = () => {
  const { employees, loading, error } = useEmployees();

  console.log("Employees:", employees);

  return (
    <main className="px-8 pb-8">
      <Search />
      <h2>Employees Panel</h2>
      <p>Test Employees Panel Content</p>
    </main>
  );
};

export default EmployeesPanel;
