import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Auth() {
  const navigate = useNavigate();
  const { user, signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Verificar se já está logado
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await signIn(username.toLowerCase().trim());
      toast.success(`Bem-vindo, ${user.username}!`);
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Usuário não encontrado");
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
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Nome de Usuário</Label>
              <Input
                id="username"
                type="text"
                placeholder="wonho1919"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                required
                autoComplete="off"
                className="text-center text-lg"
              />
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