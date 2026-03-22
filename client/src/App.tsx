import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Header from "@/components/Header/Header";
import EmployeesPanel from "@/components/EmployeesPanel/EmployeesPanel";
import LoadingState from "@/components/LoadingState/LoadingState";
import ErrorState from "@/components/ErrorState/ErrorState";
import { resetEmployeesPromise } from "@/hooks/useEmployees";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <ErrorBoundary FallbackComponent={ErrorState} onReset={resetEmployeesPromise}>
        <Suspense fallback={<LoadingState />}>
          <EmployeesPanel />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
