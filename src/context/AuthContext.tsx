import type { Session, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// Created by the Supabase teammate: must export `supabase` (the configured client).
import { supabase } from "@/lib/supabase";

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  // true while the saved session is being restored on app launch
  loading: boolean;
  signOut: () => Promise<{ error: string | null }>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Restore any session saved on the device.
    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (mounted) setSession(data.session);
      })
      .catch(() => {
        // Treat a failed restore as signed out instead of crashing.
        if (mounted) setSession(null);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    // Keep state in sync with sign-in, sign-out and token refreshes.
    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      return { error: error ? "Couldn't sign out. Check your connection and try again." : null };
    } catch {
      return { error: "Couldn't sign out. Check your connection and try again." };
    }
  }

  return (
    <AuthContext.Provider value={{ session, user: session?.user ?? null, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside <AuthProvider>.");
  return value;
}
