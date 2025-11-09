import { VendingMachine } from "@/components/VendingMachine";
import { vendingMachineConfig } from "@/config/vendingMachineConfig";

const Index = () => {
  return <VendingMachine config={vendingMachineConfig} />;
};

export default Index;
