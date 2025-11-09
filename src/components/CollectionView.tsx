import { PlayerInventory } from "@/types/vending";
import { availableDrinks } from "@/config/vendingMachineConfig";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock } from "lucide-react";

interface CollectionViewProps {
  inventory: PlayerInventory;
  onBack: () => void;
}

export const CollectionView = ({ inventory, onBack }: CollectionViewProps) => {
  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto p-4 gap-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button onClick={onBack} variant="outline" size="icon">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text" 
              style={{ backgroundImage: "var(--gradient-gold)" }}>
            📜 COLECIONADOR
          </h1>
          <p className="text-muted-foreground">
            {inventory.collection.length} / {availableDrinks.length} bebidas coletadas
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-4 rounded-full border-2 border-primary/30 overflow-hidden"
           style={{ background: "var(--gradient-stone)" }}>
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${(inventory.collection.length / availableDrinks.length) * 100}%`,
            background: "var(--gradient-gold)",
          }}
        />
      </div>

      {/* Collection Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {availableDrinks.map((drink) => {
          const isUnlocked = inventory.collection.includes(drink.id);
          const inventoryItem = inventory.drinks.find(d => d.drinkId === drink.id);
          const quantity = inventoryItem?.quantity || 0;

          return (
            <div
              key={drink.id}
              className="relative rounded-xl p-4 border-4 border-primary/30 transition-all"
              style={{
                background: isUnlocked ? "var(--gradient-wood)" : "var(--gradient-stone)",
                filter: isUnlocked ? 'none' : 'grayscale(100%) brightness(0.3)',
              }}
            >
              {/* Quantity Badge */}
              {isUnlocked && quantity > 0 && (
                <div className="absolute top-2 left-2 text-sm font-bold px-2 py-1 rounded-full bg-primary text-primary-foreground">
                  x{quantity}
                </div>
              )}

              {/* Lock Overlay */}
              {!isUnlocked && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="w-12 h-12 text-muted-foreground" />
                </div>
              )}

              <div className="aspect-square relative">
                <img
                  src={drink.image}
                  alt={drink.name}
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>

              <div className="mt-3 space-y-2">
                <p className={`font-bold text-center truncate ${isUnlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {isUnlocked ? drink.name : "???"}
                </p>
                
                {isUnlocked && (
                  <div className="flex justify-center gap-2">
                    <span className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/20 border-2 border-red-500/50 text-red-600 dark:text-red-400 font-bold text-sm">
                      ❤️ {drink.health}
                    </span>
                    <span className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-500/20 border-2 border-blue-500/50 text-blue-600 dark:text-blue-400 font-bold text-sm">
                      💧 {drink.thirst}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg border-2 border-border"
           style={{ background: "var(--gradient-secondary)" }}>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">
            {inventory.drinks.reduce((sum, item) => sum + item.quantity, 0)}
          </p>
          <p className="text-sm text-muted-foreground">Total de Bebidas</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">{inventory.collection.length}</p>
          <p className="text-sm text-muted-foreground">Tipos Únicos</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">{inventory.coins}</p>
          <p className="text-sm text-muted-foreground">Moedas</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">
            {Math.round((inventory.collection.length / availableDrinks.length) * 100)}%
          </p>
          <p className="text-sm text-muted-foreground">Completado</p>
        </div>
      </div>
    </div>
  );
};