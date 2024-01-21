import { DepthManager } from "./DepthManager";
import { cancelAll, createOrder } from "./order";

const solInrMarket = new DepthManager("B-XAI_INR");
const usdtInrMarket = new DepthManager("B-USDT_INR");
const solUsdtMarket = new DepthManager("B-XAI_USDT");

setInterval(() => {
  console.log(solInrMarket.getReleventDepth());
  console.log(usdtInrMarket.getReleventDepth());
  console.log(solUsdtMarket.getReleventDepth());

  // there are two side you can sit on
  // approach 1: sell XAI for INR, buy USDT fron INR, buy XAI from INR
  // let start with 1 XAI
  const canGetInr = solInrMarket.getReleventDepth().lowestAsk - 0.001;
  const canGetUsdt = canGetInr / usdtInrMarket.getReleventDepth().lowestAsk;
  const canGetSol = canGetUsdt / solUsdtMarket.getReleventDepth().lowestAsk;

  console.log(`You can convert 1 XAI into ${canGetSol} XAI`);

  // Buy XAI from INR, sell XAI from USDT, sell USDT for INR.
  const intialInr = solInrMarket.getReleventDepth().highestBid + 0.001;
  const canGetUsdt2 = solUsdtMarket.getReleventDepth().highestBid;
  const canGetInr2 = canGetUsdt2 * usdtInrMarket.getReleventDepth().highestBid;

  console.log(`You can convert ${intialInr} Inr to ${canGetInr2} INR`);
}, 2000);

async function main() {
  const highestBid = (
    parseFloat(`${solInrMarket.getReleventDepth().highestBid}`) + 0.01
  ).toFixed(3);
  await createOrder("buy", "XAIINR", +highestBid, 10, Math.random().toString());
  await new Promise((resolve) => setTimeout(resolve, 10000));
  await cancelAll("XAIINR");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  main();
}

setInterval(async () => {
  main();
}, 20000);
