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
  slots: [
    // LINHA A (Superior)
    {
      id: "slot-a1",
      code: "A1",
      position: { top: "0", left: "0", width: "100%", height: "auto" },
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
      position: { top: "0", left: "0", width: "100%", height: "auto" },
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
      position: { top: "0", left: "0", width: "100%", height: "auto" },
      product: {
        name: "Água Mineral",
        price: 3.00,
        image: water,
        stock: 15,
        actionType: "cart",
      },
    },

    // LINHA B (Meio)
    {
      id: "slot-b1",
      code: "B1",
      position: { top: "0", left: "0", width: "100%", height: "auto" },
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
      position: { top: "0", left: "0", width: "100%", height: "auto" },
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
      position: { top: "0", left: "0", width: "100%", height: "auto" },
      product: {
        name: "Chocolate Lacta",
        price: 4.50,
        image: chocolate,
        stock: 20,
        actionType: "cart",
      },
    },

    // LINHA C (Inferior)
    {
      id: "slot-c1",
      code: "C1",
      position: { top: "0", left: "0", width: "100%", height: "auto" },
      product: {
        name: "Ruffles BBQ",
        price: 7.50,
        image: chipsBBQ,
        stock: 12,
        actionType: "cart",
      },
    },
    {
      id: "slot-c2",
      code: "C2",
      position: { top: "0", left: "0", width: "100%", height: "auto" },
      product: {
        name: "Cheetos",
        price: 6.50,
        image: cheesePuffs,
        stock: 3,
        actionType: "cart",
      },
    },
    {
      id: "slot-c3",
      code: "C3",
      position: { top: "0", left: "0", width: "100%", height: "auto" },
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
