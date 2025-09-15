import { useDrag } from "react-dnd";
import { TaskType } from "../types/taskTypes";
import { useState } from "react";

interface TaskProps extends TaskType {
  onEdit: (uid: number, newText: string) => void;
  onDelete: (uid: number) => void;
}

export const Task: React.FC<TaskProps> = ({ 
  text, 
  uid, 
  dueDate, 
  priority, 
  createdAt,
  onEdit, 
  onDelete 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { uid },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleEdit = () => {
    if (isEditing) {
      onEdit(uid, editText);
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setEditText(text);
    setIsEditing(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const isOverdue = dueDate && new Date(dueDate) < new Date();

  return (
    <div
      className={`border border-gray-400 border-l-4 ${getPriorityColor(priority)} p-3 my-2 rounded bg-white shadow-sm hover:shadow-md transition-shadow ${
        isDragging ? "bg-blue-50 opacity-50" : ""
      } ${isOverdue ? "bg-red-50" : ""}`}
      ref={drag}
    >
      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full p-2 border rounded resize-none"
            rows={2}
          />
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start mb-2">
            <p className="flex-1 text-gray-800">{text}</p>
            <div className="flex gap-1 ml-2">
              <button
                onClick={handleEdit}
                className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(uid)}
                className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
          
          <div className="flex justify-between items-center text-xs text-gray-500">
            <div className="flex gap-2">
              <span className={`px-2 py-1 rounded ${
                priority === 'high' ? 'bg-red-100 text-red-700' :
                priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {priority.toUpperCase()}
              </span>
              {dueDate && (
                <span className={`px-2 py-1 rounded ${
                  isOverdue ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  Due: {new Date(dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
            <span>
              Created: {new Date(createdAt).toLocaleDateString()}
            </span>
          </div>
        </>
      )}
    </div>
  );
};
