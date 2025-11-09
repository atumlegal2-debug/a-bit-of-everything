import { useState } from "react";
import { PlayerInventory, Drink } from "@/types/vending";
import { availableDrinks } from "@/config/vendingMachineConfig";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, Package } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CollectionViewProps {
  inventory: PlayerInventory;
  onBack: () => void;
}

export const CollectionView = ({ inventory, onBack }: CollectionViewProps) => {
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);

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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {availableDrinks.map((drink) => {
          const isUnlocked = inventory.collection.includes(drink.id);
          const inventoryItem = inventory.drinks.find(d => d.drinkId === drink.id);
          const quantity = inventoryItem?.quantity || 0;

          return (
            <div
              key={drink.id}
              onClick={() => isUnlocked && setSelectedDrink(drink)}
              className={`relative rounded-xl p-4 border-4 border-primary/30 transition-all ${
                isUnlocked ? 'cursor-pointer hover:scale-105 hover:shadow-xl' : ''
              }`}
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

      {/* Dialog de Detalhes */}
      <Dialog open={!!selectedDrink} onOpenChange={() => setSelectedDrink(null)}>
        <DialogContent className="max-w-2xl border-none p-0 gap-0 overflow-hidden bg-background/95 backdrop-blur-xl">
          {selectedDrink && (
            <div className="relative">
              {/* Header Moderno */}
              <div className="relative px-8 py-6 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border-b border-border/50">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold text-center text-foreground">
                    {selectedDrink.name}
                  </DialogTitle>
                </DialogHeader>
              </div>

              <div className="p-8 space-y-8">
                {/* Imagem e Stats lado a lado */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Imagem */}
                  <div className="relative aspect-square rounded-2xl p-6 bg-gradient-to-br from-primary/5 to-primary/10 border border-border/50 shadow-lg">
                    <img
                      src={selectedDrink.image}
                      alt={selectedDrink.name}
                      className="w-full h-full object-contain drop-shadow-2xl"
                    />
                  </div>

                  {/* Stats */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Atributos</h3>
                    
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-red-500/5 border border-red-500/20">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/20">
                        <span className="text-2xl">❤️</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground font-medium">Saúde</p>
                        <p className="text-2xl font-bold text-red-600 dark:text-red-400">+{selectedDrink.health}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/20">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20">
                        <span className="text-2xl">💧</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground font-medium">Sede</p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">+{selectedDrink.thirst}</p>
                      </div>
                    </div>

                    {/* Quantidade */}
                    {inventory.drinks.find(d => d.drinkId === selectedDrink.id) && (
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20">
                          <Package className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground font-medium">Inventário</p>
                          <p className="text-2xl font-bold text-primary">
                            x{inventory.drinks.find(d => d.drinkId === selectedDrink.id)?.quantity}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Frases com Design Limpo */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Frases Especiais</h3>
                  {selectedDrink.phrases.map((phrase, index) => (
                    <div 
                      key={index} 
                      className="p-5 rounded-xl bg-gradient-to-br from-secondary/50 to-secondary/30 border border-border/50 hover:border-primary/30 transition-all duration-300"
                    >
                      <p className="text-base text-foreground leading-relaxed font-medium">
                        "{phrase}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};