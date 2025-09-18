export const useUtils = () => {
  function customsSort(data: any) {
    const order = [
      "EURUSD",
      "GBPUSD",
      "AUDUSD",
      "NZDUSD",
      "USDCAD",
      "USDCHF",
      "USDJPY",
      "XAUUSD",
      "EURAUD",
      "EURNZD",
      "EURCAD",
      "EURCHF",
      "EURJPY",
      "EURGBP",
      "GBPAUD",
      "GBPNZD",
      "GBPCAD",
      "GBPCHF",
      "GBPJPY",
      "AUDCAD",
      "AUDCHF",
      "AUDJPY",
      "AUDNZD",
      "NZDCAD",
      "NZDCHF",
      "NZDJPY",
      "CADCHF",
      "CADJPY",
      "CHFJPY",
      "INDEX",
      "DOW",
      "DAX",
      "GOLD",
      "SILVER",
      "OIL",
      "BTC/USDT",
    ];
    const finalDataArr = data;
    finalDataArr.sort((a: any, b: any) => {
      const nameA = a.symbol.toUpperCase();
      const nameB = b.symbol.toUpperCase();
      return order.indexOf(nameA) - order.indexOf(nameB);
    });

    return finalDataArr;
  }

  return { customsSort };
};
