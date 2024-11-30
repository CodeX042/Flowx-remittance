export const getStableCoinLogo = (symbol: string) => {
  const baseUrl = "https://assets.coingecko.com/coins/images";

  const logoUrl =
    symbol.toLowerCase() === "usdt"
      ? `${baseUrl}/325/small/tether.png`
      : symbol.toLowerCase() === "usdc"
      ? `${baseUrl}/6319/small/usdc.png`
      : symbol.toLowerCase() === "dai"
      ? `${baseUrl}/9956/small/4943.png`
      : symbol.toLowerCase() === "busd"
      ? `${baseUrl}/9576/small/BUSD.png`
      : symbol.toLowerCase() === "euroc"
      ? `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR13LO1GuIz4Tk6h1SLZ-ZJ5xGG4JcLLInEAQ&s`
      : symbol.toLowerCase() === "sui"
      ? `https://cryptologos.cc/logos/sui-sui-logo.png`
      : symbol.toLowerCase() === "btc"
      ? `${baseUrl}/1/small/bitcoin.png`
      : symbol.toLowerCase() === "eth"
      ? `${baseUrl}/279/small/ethereum.png`
      : symbol.toLowerCase() === "xrp"
      ? `${baseUrl}/44/small/xrp-symbol-white-128.png`
      : null; // Handle unknown symbols

  return logoUrl;
};

export const getStablecoinPriceInUSD = async (stablecoin: string) => {
  try {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${stablecoin}&vs_currencies=usd`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      throw new Error("Failed to fetch stablecoin price");
    }

    return data[stablecoin]?.usd || 1; // Default to 1 if price not found
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCurrencyLogo = (currency: string) => {
  const baseUrl = "https://flagcdn.com/w40";

  const flagUrl =
    currency.toLowerCase() === "usd"
      ? `${baseUrl}/us.png` // United States Dollar
      : currency.toLowerCase() === "eur"
      ? `${baseUrl}/eu.png` // Euro
      : currency.toLowerCase() === "gbp"
      ? `${baseUrl}/gb.png` // British Pound
      : currency.toLowerCase() === "ngn"
      ? `${baseUrl}/ng.png` // Nigeria
      : currency.toLowerCase() === "kes"
      ? `${baseUrl}/ke.png` // Kenya
      : currency.toLowerCase() === "zar"
      ? `${baseUrl}/za.png` // South Africa
      : currency.toLowerCase() === "ghs"
      ? `${baseUrl}/gh.png` // Ghana
      : currency.toLowerCase() === "tzs"
      ? `${baseUrl}/tz.png` // Tanzania
      : currency.toLowerCase() === "ugx"
      ? `${baseUrl}/ug.png` // Uganda
      : null; // Handle unknown currencies

  return flagUrl;
};

export const getWalletBalance = async (currency: string) => {
  try {
    const url = `http://localhost:5000/api/wallet/balance/${currency}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if required (e.g., Authorization)
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch balance for ${currency}`);
    }

    const data = await response.json();

    if (data && data.balance) {
      return data.balance;
    }

    return "Balance data not available";
  } catch (error: any) {
    console.error(error);
    return `Error: ${error.message}`;
  }
};
