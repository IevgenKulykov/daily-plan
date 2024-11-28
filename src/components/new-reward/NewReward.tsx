import React from "react";
import Select from "./../Select";

interface NewRewardProps {
  newRewardName: string;
  setNewRewardName: (value: string) => void;
  newRewardPoints: number;
  setNewRewardPoints: (value: number) => void;
  pointOptions: number[];
  handleKeyPress: (
    e: React.KeyboardEvent<HTMLInputElement>,
    action: () => void
  ) => void;
  addReward: () => void;
  t: (key: string) => string;
}

const NewReward: React.FC<NewRewardProps> = ({
  newRewardName,
  setNewRewardName,
  newRewardPoints,
  setNewRewardPoints,
  pointOptions,
  handleKeyPress,
  addReward,
  t,
}) => {
  return (
    <div className="new-reward-container">
      <input
        type="text"
        value={newRewardName}
        onChange={(e) => setNewRewardName(e.target.value)}
        onKeyDown={(e) => handleKeyPress(e, addReward)}
        placeholder={t("rewardPlaceholder")}
      />
      <Select
        value={newRewardPoints}
        onChange={setNewRewardPoints}
        options={pointOptions}
        testId="reward-points-select"
      />
      <button onClick={addReward}>{t("addReward")}</button>
    </div>
  );
};

export default NewReward;
