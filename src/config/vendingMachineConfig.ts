import { VendingMachineConfig } from "@/types/vending";
import fantaNozEsquilo from "@/assets/fanta-noz-esquilo.png";
import fantaCafeBrasil from "@/assets/fanta-cafe-brasil.png";
import fantaAcademia from "@/assets/fanta-academia.png";
import fantaApito from "@/assets/fanta-apito.png";

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
    // LINHA A - Fanta Noz de Esquilo
    {
      id: "slot-a1",
      code: "A1",
      position: { top: "0", left: "0", width: "100%", height: "auto" },
      product: {
        name: "Fanta Noz de Esquilo",
        price: 6.00,
        image: fantaNozEsquilo,
        stock: 10,
        actionType: "cart",
      },
    },
    {
      id: "slot-a2",
      code: "A2",
      position: { top: "0", left: "0", width: "100%", height: "auto" },
      product: {
        name: "Fanta Noz de Esquilo",
        price: 6.00,
        image: fantaNozEsquilo,
        stock: 10,
        actionType: "cart",
      },
    },
    {
      id: "slot-a3",
      code: "A3",
      position: { top: "0", left: "0", width: "100%", height: "auto" },
      product: {
        name: "Fanta Noz de Esquilo",
        price: 6.00,
        image: fantaNozEsquilo,
        stock: 10,
        actionType: "cart",
      },
    },

    // LINHA B - Fanta Café do Brasil
    {
      id: "slot-b1",
      code: "B1",
      position: { top: "0", left: "0", width: "100%", height: "auto" },
      product: {
        name: "Fanta Café do Brasil",
        price: 6.50,
        image: fantaCafeBrasil,
        stock: 8,
        actionType: "cart",
      },
    },
    {
      id: "slot-b2",
      code: "B2",
      position: { top: "0", left: "0", width: "100%", height: "auto" },
      product: {
        name: "Fanta Café do Brasil",
        price: 6.50,
        image: fantaCafeBrasil,
        stock: 8,
        actionType: "cart",
      },
    },
    {
      id: "slot-b3",
      code: "B3",
      position: { top: "0", left: "0", width: "100%", height: "auto" },
      product: {
        name: "Fanta Café do Brasil",
        price: 6.50,
        image: fantaCafeBrasil,
        stock: 8,
        actionType: "cart",
      },
    },

    // LINHA C - Fanta Academia
    {
      id: "slot-c1",
      code: "C1",
      position: { top: "0", left: "0", width: "100%", height: "auto" },
      product: {
        name: "Fanta Academia",
        price: 6.00,
        image: fantaAcademia,
        stock: 12,
        actionType: "cart",
      },
    },
    {
      id: "slot-c2",
      code: "C2",
      position: { top: "0", left: "0", width: "100%", height: "auto" },
      product: {
        name: "Fanta Academia",
        price: 6.00,
        image: fantaAcademia,
        stock: 12,
        actionType: "cart",
      },
    },
    {
      id: "slot-c3",
      code: "C3",
      position: { top: "0", left: "0", width: "100%", height: "auto" },
      product: {
        name: "Fanta Academia",
        price: 6.00,
        image: fantaAcademia,
        stock: 12,
        actionType: "cart",
      },
    },

    // LINHA D - Fanta Apito
    {
      id: "slot-d1",
      code: "D1",
      position: { top: "0", left: "0", width: "100%", height: "auto" },
      product: {
        name: "Fanta Apito",
        price: 5.50,
        image: fantaApito,
        stock: 15,
        actionType: "cart",
      },
    },
    {
      id: "slot-d2",
      code: "D2",
      position: { top: "0", left: "0", width: "100%", height: "auto" },
      product: {
        name: "Fanta Apito",
        price: 5.50,
        image: fantaApito,
        stock: 15,
        actionType: "cart",
      },
    },
    {
      id: "slot-d3",
      code: "D3",
      position: { top: "0", left: "0", width: "100%", height: "auto" },
      product: {
        name: "Fanta Apito",
        price: 5.50,
        image: fantaApito,
        stock: 15,
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
