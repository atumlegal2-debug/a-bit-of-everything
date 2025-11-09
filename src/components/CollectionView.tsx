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
        <DialogContent className="max-w-3xl max-h-[90vh] border-4 border-primary/40 p-0 gap-0 overflow-hidden"
                       style={{ background: "var(--gradient-bg)" }}>
          {selectedDrink && (
            <div className="flex flex-col h-full max-h-[90vh]">
              {/* Header Moderno Premium */}
              <div className="relative bg-gradient-to-br from-primary/95 via-primary/85 to-primary/75 overflow-hidden rounded-t-xl">
                {/* Padrão de Fundo Sutil */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_50%)]" />
                </div>
                
                {/* Elementos Decorativos Minimalistas */}
                <div className="absolute -top-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
                
                <div className="relative z-10 px-6 py-4 space-y-4">
                  {/* Botão Voltar Moderno */}
                  <Button
                    onClick={() => setSelectedDrink(null)}
                    variant="secondary"
                    size="sm"
                    className="bg-white/90 hover:bg-white text-primary border-0 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-lg"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar
                  </Button>
                  
                  {/* Nome da Bebida com Badge */}
                  <div className="space-y-2.5">
                    <div className="flex justify-center">
                      <span className="px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-semibold text-white/95 uppercase tracking-wide border border-white/20 shadow-sm">
                        Bebida Especial
                      </span>
                    </div>
                    
                    <DialogHeader>
                      <DialogTitle className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white drop-shadow-lg leading-tight px-4">
                        <span className="inline-block animate-fade-in">
                          {selectedDrink.name}
                        </span>
                      </DialogTitle>
                    </DialogHeader>
                  </div>
                </div>
                
                {/* Borda Inferior Moderna */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent shadow-sm" />
              </div>

              {/* Conteúdo Scrollável */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                {/* Grid: Imagem e Stats */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Imagem Medieval */}
                  <div className="relative aspect-square rounded-xl p-6 border-4 border-primary/40 shadow-2xl"
                       style={{ 
                         background: "var(--gradient-wood)",
                         boxShadow: "var(--shadow-gold)"
                       }}>
                    <div className="absolute top-2 left-2 text-4xl opacity-20">🏺</div>
                    <img
                      src={selectedDrink.image}
                      alt={selectedDrink.name}
                      className="w-full h-full object-contain drop-shadow-2xl"
                    />
                  </div>

                  {/* Stats Medieval */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-transparent bg-clip-text mb-4"
                        style={{ backgroundImage: "var(--gradient-gold)" }}>
                      ⚔️ Atributos Mágicos
                    </h3>
                    
                    {/* Saúde */}
                    <div className="relative p-4 rounded-xl border-3 border-red-500/40 overflow-hidden"
                         style={{ background: "var(--gradient-wood)" }}>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent" />
                      <div className="relative flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-red-500/50"
                             style={{ background: "var(--gradient-stone)" }}>
                          <span className="text-3xl">❤️</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-red-600 dark:text-red-400 font-bold uppercase tracking-wider">Saúde</p>
                          <p className="text-3xl font-bold text-red-600 dark:text-red-400">+{selectedDrink.health}</p>
                        </div>
                      </div>
                    </div>

                    {/* Sede */}
                    <div className="relative p-4 rounded-xl border-3 border-blue-500/40 overflow-hidden"
                         style={{ background: "var(--gradient-wood)" }}>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent" />
                      <div className="relative flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-blue-500/50"
                             style={{ background: "var(--gradient-stone)" }}>
                          <span className="text-3xl">💧</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">Sede</p>
                          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">+{selectedDrink.thirst}</p>
                        </div>
                      </div>
                    </div>

                    {/* Inventário */}
                    {inventory.drinks.find(d => d.drinkId === selectedDrink.id) && (
                      <div className="relative p-4 rounded-xl border-4 border-primary/40 overflow-hidden"
                           style={{ 
                             background: "var(--gradient-gold)",
                             boxShadow: "var(--shadow-gold)"
                           }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 animate-pulse" />
                        <div className="relative flex items-center gap-4">
                          <div className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-primary/50 bg-background/20">
                            <Package className="w-7 h-7 text-primary-foreground" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-primary-foreground/80 font-bold uppercase tracking-wider">Inventário</p>
                            <p className="text-3xl font-bold text-primary-foreground">
                              x{inventory.drinks.find(d => d.drinkId === selectedDrink.id)?.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Frases em Pergaminho - Melhor Legibilidade */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-transparent bg-clip-text flex items-center gap-2"
                      style={{ backgroundImage: "var(--gradient-gold)" }}>
                    📜 Lendas e Dizeres
                  </h3>
                  
                  {selectedDrink.phrases.map((phrase, index) => (
                    <div 
                      key={index} 
                      className="relative p-6 rounded-xl border-3 border-primary/50 shadow-2xl bg-card"
                    >
                      <div className="absolute top-3 left-3 text-3xl opacity-20">📜</div>
                      <div className="absolute bottom-3 right-3 text-3xl opacity-20 rotate-180">📜</div>
                      <p className="relative text-lg md:text-xl text-foreground leading-relaxed font-semibold text-center px-10 py-3">
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