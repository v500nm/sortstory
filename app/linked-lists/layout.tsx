import ProtectedRoute from "@/components/ProtectedRoute";

export default function LinkedListsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedPlans={["student", "visualization", "hybrid", "institute"]} moduleName="Linked Lists">
      {children}
    </ProtectedRoute>
  );
}
