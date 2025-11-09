import { useState, useEffect } from "react";
import { Drink, PlayerInventory } from "@/types/vending";
import { availableDrinks, GACHA_COST, SPIN_DURATION } from "@/config/vendingMachineConfig";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Sparkles, Package, Trophy } from "lucide-react";

interface GachaMachineProps {
  inventory: PlayerInventory;
  onInventoryUpdate: (inventory: PlayerInventory) => void;
  onShowCollection: () => void;
}

export const GachaMachine = ({ inventory, onInventoryUpdate, onShowCollection }: GachaMachineProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentHighlight, setCurrentHighlight] = useState(0);
  const [result, setResult] = useState<Drink | null>(null);

  const getDropChance = () => {
    const rand = Math.random() * 100;
    
    // 40% chance de não ganhar nada
    if (rand < 40) return null;
    
    // 60% chance de ganhar uma bebida aleatória
    const randomIndex = Math.floor(Math.random() * availableDrinks.length);
    return availableDrinks[randomIndex];
  };

  const handleSpin = () => {
    if (inventory.coins < GACHA_COST) {
      toast.error("Moedas insuficientes!", {
        description: `Você precisa de ${GACHA_COST} moedas de ouro.`,
      });
      return;
    }

    if (isSpinning) return;

    // Deduzir moedas
    const newInventory = {
      ...inventory,
      coins: inventory.coins - GACHA_COST,
    };
    onInventoryUpdate(newInventory);

    setIsSpinning(true);
    setResult(null);

    // Determinar resultado
    const prize = getDropChance();
    let currentIndex = 0;
    let speed = 50;
    const maxSpeed = 300;
    const acceleration = 1.08;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % availableDrinks.length;
      setCurrentHighlight(currentIndex);
      speed *= acceleration;

      if (speed >= maxSpeed) {
        clearInterval(interval);
        
        // Finalizar na bebida ganha ou em uma posição aleatória se não ganhou
        const finalIndex = prize 
          ? availableDrinks.findIndex(d => d.id === prize.id)
          : Math.floor(Math.random() * availableDrinks.length);
        
        setCurrentHighlight(finalIndex);
        setIsSpinning(false);

        setTimeout(() => {
          if (prize) {
            // Adicionar bebida ao inventário
            const existingDrink = newInventory.drinks.find(d => d.drinkId === prize.id);
            
            const updatedInventory = {
              ...newInventory,
              drinks: existingDrink
                ? newInventory.drinks.map(d =>
                    d.drinkId === prize.id
                      ? { ...d, quantity: d.quantity + 1 }
                      : d
                  )
                : [...newInventory.drinks, { drinkId: prize.id, quantity: 1, drink: prize }],
              collection: newInventory.collection.includes(prize.id)
                ? newInventory.collection
                : [...newInventory.collection, prize.id],
            };

            onInventoryUpdate(updatedInventory);
            setResult(prize);

            // Selecionar frase aleatória
            const randomPhrase = prize.phrases[Math.floor(Math.random() * prize.phrases.length)];

            toast.success(`🎉 Você ganhou: ${prize.name}!`, {
              description: randomPhrase,
              duration: 5000,
            });
          } else {
            toast.error("Que pena!", {
              description: "Desta vez você não ganhou nada. Tente novamente!",
            });
            setResult(null);
          }
        }, 500);
      }
    }, speed);
  };

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto p-4 gap-4">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text" 
            style={{ backgroundImage: "var(--gradient-gold)" }}>
          ⚔️ TAVERNA DA SORTE ⚔️
        </h1>
        <p className="text-muted-foreground">
          Teste sua sorte por {GACHA_COST} moedas de ouro!
        </p>
      </div>

      {/* Coins Display */}
      <div className="flex justify-center gap-4">
        <div className="px-6 py-3 rounded-lg border-2 border-primary/30" 
             style={{ background: "var(--gradient-secondary)" }}>
          <p className="text-xl font-bold text-primary">
            💰 {inventory.coins} Moedas
          </p>
        </div>
        <Button onClick={onShowCollection} variant="outline" size="lg">
          <Trophy className="mr-2 h-5 w-5" />
          Colecionador
        </Button>
      </div>

      {/* Gacha Display */}
      <div className="flex-1 rounded-xl border-4 border-primary/40 p-4 md:p-8"
           style={{ background: "var(--gradient-wood)" }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 h-full">
          {availableDrinks.map((drink, index) => (
            <div
              key={drink.id}
              className={`relative rounded-xl p-4 transition-all duration-300 border-4 ${
                currentHighlight === index && isSpinning
                  ? 'scale-110 shadow-2xl'
                  : 'scale-100'
              }`}
              style={{
                background: currentHighlight === index && isSpinning
                  ? "var(--gradient-gold)"
                  : "var(--gradient-stone)",
                borderColor: currentHighlight === index && isSpinning
                  ? 'hsl(var(--primary))'
                  : 'hsl(var(--border))',
              }}
            >
              <div className="aspect-square relative">
                <img
                  src={drink.image}
                  alt={drink.name}
                  className="w-full h-full object-contain drop-shadow-lg"
                />
                {currentHighlight === index && isSpinning && (
                  <Sparkles className="absolute top-0 right-0 text-primary animate-pulse" />
                )}
              </div>
              <div className="mt-2 text-center space-y-2">
                <p className="font-bold text-sm text-foreground truncate">
                  {drink.name}
                </p>
                <div className="flex justify-center gap-2">
                  <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-red-500/20 border border-red-500/50 text-red-600 dark:text-red-400 font-bold text-xs">
                    ❤️ {drink.health}
                  </span>
                  <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-blue-500/20 border border-blue-500/50 text-blue-600 dark:text-blue-400 font-bold text-xs">
                    💧 {drink.thirst}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spin Button */}
      <Button
        onClick={handleSpin}
        disabled={isSpinning || inventory.coins < GACHA_COST}
        size="lg"
        className="w-full h-16 text-xl font-bold"
      >
        {isSpinning ? (
          <>
            <Sparkles className="mr-2 h-6 w-6 animate-spin" />
            Girando...
          </>
        ) : (
          <>
            🎲 Tentar a Sorte ({GACHA_COST} moedas)
          </>
        )}
      </Button>

      {/* Inventory Summary */}
      <div className="rounded-lg border-2 border-border p-4" style={{ background: "var(--gradient-secondary)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            <span className="font-bold text-foreground">Sua Bolsa:</span>
          </div>
          <div className="flex gap-4 text-sm">
            {inventory.drinks.length === 0 ? (
              <span className="text-muted-foreground">Vazia</span>
            ) : (
              inventory.drinks.map((item) => (
                <div key={item.drinkId} className="flex items-center gap-1">
                  <img src={item.drink.image} alt="" className="w-6 h-6 object-contain" />
                  <span className="font-bold text-foreground">x{item.quantity}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};