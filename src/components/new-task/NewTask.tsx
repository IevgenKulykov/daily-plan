import React from "react";
import Select from "./../Select";

interface NewTaskProps {
  newTask: string;
  setNewTask: (value: string) => void;
  taskPoints: number;
  setTaskPoints: (value: number) => void;
  pointOptions: number[];
  handleKeyPress: (
    e: React.KeyboardEvent<HTMLInputElement>,
    action: () => void
  ) => void;
  handleAddTask: () => void;
  t: (key: string) => string;
}

const NewTask: React.FC<NewTaskProps> = ({
  newTask,
  setNewTask,
  taskPoints,
  setTaskPoints,
  pointOptions,
  handleKeyPress,
  handleAddTask,
  t,
}) => {
  return (
    <div className="new-task-container">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => handleKeyPress(e, handleAddTask)}
        placeholder={t("taskPlaceholder")}
      />
      <Select
        value={taskPoints}
        onChange={setTaskPoints}
        options={pointOptions}
        testId="task-points-select"
      />
      <button onClick={handleAddTask}>{t("addTask")}</button>
    </div>
  );
};

export default NewTask;
