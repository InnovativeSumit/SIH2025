import { useEffect, useState } from "react";
import "./App.css";
import { ColumnType } from "./types/columnTypes";
import { TaskType } from "./types/taskTypes";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Column } from "./components/Column";

const cols: ColumnType[] = [
  { id: 1, title: "To Do" },
  { id: 2, title: "In Progress" },
  { id: 3, title: "Done" },
];

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [taskText, setTasktext] = useState<string>("");
  const [selectedColumn, setSelectedColumn] = useState<number>(1);
  const [dueDate, setDueDate] = useState<string>("");
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [sortBy, setSortBy] = useState<'created' | 'dueDate' | 'priority'>('created');
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('todoTasks');
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, [tasks]);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const addTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskText.trim() === "") return;
    
    const newTask: TaskType = {
      text: taskText,
      columnId: selectedColumn,
      uid: Date.now(),
      dueDate: dueDate || undefined,
      priority: priority,
      createdAt: new Date().toISOString(),
    };
    
    setTasks([...tasks, newTask]);
    setTasktext("");
    setDueDate("");
    setPriority('medium');
  };

  const editTask = (uid: number, newText: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.uid === uid ? { ...task, text: newText } : task
      )
    );
  };

  const deleteTask = (uid: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.uid !== uid));
  };

  const clearAllTasks = () => {
    if (window.confirm('Are you sure you want to clear all tasks?')) {
      setTasks([]);
    }
  };

  // Filter tasks by search term
  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.columnId === 3).length;
    const overdue = tasks.filter(task => 
      task.dueDate && new Date(task.dueDate) < new Date() && task.columnId !== 3
    ).length;
    
    return { total, completed, overdue };
  };

  const stats = getTaskStats();

  return (
    <div className={darkMode ? 'dark' : ''}>
      <DndProvider backend={HTML5Backend}>
        <div className={`min-h-screen transition-colors duration-300 ${
          darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
        }`}>
          {/* Header */}
          <div className="p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-center lg:text-left bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    CROP TASK LIST
                  </h1>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm">
                    <span className={`px-3 py-1 rounded-full ${
                      darkMode ? 'bg-gray-700' : 'bg-white'
                    } shadow-sm`}>
                      Total: {stats.total}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 shadow-sm">
                      Completed: {stats.completed}
                    </span>
                    {stats.overdue > 0 && (
                      <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 shadow-sm">
                        Overdue: {stats.overdue}
                      </span>
                    )}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex flex-wrap gap-2 items-center">
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      darkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                        : 'bg-white hover:bg-gray-50 text-gray-700'
                    } shadow-sm border`}
                  >
                    {darkMode ? '☀️' : '🌙'}
                  </button>
                  <button
                    onClick={clearAllTasks}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-sm"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Add Task Form */}
              <form
                onSubmit={addTask}
                className={`mt-6 p-6 rounded-xl shadow-lg ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="lg:col-span-2">
                    <input
                      type="text"
                      placeholder="Enter your task..."
                      className={`w-full p-3 rounded-lg border transition-colors ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      value={taskText}
                      onChange={(e) => setTasktext(e.target.value)}
                    />
                  </div>
                  
                  <select
                    className={`p-3 rounded-lg border transition-colors ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    value={selectedColumn}
                    onChange={(e) => setSelectedColumn(Number(e.target.value))}
                  >
                    {cols.map((col) => (
                      <option key={col.id} value={col.id}>
                        {col.title}
                      </option>
                    ))}
                  </select>

                  <select
                    className={`p-3 rounded-lg border transition-colors ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>

                  <input
                    type="date"
                    className={`p-3 rounded-lg border transition-colors ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>

                <button
                  className="mt-4 w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  type="submit"
                >
                  Add Task
                </button>
              </form>

              {/* Filters and Search */}
              <div className={`mt-6 p-4 rounded-xl shadow-lg ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    className={`p-3 rounded-lg border transition-colors ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  <select
                    className={`p-3 rounded-lg border transition-colors ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'created' | 'dueDate' | 'priority')}
                  >
                    <option value="created">Sort by Created</option>
                    <option value="dueDate">Sort by Due Date</option>
                    <option value="priority">Sort by Priority</option>
                  </select>

                  <select
                    className={`p-3 rounded-lg border transition-colors ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value as 'all' | 'low' | 'medium' | 'high')}
                  >
                    <option value="all">All Priorities</option>
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>

                  <div className="flex items-center justify-center">
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''} found
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columns Grid */}
          <div className="px-6 pb-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {cols.map((col) => (
                  <Column
                    key={col.id}
                    id={col.id}
                    title={col.title}
                    tasks={filteredTasks.filter((task) => task.columnId === col.id)}
                    setTasks={setTasks}
                    onEditTask={editTask}
                    onDeleteTask={deleteTask}
                    sortBy={sortBy}
                    filterPriority={filterPriority}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </DndProvider>
    </div>
  );
}

export default App;
