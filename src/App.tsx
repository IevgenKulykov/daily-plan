import React, { useState, useEffect } from "react";
import "./App.css";
import DotNavigation from "./components/DotNavigation";
import Select from "./components/Select";
import { useTranslation } from 'react-i18next';
import LanguageSwitch from './components/LanguageSwitch'; 
import ListCleanup from "./components/ListCleanup";
import { Task, TaskType, addTask, completeTask, removeTask } from './components/task';
import NewTask from "./components/new-task/NewTask";
import NewReward from "./components/new-reward/NewReward";
import { Reward, RewardType, addReward, removeReward } from './components/reward';

const initialRewards: RewardType[] = [
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

  const [rewards, setRewards] = useState<RewardType[]>(initialRewards);
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

  const redeemReward = (reward: RewardType) => {
    if (totalPoints >= reward.pointsRequired) {
      setTotalPoints(totalPoints - reward.pointsRequired);
      setRedeemedRewards([...redeemedRewards, reward.name]);
    } else {
      alert("Not enough points to redeem this reward!");
    }
  };

  const handleAddReward = () => {
    addReward(rewards, setRewards, newRewardName, setNewRewardName, newRewardPoints, setNewRewardPoints);
  };

  const handleRemoveReward = (name: string) => {
    removeReward(rewards, setRewards, name);
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
            <h3>{t('dailyPlan')}:</h3>
            <NewTask
              newTask={newTask}
              setNewTask={setNewTask}
              taskPoints={taskPoints}
              setTaskPoints={setTaskPoints}
              pointOptions={pointOptions}
              handleKeyPress={handleKeyPress}
              handleAddTask={handleAddTask}
              t={t}
            />
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
            <h3>{t('yourRewardsTitle')}:</h3>
            <NewReward
              newRewardName={newRewardName}
              setNewRewardName={setNewRewardName}
              newRewardPoints={newRewardPoints}
              setNewRewardPoints={setNewRewardPoints}
              pointOptions={pointOptions}
              handleKeyPress={handleKeyPress}
              addReward={handleAddReward}
              t={t}
            />
            <ul>
            {rewards.map((reward) => (
              <Reward
                key={reward.name}
                reward={reward}
                totalPoints={totalPoints}
                redeemReward={redeemReward}
                removeReward={handleRemoveReward}
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
