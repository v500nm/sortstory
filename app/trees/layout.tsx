import ProtectedRoute from "@/components/ProtectedRoute";

export default function TreesLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedPlans={["student", "visualization", "hybrid", "institute"]} moduleName="Trees">
      {children}
    </ProtectedRoute>
  );
}
