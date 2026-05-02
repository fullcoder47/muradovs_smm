import { Suspense } from "react";
import { LoginForm } from "@/components/admin/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#030303] px-4">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
