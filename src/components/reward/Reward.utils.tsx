import { RewardType } from "./Reward.types";

export const addReward = (
  rewards: RewardType[],
  setRewards: React.Dispatch<React.SetStateAction<RewardType[]>>,
  newRewardName: string,
  setNewRewardName: React.Dispatch<React.SetStateAction<string>>,
  newRewardPoints: number,
  setNewRewardPoints: React.Dispatch<React.SetStateAction<number>>
) => {
  if (newRewardName.trim() !== "" && newRewardPoints > 0) {
    const newReward: RewardType = {
      name: newRewardName,
      pointsRequired: newRewardPoints,
    };
    setRewards([...rewards, newReward]);
    setNewRewardName("");
    setNewRewardPoints(1);
  }
};

export const removeReward = (
  rewards: RewardType[],
  setRewards: React.Dispatch<React.SetStateAction<RewardType[]>>,
  name: string
) => {
  const updatedRewards = rewards.filter((reward) => reward.name !== name);
  setRewards(updatedRewards);
};
