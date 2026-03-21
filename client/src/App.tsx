import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Header from "./components/Header/Header";
import EmployeesPanel from "./components/EmployeesPanel/EmployeesPanel";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <ErrorBoundary
        fallback={
          <div className="px-8 py-4">
            <p className="text-red-500">Error loading employees</p>
          </div>
        }
      >
        <Suspense
          fallback={
            <div className="px-8 py-4">
              <p className="text-gray-500">Loading employees...</p>
            </div>
          }
        >
          <EmployeesPanel />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
