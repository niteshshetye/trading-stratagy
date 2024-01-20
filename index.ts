import { DepthManager } from "./DepthManager";

const solInrMarket = new DepthManager("B-XAI_INR");
const usdtInrMarket = new DepthManager("B-USDT_INR");
const solUsdtMarket = new DepthManager("B-XAI_USDT");

setInterval(() => {
  console.log(solInrMarket.getReleventDepth());
  console.log(usdtInrMarket.getReleventDepth());
  console.log(solUsdtMarket.getReleventDepth());
}, 2000);
