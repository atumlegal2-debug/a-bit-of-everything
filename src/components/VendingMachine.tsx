import { useState, useEffect } from "react";
import { PlayerInventory } from "@/types/vending";
import { GachaMachine } from "@/components/GachaMachine";
import { CollectionView } from "@/components/CollectionView";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { availableDrinks } from "@/config/vendingMachineConfig";

export const VendingMachine = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { profile, updateBalance } = useProfile();
  const [showCollection, setShowCollection] = useState(false);
  const [inventory, setInventory] = useState<PlayerInventory>({
    coins: 0,
    drinks: [],
    collection: [],
  });
  const [loading, setLoading] = useState(true);

  // Carregar inventário do Supabase (apenas bebidas ganhas na taverna)
  useEffect(() => {
    const loadInventory = async () => {
      if (!user || !profile) return;

      try {
        // Carregar APENAS itens do tipo "drink" que foram ganhos na Taverna da Sorte
        const { data: items, error } = await supabase
          .from("inventory_items")
          .select("*")
          .eq("profile_id", user.id)
          .eq("item_type", "drink");

        if (error) throw error;

        // Converter para formato do inventário, mapeando imagens do config
        const drinks = items?.map(item => {
          // Buscar a bebida no config para pegar a imagem correta
          const drinkConfig = availableDrinks.find(d => d.id === item.item_name || d.name === item.item_name);
          
          return {
            drinkId: item.item_name,
            quantity: item.quantity,
            drink: {
              id: item.item_name,
              name: item.item_name,
              image: drinkConfig?.image || item.image_url || "",
              health: drinkConfig?.health || 0,
              thirst: drinkConfig?.thirst || 0,
              phrases: drinkConfig?.phrases || [],
            },
          };
        }) || [];

        const collection = [...new Set(items?.map(item => item.item_name) || [])];

        setInventory({
          coins: profile.wallet_balance,
          drinks,
          collection,
        });
      } catch (error: any) {
        console.error("Erro ao carregar inventário:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInventory();
  }, [user, profile]);

  // Sincronizar moedas com perfil
  useEffect(() => {
    if (profile) {
      setInventory(prev => ({
        ...prev,
        coins: profile.wallet_balance,
      }));
    }
  }, [profile]);

  const handleInventoryUpdate = async (newInventory: PlayerInventory) => {
    setInventory(newInventory);
    
    // Atualizar saldo no Supabase
    if (newInventory.coins !== inventory.coins) {
      await updateBalance(newInventory.coins);
    }

    // Salvar itens no inventário do Supabase
    if (user && newInventory.drinks.length > inventory.drinks.length) {
      const newDrink = newInventory.drinks.find(
        d => !inventory.drinks.find(old => old.drinkId === d.drinkId)
      );

      if (newDrink) {
        try {
          await supabase.from("inventory_items").insert({
            profile_id: user.id,
            item_name: newDrink.drink.name,
            item_type: "drink",
            quantity: newDrink.quantity,
            image_url: newDrink.drink.image,
          });
        } catch (error: any) {
          console.error("Erro ao salvar item:", error);
        }
      }
    }
  };

  const handleLogout = async () => {
    await signOut();
    toast.success("Logout realizado com sucesso!");
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center" style={{ background: "var(--gradient-bg)" }}>
        <div className="text-xl font-bold text-primary">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden" 
         style={{ background: "var(--gradient-bg)" }}>
      {/* Botão de Logout */}
      <div className="absolute top-4 right-4 z-50">
        <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </Button>
      </div>

      {showCollection ? (
        <CollectionView 
          inventory={inventory}
          onInventoryUpdate={handleInventoryUpdate}
          onBack={() => setShowCollection(false)} 
        />
      ) : (
        <GachaMachine
          inventory={inventory}
          onInventoryUpdate={handleInventoryUpdate}
          onShowCollection={() => setShowCollection(true)}
        />
      )}
    </div>
  );
};
