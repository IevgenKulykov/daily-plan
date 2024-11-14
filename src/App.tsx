import React, { useState, useEffect } from "react";
import "./App.css";
import DotNavigation from "./components/DotNavigation";
import Select from "./components/Select";
import { useTranslation } from 'react-i18next';
import LanguageSwitch from './components/LanguageSwitch'; 
import ListCleanup from "./components/ListCleanup";
import { Task, TaskType, addTask, completeTask, removeTask } from './components/task';

interface Reward {
  name: string;
  pointsRequired: number;
}

const initialRewards: Reward[] = [
  { name: "Coffee", pointsRequired: 10 },
  { name: "Cake", pointsRequired: 25 },
  { name: "Movie Ticket", pointsRequired: 100 },
];

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [taskPoints, setTaskPoints] = useState<number>(1);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [redeemedRewards, setRedeemedRewards] = useState<string[]>([]);

  const [rewards, setRewards] = useState<Reward[]>(initialRewards);
  const [newRewardName, setNewRewardName] = useState<string>("");
  const [newRewardPoints, setNewRewardPoints] = useState<number>(1);
  const pointOptions = [1, 2, 5, 10, 25, 50, 100];
  const { t, i18n } = useTranslation();

  const switchLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    const storedRewards = localStorage.getItem("rewards");
    const storedPoints = localStorage.getItem("totalPoints");
    const storedRedeemedRewards = localStorage.getItem("redeemedRewards");
    const savedLang = localStorage.getItem("language");

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }

    if (storedRewards) {
      setRewards(JSON.parse(storedRewards));
    } else {
      setRewards(initialRewards);
    }

    if (storedPoints) {
      setTotalPoints(Number(storedPoints));
    }

    if (storedRedeemedRewards) {
      setRedeemedRewards(JSON.parse(storedRedeemedRewards));
    }

    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("rewards", JSON.stringify(rewards));
    localStorage.setItem("totalPoints", totalPoints.toString());
    localStorage.setItem("redeemedRewards", JSON.stringify(redeemedRewards));
  }, [tasks, rewards, totalPoints, redeemedRewards]);

  const redeemReward = (reward: Reward) => {
    if (totalPoints >= reward.pointsRequired) {
      setTotalPoints(totalPoints - reward.pointsRequired);
      setRedeemedRewards([...redeemedRewards, reward.name]);
    } else {
      alert("Not enough points to redeem this reward!");
    }
  };

  const addReward = () => {
    if (newRewardName.trim() !== "" && newRewardPoints > 0) {
      const newReward: Reward = {
        name: newRewardName,
        pointsRequired: newRewardPoints,
      };
      setRewards([...rewards, newReward]);
      setNewRewardName("");
      setNewRewardPoints(1);
    }
  };

  const removeReward = (name: string) => {
    const updatedRewards = rewards.filter((reward) => reward.name !== name);
    setRewards(updatedRewards);
  };

  const handleKeyPress = (e: { key: string }, action: () => void) => {
    if (e.key === "Enter") {
      action();
    }
  };

  const removeCompletedTasks = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
  };

  const removeRedeemedRewards = () => {
    setRedeemedRewards([]);
  };

  const handleAddTask = () => {
    addTask(tasks, setTasks, newTask, setNewTask, taskPoints, setTaskPoints);
  };

  return (
    <div className="App" style={{ display: "flex" }}>
      <div className="main">
        <DotNavigation>
          <div className="section">
            <h3>{t('yourRewardsTitle')}:</h3>
            <input
              type="text"
              value={newRewardName}
              onChange={(e) => setNewRewardName(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e, addReward)}
              placeholder={t('rewardPlaceholder')}
            />
            <Select
              value={newRewardPoints}
              onChange={setNewRewardPoints}
              options={pointOptions}
              testId="reward-points-select"
            />

            <button onClick={addReward}>{t('addReward')}</button>
            <ul>
              {rewards.map((reward) => (
                <li key={reward.name}>
                  <span>
                    <div>{reward.name}</div>
                    <small>{reward.pointsRequired} {t('points')}</small>
                  </span>
                  <div className="button-container">
                    <button
                      className="reward-btn"
                      onClick={() => redeemReward(reward)}
                      disabled={totalPoints < reward.pointsRequired}
                    >
                      {t('redeem')}
                    </button>
                    <button
                      className="complete-btn remove-btn"
                      onClick={() => removeReward(reward.name)}
                    >
                      &times;
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="section">
            <h3>{t('dailyPlan')}:</h3>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e, handleAddTask)}
              placeholder={t('taskPlaceholder')}
            />
            <Select
              value={taskPoints}
              onChange={setTaskPoints}
              options={pointOptions}
            />
            <button onClick={() =>addTask(tasks, setTasks, newTask, setNewTask, taskPoints, setTaskPoints)}>{t('addTask')}</button>      
            <h2>{t('totalPoints')}: {totalPoints}</h2>

            <ul>
              {tasks.map((task) => (
                <Task
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  points={task.points}
                  completed={task.completed}
                  completeTask={()=>completeTask(tasks, setTasks, task.id, totalPoints, setTotalPoints)}
                  removeTask={() => removeTask(tasks, setTasks, task.id)}
                  t={t}
                />
              ))}
            </ul>
          </div>
          <div className="section">
            <h3>{t('redeemedRewards')}:</h3>
            <ul>
              {redeemedRewards.length > 0 ? (
                redeemedRewards.map((reward, index) => (
                  <li key={index}>🏆 - {reward} </li>
                ))
              ) : (
                <li>{t('noRewards')}</li>
              )}
            </ul>
          </div>  
          <div className="section">
            <LanguageSwitch switchLanguage={switchLanguage} />
            <ListCleanup removeCompletedTasks={removeCompletedTasks} removeRedeemedRewards={removeRedeemedRewards} />
          </div>
        </DotNavigation>
      </div>
    </div>
  );
};

export default App;
