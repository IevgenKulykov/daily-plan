import { TaskType } from "./Task.types";


export const addTask = (
  tasks: TaskType[],
  setTasks: (tasks: TaskType[]) => void,
  newTask: string,
  setNewTask: (task: string) => void,
  taskPoints: number,
  setTaskPoints: (points: number) => void
) => {
  if (newTask.trim() !== "" && taskPoints > 0) {
    const task: TaskType = {
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


export const completeTask = (
  tasks: TaskType[],
  setTasks: (tasks: TaskType[]) => void,
  id: number,
  totalPoints: number,
  setTotalPoints: (points: number) => void
) => {
  const updatedTasks = tasks.map((task) => {
    if (task.id === id) {
      setTotalPoints(totalPoints + task.points);
      return { ...task, completed: true };
    }
    return task;
  });


  const sortedTasks = updatedTasks.sort((a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1
  );
  setTasks(sortedTasks);
};


export const removeTask = (
  tasks: TaskType[],
  setTasks: (tasks: TaskType[]) => void,
  id: number
) => {
  const updatedTasks = tasks.filter((task) => task.id !== id);
  setTasks(updatedTasks);
};
