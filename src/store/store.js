import create from "zustand";


const useStore = create((set) => ({
  rewardPoolContractAddress: '0x885fE14F36226B04dB1a9D06BDE34935EB12b8d2',
  buyTokenContractAddress: '0xDB018d39569904FB7C86B98171c9d17e0C77E32B'
}));

export default useStore