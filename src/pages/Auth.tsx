import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

export default function Auth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  useEffect(() => {
    // Verificar se já está logado
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Buscar usuário pelo username para validar se existe
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, username")
        .eq("username", username)
        .maybeSingle();

      if (profileError || !profile) {
        toast.error("Usuário não encontrado");
        setLoading(false);
        return;
      }

      // Tentar login usando o padrão de email
      const { error } = await supabase.auth.signInWithPassword({
        email: `${username}@celular.local`,
        password,
      });

      if (error) {
        toast.error("Senha incorreta");
        setLoading(false);
        return;
      }

      toast.success("Login realizado com sucesso!");
      navigate("/");
    } catch (error: any) {
      toast.error("Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "var(--gradient-bg)" }}
    >
      <div className="w-full max-w-md">
        <div 
          className="rounded-2xl border-4 border-primary/40 p-8 space-y-6"
          style={{ background: "var(--gradient-wood)" }}
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 
              className="text-3xl font-bold text-transparent bg-clip-text"
              style={{ backgroundImage: "var(--gradient-gold)" }}
            >
              <Sparkles className="inline-block mr-2 h-8 w-8 text-primary" />
              TAVERNA DA SORTE
            </h1>
            <p className="text-muted-foreground">
              Entre com sua conta para jogar
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Nome de Usuário</Label>
              <Input
                id="username"
                type="text"
                placeholder="wonho1919"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Manter-me conectado
              </label>
            </div>

            <Button
              type="submit"
              disabled={loading}
              size="lg"
              className="w-full font-bold text-lg"
              style={{
                background: "var(--gradient-gold)",
                boxShadow: "var(--shadow-gold)",
              }}
            >
              {loading ? "Carregando..." : "Entrar"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
