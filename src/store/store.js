import create from "zustand";


const useStore = create((set) => ({
  current: 'bsc',
  rewardPoolContractAddress: '0xf074d0bba56dc68b8b530ce17a185d486dd8caa4',
  buyTokenContractAddress: '0x518f566c7fc5eb8390bed09eefab802d8255c028',
  // airdropContractAddress: '0x7ce5b47beb9716bccffaafc37aa35616afd3b652',
  airdropContractAddress: '0x365841f21a0C3A577FAf17D136001eD649A6Cc0C', //testnet
  isAuthenticated: false,

  allowedNetworks: ['0x38', '0x89', '0x1','0x440'],
  bsc: {
    // network: '0x38',
    network: '0x61', //Testnet
    rewardPoolContractAddress: '0xf074d0bba56dc68b8b530ce17a185d486dd8caa4',
    buyTokenContractAddress: '0x518f566c7fc5eb8390bed09eefab802d8255c028',
    // airdropContractAddress: '0x7ce5b47beb9716bccffaafc37aa35616afd3b652'
    airdropContractAddress: '0x365841f21a0C3A577FAf17D136001eD649A6Cc0C' //testnet
  },
  polygon: {
    network: '0x89',
    rewardPoolContractAddress: '0xf074d0bba56dc68b8b530ce17a185d486dd8caa4',
    buyTokenContractAddress: '0x518f566c7fc5eb8390bed09eefab802d8255c028'
  },
  eth: {
    network: '0x1',
    rewardPoolContractAddress: '0xf074d0bba56dc68b8b530ce17a185d486dd8caa4',
    buyTokenContractAddress: '0x518f566c7fc5eb8390bed09eefab802d8255c028',
    airdropContractAddress: '0x6a404e6f2e376c35d6035f0cccba9fdb7aef7bae'
  },
  metis: {
    network: '0x440',
    rewardPoolContractAddress: '0xf074d0bba56dc68b8b530ce17a185d486dd8caa4',
    buyTokenContractAddress: '0x518f566c7fc5eb8390bed09eefab802d8255c028'
  },
  openSwitchChainDialog: false,

  login: () => set((state) => ({...state, isAuthenticated: true})),
  logout: () => set((state) => ({...state, isAuthenticated: false})),
  toggleChainDialog: () => set((state) =>({...state, openSwitchChainDialog: !state.openSwitchChainDialog})),
  switchBsc: () => set((state) => ({
    ...state,
    current: 'bsc',
    rewardPoolContractAddress: state.bsc.rewardPoolContractAddress,
    buyTokenContractAddress: state.bsc.buyTokenContractAddress,
    airdropContractAddress: state.bsc.airdropContractAddress
  })),
  switchPolygon: () => set((state) => ({
    ...state,
    current: 'polygon',
    rewardPoolContractAddress: state.polygon.rewardPoolContractAddress,
    buyTokenContractAddress: state.polygon.buyTokenContractAddress,
    airdropContractAddress: state.polygon.airdropContractAddress
  })),
  switchEth: () => set((state) => ({
    ...state,
    current: 'eth',
    rewardPoolContractAddress: state.eth.rewardPoolContractAddress,
    buyTokenContractAddress: state.eth.buyTokenContractAddress,
    airdropContractAddress: state.eth.airdropContractAddress
  })),
  switchMetis: () => set((state) => ({
    ...state,
    current: 'metis',
    rewardPoolContractAddress: state.metis.rewardPoolContractAddress,
    buyTokenContractAddress: state.metis.buyTokenContractAddress,
    airdropContractAddress: state.metis.airdropContractAddress
  })),
  
}));

export default useStore