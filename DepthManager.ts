import axios from "axios";

export class DepthManager {
  private market: string;
  private bids: Record<string, string>;
  private asks: Record<string, string>;

  constructor(market: string) {
    this.market = market;
    this.bids = {};
    this.asks = {};

    setInterval(() => {
      this.pollMarket();
    }, 3000);
  }

  async pollMarket() {
    try {
      const response = await fetch(
        `https://public.coindcx.com/market_data/orderbook?pair=${this.market}`
      );

      const depth = (await response.json()) as {
        bids: Record<string, string>;
        asks: Record<string, string>;
      };

      this.bids = depth.bids;
      this.asks = depth.asks;
    } catch (error) {}
  }

  getReleventDepth() {
    let highestBid = -100;
    let lowestAsk = 10000000;

    Object.keys(this.bids).map((bid) => {
      if (parseFloat(bid) > highestBid) {
        highestBid = parseFloat(bid);
      }
    });

    Object.keys(this.asks).map((ask) => {
      if (parseFloat(ask) < lowestAsk) {
        lowestAsk = parseFloat(ask);
      }
    });

    return {
      highestBid,
      lowestAsk,
    };
  }
}
