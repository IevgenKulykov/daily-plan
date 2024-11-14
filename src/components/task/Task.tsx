import React from 'react';
import "./Task.css";


interface TaskProps {
  id: number;
  title: string;
  points: number;
  completed: boolean;
  completeTask: (id: number) => void;
  removeTask: (id: number) => void;
  t: (key: string) => string;
}

const Task: React.FC<TaskProps> = ({ id, title, points, completed, completeTask, removeTask, t }) => {
  return (
    <li
      key={id}
      style={{
        textDecoration: completed ? "line-through" : "none",
        display: "flex", 
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span>
        {title}
        <br />
        <small>{points} {t('points')}</small>
      </span>
      {!completed && (
        <div className="button-container">
          <button
            className="task-btn remove-btn"
            onClick={() => completeTask(id)}
          >
            ✓
          </button>
          <button
            className="complete-btn remove-btn"
            onClick={() => removeTask(id)}
          >
            x
          </button>
        </div>
      )}
    </li>
  );
};

export default Task;
