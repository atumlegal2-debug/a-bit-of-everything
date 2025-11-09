import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface LocalUser {
  id: string;
  username: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<LocalUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há sessão local
    const storedUser = localStorage.getItem("celular_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem("celular_user");
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (username: string) => {
    // Buscar usuário na tabela profiles
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("id, username")
      .eq("username", username)
      .maybeSingle();

    if (error || !profile) {
      throw new Error("Usuário não encontrado");
    }

    const localUser = { id: profile.id, username: profile.username };
    localStorage.setItem("celular_user", JSON.stringify(localUser));
    setUser(localUser);
    return localUser;
  };

  const signOut = async () => {
    localStorage.removeItem("celular_user");
    setUser(null);
  };

  return {
    user,
    session: user ? { user } : null,
    loading,
    signIn,
    signOut,
  };
};
