import WalletConnect from "@walletconnect/web3-provider";

export const providerOptions = {
  walletconnect: {
    package: WalletConnect, 
    options: {
      infuraId: process.env.REACT_APP_INFURA_KEY 
    }
  }
};
