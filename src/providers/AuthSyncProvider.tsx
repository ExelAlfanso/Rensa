import { useAuthStore } from "@/stores/useAuthStore";
import { set } from "mongoose";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function AuthSyncProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const { setUser, setAccessToken, setLoading, clearAuth } = useAuthStore();
  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
    } else if (status === "authenticated" && session) {
      setUser(session.user);
      setAccessToken(session?.accessToken);
      setLoading(false);
    } else {
      clearAuth();
    }
  }, [status, session, setUser, setAccessToken, setLoading, clearAuth]);
  return <>{children}</>;
}
