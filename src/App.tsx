import React, { useState } from 'react';
import './App.css';

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
  { name: 'Coffee', pointsRequired: 50 },
  { name: 'Cake', pointsRequired: 100 },
  { name: 'Movie Ticket', pointsRequired: 150 }
];

const App: React.FC = () => {
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [taskPoints, setTaskPoints] = useState<number>(10);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [redeemedRewards, setRedeemedRewards] = useState<string[]>([]);
  
  const [rewards, setRewards] = useState<Reward[]>(initialRewards);
  const [newRewardName, setNewRewardName] = useState<string>('');
  const [newRewardPoints, setNewRewardPoints] = useState<number>(0);

  const addTask = () => {
    if (newTask.trim() !== '' && taskPoints > 0) {
      const task: Task = {
        id: tasks.length + 1,
        title: newTask,
        completed: false,
        points: taskPoints,
      };
      setTasks([...tasks, task]);
      setNewTask('');
      setTaskPoints(10);
    }
  };

  const completeTask = (id: number) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        task.completed = true;
        setTotalPoints(totalPoints + task.points);
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const redeemReward = (reward: Reward) => {
    if (totalPoints >= reward.pointsRequired) {
      setTotalPoints(totalPoints - reward.pointsRequired);
      setRedeemedRewards([...redeemedRewards, reward.name]);
    } else {
      alert('No1t enough points to redeem this reward!');
    }
  };

  const addReward = () => {
    if (newRewardName.trim() !== '' && newRewardPoints > 0) {
      const newReward: Reward = {
        name: newRewardName,
        pointsRequired: newRewardPoints,
      };
      setRewards([...rewards, newReward]);
      setNewRewardName('');
      setNewRewardPoints(0);
    }
  };

  const handleKeyPress = (e: { key: string; }) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };


  return (
    <div className="App">
      <h3>Available Rewards:</h3>
      <ul className="rewards">
        {rewards.map((reward) => (
          <li key={reward.name}>
            {reward.name} - {reward.pointsRequired} points
            <button
              className="reward-btn"
              onClick={() => redeemReward(reward)}
              disabled={totalPoints < reward.pointsRequired}
            >
              Redeem
            </button>
          </li>
        ))}
      </ul>

      <h1>To-Do Application</h1>

      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Enter new task"
      />
      <input
        type="number"
        value={taskPoints}
        onChange={(e) => setTaskPoints(Number(e.target.value))}
        placeholder="Points for task"
        min="1"
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.title} - {task.points} points
            {!task.completed && (
              <button className="complete-btn" onClick={() => completeTask(task.id)}>
                Complete
              </button>
            )}
          </li>
        ))}
      </ul>

      <h2>Total Points: {totalPoints}</h2>

      {/* <h3>Add Your Own Reward:</h3>
      <input
        type="text"
        value={newRewardName}
        onChange={(e) => setNewRewardName(e.target.value)}
        placeholder="Reward Name"
      />
      <input
        type="number"
        value={newRewardPoints}
        onChange={(e) => setNewRewardPoints(Number(e.target.value))}
        placeholder="Points Required"
        min="1"
      />
      <button onClick={addReward}>Add Reward</button> */}

      <h3>Redeemed Rewards:</h3>
      <ul>
        {redeemedRewards.length > 0 ? (
          redeemedRewards.map((reward, index) => <li key={index}>{reward}</li>)
        ) : (
          <li>No rewards redeemed yet</li>
        )}
      </ul>
    </div>
  );
};

export default App;
