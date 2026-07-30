import ProtectedRoute from "@/components/ProtectedRoute";

export default function PathfindingLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedPlans={["student", "visualization", "hybrid", "institute"]} moduleName="Pathfinding Visualizer">
      {children}
    </ProtectedRoute>
  );
}
