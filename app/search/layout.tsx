import ProtectedRoute from "@/components/ProtectedRoute";

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedPlans={["student", "visualization", "hybrid", "institute"]} moduleName="Searching Visualizer">
      {children}
    </ProtectedRoute>
  );
}
