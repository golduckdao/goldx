import create from "zustand";


const useStore = create((set) => ({
  current: 'bsc',
  rewardPoolContractAddress: '0xf074d0bba56dc68b8b530ce17a185d486dd8caa4',
  buyTokenContractAddress: '0x518f566c7fc5eb8390bed09eefab802d8255c028',
  isAuthenticated: false,

  allowedNetworks: ['0x38', '0x89', '0x1','0x440'],
  bsc: {
    network: '0x38',
    rewardPoolContractAddress: '0xf074d0bba56dc68b8b530ce17a185d486dd8caa4',
    buyTokenContractAddress: '0x518f566c7fc5eb8390bed09eefab802d8255c028'
  },
  polygon: {
    network: '0x89',
    rewardPoolContractAddress: '0xf074d0bba56dc68b8b530ce17a185d486dd8caa4',
    buyTokenContractAddress: '0x518f566c7fc5eb8390bed09eefab802d8255c028'
  },
  eth: {
    network: '0x1',
    rewardPoolContractAddress: '0xf074d0bba56dc68b8b530ce17a185d486dd8caa4',
    buyTokenContractAddress: '0x518f566c7fc5eb8390bed09eefab802d8255c028'
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
  switchMetis: () => set((state) => ({
    ...state,
    current: 'metis',
    rewardPoolContractAddress: state.metis.rewardPoolContractAddress,
    buyTokenContractAddress: state.metis.buyTokenContractAddress
  })),
  
}));

export default useStore