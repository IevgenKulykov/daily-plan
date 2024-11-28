import React from "react";
import "./Reward.css";


interface RewardProps {
  reward: {
    name: string;
    pointsRequired: number;
  };
  totalPoints: number;
  redeemReward: (reward: { name: string; pointsRequired: number }) => void;
  removeReward: (name: string) => void;
  t: (key: string) => string;
}

const Reward: React.FC<RewardProps> = ({
  reward,
  totalPoints,
  redeemReward,
  removeReward,
  t,
}) => {
  return (
    <li>
      <span>
        <div>{reward.name}</div>
        <small>
          {reward.pointsRequired} {t("points")}
        </small>
      </span>
      <div className="button-container">
        <button
          className="reward-btn"
          onClick={() => redeemReward(reward)}
          disabled={totalPoints < reward.pointsRequired}
        >
          {t("redeem")}
        </button>
        <button
          className="complete-btn remove-btn"
          onClick={() => removeReward(reward.name)}
        >
          &times;
        </button>
      </div>
    </li>
  );
};

export default Reward;
