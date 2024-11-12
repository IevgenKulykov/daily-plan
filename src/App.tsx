import React, { useState, useEffect } from "react";
import "./App.css";
import DotNavigation from "./components/DotNavigation";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  points: number;
}

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
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [taskPoints, setTaskPoints] = useState<number>(1);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [redeemedRewards, setRedeemedRewards] = useState<string[]>([]);

  const [rewards, setRewards] = useState<Reward[]>(initialRewards);
  const [newRewardName, setNewRewardName] = useState<string>("");
  const [newRewardPoints, setNewRewardPoints] = useState<number>(1);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    const storedRewards = localStorage.getItem("rewards");
    const storedPoints = localStorage.getItem("totalPoints");
    const storedRedeemedRewards = localStorage.getItem("redeemedRewards");

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
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("rewards", JSON.stringify(rewards));
    localStorage.setItem("totalPoints", totalPoints.toString());
    localStorage.setItem("redeemedRewards", JSON.stringify(redeemedRewards));
  }, [tasks, rewards, totalPoints, redeemedRewards]);

  const addTask = () => {
    if (newTask.trim() !== "" && taskPoints > 0) {
      const task: Task = {
        id: tasks.length + 1,
        title: newTask,
        completed: false,
        points: taskPoints,
      };
      setTasks([...tasks, task]);
      setNewTask("");
      setTaskPoints(1);
    }
  };

  const completeTask = (id: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.completed = true;
        setTotalPoints(totalPoints + task.points);
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const removeTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

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

  return (
    <div className="App" style={{ display: "flex" }}>
      <div className="main">
        <DotNavigation>
          <div className="section">
            <h3>Your rewards:</h3>
            <input
              type="text"
              value={newRewardName}
              onChange={(e) => setNewRewardName(e.target.value)}
              placeholder="New reward"
              onKeyDown={(e) => handleKeyPress(e, addReward)}
            />
            <select
              value={newRewardPoints}
              onChange={(e) => setNewRewardPoints(Number(e.target.value))}
              data-testid="reward-points-select"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>

            <button onClick={addReward}>Add Reward</button>
            <ul className="rewards">
              {rewards.map((reward) => (
                <li key={reward.name}>
                  {reward.name} - {reward.pointsRequired} points
                  <div className="button-container">
                    <button
                      className="reward-btn"
                      onClick={() => redeemReward(reward)}
                      disabled={totalPoints < reward.pointsRequired}
                    >
                      Redeem
                    </button>
                    <button
                      className="complete-btn remove-btn"
                      onClick={() => removeReward(reward.name)}
                    >
                      x
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="section">
            <h3>Daily plan:</h3>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e, addTask)}
              placeholder="New task"
            />
            <select
              value={taskPoints}
              onChange={(e) => setTaskPoints(Number(e.target.value))}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <button onClick={addTask}>Add Task</button>
            <h2>Total Points: {totalPoints}</h2>

            <ul>
              {tasks.map((task) => (
                <li
                  key={task.id}
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    display: "flex", 
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>
                    {task.title} - {task.points} points
                  </span>
                  {!task.completed && (
                    <div className="button-container">
                      <button
                        className="task-btn remove-btn"
                        onClick={() => completeTask(task.id)}
                      >
                        ✓ {/* Unicode checkmark */}
                      </button>
                      <button
                        className="complete-btn remove-btn"
                        onClick={() => removeTask(task.id)}
                      >
                        x
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="section">
            <h3>Redeemed Rewards:</h3>
            <ul>
              {redeemedRewards.length > 0 ? (
                redeemedRewards.map((reward, index) => (
                  <li key={index}>🏆 - {reward} </li>
                ))
              ) : (
                <li>No rewards redeemed yet</li>
              )}
            </ul>
          </div>
        </DotNavigation>
      </div>
    </div>
  );
};

export default App;
