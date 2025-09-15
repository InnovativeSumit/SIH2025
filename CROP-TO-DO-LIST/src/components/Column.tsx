import { useDrop } from "react-dnd";
import { ColumnProps } from "../types/columnTypes";
import { Task } from './Task';
import { TaskType } from "../types/taskTypes";

interface EnhancedColumnProps extends ColumnProps {
  onEditTask: (uid: number, newText: string) => void;
  onDeleteTask: (uid: number) => void;
  sortBy: 'created' | 'dueDate' | 'priority';
  filterPriority: 'all' | 'low' | 'medium' | 'high';
}

export const Column: React.FC<EnhancedColumnProps> = ({
  title, 
  tasks, 
  setTasks, 
  id, 
  onEditTask, 
  onDeleteTask,
  sortBy,
  filterPriority
}) => {
  const [{ isOver }, drop] = useDrop<TaskType, void, { isOver: boolean }>(() => ({
    accept: 'TASK',
    drop: (item: { uid: number }) => {
      setTasks((prevTasks) => {
        return prevTasks.map((task) =>
          task.uid === item.uid ? { ...task, columnId: id } : task
        );
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  // Filter tasks by priority
  const filteredTasks = filterPriority === 'all' 
    ? tasks 
    : tasks.filter(task => task.priority === filterPriority);

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'created':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'dueDate':
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      default:
        return a.uid - b.uid;
    }
  });

  return (
    <div 
      className={`border border-gray-400 w-full p-4 rounded-lg min-h-96 ${
        isOver ? 'bg-green-50 border-green-400' : 'bg-gray-50'
      }`} 
      ref={drop}
    >
      <h2 className="text-center font-semibold text-lg mb-2 text-gray-700">{title}</h2>
      <div className="text-center text-sm text-gray-500 mb-3">
        {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
      </div>
      <hr className="bg-gray-400 my-2 h-0.5" />
      <div className="space-y-2">
        {sortedTasks.map((task) => (
          <Task 
            key={task.uid}
            text={task.text} 
            columnId={task.columnId} 
            uid={task.uid}
            dueDate={task.dueDate}
            priority={task.priority}
            createdAt={task.createdAt}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};
