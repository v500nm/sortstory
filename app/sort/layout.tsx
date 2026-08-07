import ProtectedRoute from "@/components/ProtectedRoute";

export default function SortLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedPlans={["student", "visualization", "hybrid", "institute"]} moduleName="Sorting Visualizer">
      {children}
    </ProtectedRoute>
  );
}
