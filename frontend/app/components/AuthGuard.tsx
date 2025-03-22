"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { token, user, error, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("Client hydrating AuthGuard");
    if (loading) {
      console.log("Auth loading, skipping redirects");
      return;
    }

    if (token && user) {
      // Redirect from signin/signup to profile
      const authPages = ["/signin", "/signup/individual", "/signup/company"];
      if (authPages.includes(window.location.pathname)) {
        console.log("Redirecting to profile from auth page");
        router.push("/profile");
      }
    } else if (!token) {
      // Redirect to signin from protected routes
      const protectedRoutes = ["/cart", "/order/summary", "/profile"];
      if (protectedRoutes.includes(window.location.pathname)) {
        console.log("Redirecting to signin - no token");
        router.push("/signin");
      }
    }

    if (error && error.includes("Authentication failed")) {
      console.error("Authentication error:", error);
      logout();
      if (window.location.pathname !== "/signin") {
        router.push("/signin");
      }
    }
  }, [token, user, error, loading, router, logout]);

  return <>{children}</>;
}