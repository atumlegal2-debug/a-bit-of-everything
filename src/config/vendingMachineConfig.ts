import { VendingMachineConfig } from "@/types/vending";
import sodaCola from "@/assets/soda-cola.jpg";
import sodaOrange from "@/assets/soda-orange.jpg";
import chipsBBQ from "@/assets/chips-bbq.jpg";
import chocolate from "@/assets/chocolate.jpg";
import water from "@/assets/water.jpg";
import cheesePuffs from "@/assets/cheese-puffs.jpg";

/**
 * CONFIGURAÇÃO DA MÁQUINA DE VENDAS
 * 
 * Para adicionar/editar produtos:
 * 1. Coloque seus PNGs em src/assets/
 * 2. Importe-os no topo deste arquivo
 * 3. Defina a posição e dados do slot abaixo
 * 4. Configure a ação desejada (cart, link, modal, custom)
 */

export const vendingMachineConfig: VendingMachineConfig = {
  // backgroundImage: "/caminho/para/sua/imagem-de-fundo.png", // Opcional: imagem de fundo da máquina
  
  slots: [
    // LINHA A (Superior)
    {
      id: "slot-a1",
      code: "A1",
      position: { top: "10%", left: "8%", width: "26%", height: "35%" },
      product: {
        name: "Coca-Cola",
        price: 5.50,
        image: sodaCola,
        stock: 10,
        actionType: "cart",
      },
    },
    {
      id: "slot-a2",
      code: "A2",
      position: { top: "10%", left: "37%", width: "26%", height: "35%" },
      product: {
        name: "Fanta Laranja",
        price: 5.00,
        image: sodaOrange,
        stock: 8,
        actionType: "cart",
      },
    },
    {
      id: "slot-a3",
      code: "A3",
      position: { top: "10%", left: "66%", width: "26%", height: "35%" },
      product: {
        name: "Água Mineral",
        price: 3.00,
        image: water,
        stock: 15,
        actionType: "cart",
      },
    },

    // LINHA B (Inferior)
    {
      id: "slot-b1",
      code: "B1",
      position: { top: "52%", left: "8%", width: "26%", height: "35%" },
      product: {
        name: "Ruffles BBQ",
        price: 7.50,
        image: chipsBBQ,
        stock: 12,
        actionType: "cart",
      },
    },
    {
      id: "slot-b2",
      code: "B2",
      position: { top: "52%", left: "37%", width: "26%", height: "35%" },
      product: {
        name: "Cheetos",
        price: 6.50,
        image: cheesePuffs,
        stock: 3,
        actionType: "cart",
      },
    },
    {
      id: "slot-b3",
      code: "B3",
      position: { top: "52%", left: "66%", width: "26%", height: "35%" },
      product: {
        name: "Chocolate Lacta",
        price: 4.50,
        image: chocolate,
        stock: 20,
        actionType: "cart",
      },
    },
  ],
};

/**
 * EXEMPLOS DE CONFIGURAÇÃO DE AÇÕES:
 * 
 * Adicionar ao carrinho:
 * { actionType: "cart" }
 * 
 * Abrir link externo:
 * { actionType: "link", actionData: "https://exemplo.com" }
 * 
 * Abrir modal com informações:
 * { actionType: "modal" }
 * 
 * Ação customizada:
 * { actionType: "custom", actionData: "minha-acao-especial" }
 */
