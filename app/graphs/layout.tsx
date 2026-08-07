import ProtectedRoute from "@/components/ProtectedRoute";

export default function GraphsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedPlans={["student", "visualization", "hybrid", "institute"]} moduleName="Graphs">
      {children}
    </ProtectedRoute>
  );
}
