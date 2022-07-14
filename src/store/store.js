import create from "zustand";


const useStore = create((set) => ({
  current: 'bsc',
  rewardPoolContractAddress: '0x885fE14F36226B04dB1a9D06BDE34935EB12b8d2',
  buyTokenContractAddress: '0xDB018d39569904FB7C86B98171c9d17e0C77E32B',
  isAuthenticated: false,

  bsc: {
    network: '0x61',
    rewardPoolContractAddress: '0x885fE14F36226B04dB1a9D06BDE34935EB12b8d2',
    buyTokenContractAddress: '0xDB018d39569904FB7C86B98171c9d17e0C77E32B'
  },
  polygon: {
    newtork: '0x13881',
    rewardPoolContractAddress: '0x1Bc328347Dfd4346BD8340B5604094885F0CeEAD',
    buyTokenContractAddress: '0xFFD739B7DEC0100aE6e15d19f05Dfbe2235F6E55'
  },
  eth: {
    network: '0x4',
    rewardPoolContractAddress: '0x8d02C3c8BFefA06E189df25C58115C9774Bea427',
    buyTokenContractAddress: '0x14EB3d7Ee35E88915772d379713f152ba3b42B6B'
  },
  openSwitchChainDialog: false,

  login: () => set((state) => ({...state, isAuthenticated: true})),
  logout: () => set((state) => ({...state, isAuthenticated: false})),
  toggleChainDialog: () => set((state) =>({...state, openSwitchChainDialog: !state.openSwitchChainDialog})),
  switchBsc: () => set((state) => ({
    ...state,
    current: 'bsc',
    rewardPoolContractAddress: state.bsc.rewardPoolContractAddress,
    buyTokenContractAddress: state.bsc.buyTokenContractAddress
  })),
  switchPolygon: () => set((state) => ({
    ...state,
    current: 'polygon',
    rewardPoolContractAddress: state.polygon.rewardPoolContractAddress,
    buyTokenContractAddress: state.polygon.buyTokenContractAddress
  })),
  switchEth: () => set((state) => ({
    ...state,
    current: 'eth',
    rewardPoolContractAddress: state.eth.rewardPoolContractAddress,
    buyTokenContractAddress: state.eth.buyTokenContractAddress
  })),
  
}));

export default useStore