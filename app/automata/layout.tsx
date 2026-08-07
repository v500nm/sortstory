import ProtectedRoute from "@/components/ProtectedRoute";

export default function AutomataLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedPlans={["student", "visualization", "hybrid", "institute"]} moduleName="Automata & ML">
      {children}
    </ProtectedRoute>
  );
}
