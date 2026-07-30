import ProtectedRoute from "@/components/ProtectedRoute";

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedPlans={["student", "learning", "hybrid", "institute"]} moduleName="Learn Curriculum">
      {children}
    </ProtectedRoute>
  );
}
