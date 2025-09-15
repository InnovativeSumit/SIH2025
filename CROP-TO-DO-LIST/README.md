# Advanced Todo Board

A modern, feature-rich todo list application built with React, TypeScript, and Tailwind CSS. This application provides an intuitive drag-and-drop interface for managing tasks across different stages of completion, with advanced features like priority management, due dates, filtering, sorting, and persistent storage.

![Advanced Todo Board](https://img.shields.io/badge/React-18.3.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue) ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.14-blue) ![Vite](https://img.shields.io/badge/Vite-5.4.8-purple)

## 🚀 Features

### Core Functionality
- **Drag & Drop Interface**: Seamlessly move tasks between "To Do", "In Progress", and "Done" columns
- **Task Management**: Create, edit, and delete tasks with ease
- **Persistent Storage**: All tasks are automatically saved to local storage
- **Responsive Design**: Optimized for both desktop and mobile devices

### Advanced Features
- **Priority Levels**: Assign high, medium, or low priority to tasks with visual indicators
- **Due Dates**: Set optional due dates with overdue highlighting
- **Smart Filtering**: Filter tasks by priority level
- **Flexible Sorting**: Sort tasks by creation date, due date, or priority
- **Search Functionality**: Quickly find tasks using the search bar
- **Dark Mode**: Toggle between light and dark themes
- **Task Statistics**: View total, completed, and overdue task counts
- **Visual Feedback**: Smooth animations and hover effects

## 📋 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features in Detail](#features-in-detail)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## 🛠 Installation

### Prerequisites
- Node.js (version 16.0 or higher)
- npm (version 7.0 or higher)

### Quick Start

1. **Clone or extract the project**
   ```bash
   # If you have the zip file, extract it
   unzip advanced-todo-board.zip
   cd advanced-todo-board
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues

## 🎯 Usage

### Creating Tasks

1. **Basic Task Creation**
   - Enter your task description in the text input field
   - Select the initial column (To Do, In Progress, or Done)
   - Choose a priority level (Low, Medium, High)
   - Optionally set a due date
   - Click "Add Task" to create the task

2. **Task Properties**
   - **Text**: The main description of your task
   - **Priority**: Visual priority indicator with color coding
     - 🔴 High Priority (Red border)
     - 🟡 Medium Priority (Yellow border)
     - 🟢 Low Priority (Green border)
   - **Due Date**: Optional deadline with overdue highlighting
   - **Creation Date**: Automatically tracked when the task is created

### Managing Tasks

1. **Moving Tasks**
   - Drag any task card to move it between columns
   - Visual feedback shows valid drop zones
   - Tasks automatically update their status

2. **Editing Tasks**
   - Click the "Edit" button on any task
   - Modify the task text in the textarea
   - Save changes or cancel to revert

3. **Deleting Tasks**
   - Click the "Delete" button on any task
   - Task is immediately removed from the board

### Filtering and Sorting

1. **Search Tasks**
   - Use the search bar to find tasks by text content
   - Search is case-insensitive and matches partial text

2. **Filter by Priority**
   - Use the priority dropdown to show only specific priority levels
   - Options: All Priorities, High, Medium, Low

3. **Sort Tasks**
   - Choose from multiple sorting options:
     - **Sort by Created**: Newest tasks first
     - **Sort by Due Date**: Earliest due dates first
     - **Sort by Priority**: Highest priority first

### Additional Features

1. **Dark Mode**
   - Click the moon/sun icon to toggle between light and dark themes
   - Preference is automatically saved

2. **Clear All Tasks**
   - Use the "Clear All" button to remove all tasks
   - Confirmation dialog prevents accidental deletion

3. **Task Statistics**
   - View real-time statistics in the header:
     - Total number of tasks
     - Number of completed tasks
     - Number of overdue tasks

## 🔍 Features in Detail

### Drag and Drop System

The application uses React DnD (Drag and Drop) library to provide a smooth, intuitive interface for moving tasks between columns. The system includes:

- **Visual Feedback**: Columns highlight when a task is dragged over them
- **Smooth Animations**: Tasks animate during drag operations
- **Touch Support**: Works on mobile devices with touch interfaces
- **Accessibility**: Keyboard navigation support for drag and drop operations

### Priority Management

Tasks can be assigned one of three priority levels, each with distinct visual indicators:

| Priority | Color | Border | Use Case |
|----------|-------|--------|----------|
| High | Red | Red left border | Urgent tasks requiring immediate attention |
| Medium | Yellow | Yellow left border | Important tasks with moderate urgency |
| Low | Green | Green left border | Tasks that can be completed when time permits |

### Due Date System

The due date feature provides comprehensive deadline management:

- **Optional Dates**: Due dates are completely optional
- **Visual Indicators**: Due dates are displayed with color-coded badges
- **Overdue Detection**: Tasks past their due date are highlighted in red
- **Smart Sorting**: Tasks can be sorted by due date, with overdue items prioritized

### Local Storage Persistence

All application data is automatically saved to the browser's local storage:

- **Automatic Saving**: Tasks are saved immediately when created, modified, or deleted
- **Theme Persistence**: Dark mode preference is remembered across sessions
- **Data Recovery**: Tasks persist even after browser restarts
- **No Server Required**: Fully client-side storage solution

### Responsive Design

The application is built with mobile-first principles:

- **Flexible Layouts**: Grid system adapts to different screen sizes
- **Touch-Friendly**: Large touch targets for mobile interaction
- **Readable Typography**: Optimized font sizes for all devices
- **Accessible Colors**: High contrast ratios for better readability

## 📁 Project Structure

```
advanced-todo-board/
├── public/
│   └── vite.svg                 # Vite logo
├── src/
│   ├── components/
│   │   ├── Column.tsx           # Column component for task organization
│   │   └── Task.tsx             # Individual task component
│   ├── types/
│   │   ├── columnTypes.tsx      # TypeScript interfaces for columns
│   │   └── taskTypes.tsx        # TypeScript interfaces for tasks
│   ├── assets/
│   │   └── react.svg            # React logo
│   ├── App.css                  # Application-specific styles
│   ├── App.tsx                  # Main application component
│   ├── index.css                # Global styles and Tailwind imports
│   ├── main.tsx                 # Application entry point
│   └── vite-env.d.ts           # Vite environment types
├── .gitignore                   # Git ignore rules
├── eslint.config.js            # ESLint configuration
├── index.html                   # HTML template
├── package.json                 # Project dependencies and scripts
├── package-lock.json           # Locked dependency versions
├── postcss.config.js           # PostCSS configuration
├── README.md                    # This file
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── tsconfig.app.json           # TypeScript app-specific config
├── tsconfig.node.json          # TypeScript Node.js config
└── vite.config.ts              # Vite build configuration
```

### Key Components

#### App.tsx
The main application component that manages:
- Global state for tasks, filters, and UI preferences
- Local storage integration
- Task CRUD operations
- Theme management

#### Task.tsx
Individual task component featuring:
- Drag and drop functionality
- Inline editing capabilities
- Priority and due date display
- Edit and delete actions

#### Column.tsx
Column component that handles:
- Task filtering and sorting
- Drop zone functionality
- Task count display
- Responsive layout

### Type Definitions

#### TaskType Interface
```typescript
interface TaskType {
    text: string;                    // Task description
    columnId: number;                // Column assignment (1, 2, or 3)
    uid: number;                     // Unique identifier
    dueDate?: string;                // Optional due date (ISO string)
    priority: 'low' | 'medium' | 'high'; // Priority level
    createdAt: string;               // Creation timestamp (ISO string)
    isEditing?: boolean;             // Edit mode flag
}
```

#### ColumnType Interface
```typescript
interface ColumnType {
    id: number;                      // Column identifier
    title: string;                   // Column display name
}
```

## 🛠 Technologies Used

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI library for building interactive interfaces |
| **TypeScript** | 5.5.3 | Type-safe JavaScript for better development experience |
| **Vite** | 5.4.8 | Fast build tool and development server |
| **Tailwind CSS** | 3.4.14 | Utility-first CSS framework for styling |

### Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| **react-dnd** | 16.0.1 | Drag and drop functionality |
| **react-dnd-html5-backend** | 16.0.1 | HTML5 backend for drag and drop |
| **autoprefixer** | 10.4.20 | CSS vendor prefix automation |
| **postcss** | 8.4.47 | CSS transformation tool |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| **ESLint** | 9.11.1 | Code linting and quality assurance |
| **@vitejs/plugin-react** | 4.3.2 | React support for Vite |
| **typescript-eslint** | 8.7.0 | TypeScript-specific ESLint rules |

### Why These Technologies?

**React with TypeScript** provides a robust foundation for building scalable, maintainable user interfaces. TypeScript adds compile-time type checking, reducing runtime errors and improving developer productivity.

**Vite** offers lightning-fast development builds and hot module replacement, significantly improving the development experience compared to traditional bundlers.

**Tailwind CSS** enables rapid UI development with its utility-first approach, while maintaining consistency and reducing CSS bundle size through purging unused styles.

**React DnD** provides a flexible, accessible drag-and-drop system that works across different input methods and devices.

## 🚀 Development

### Setting Up Development Environment

1. **Install Node.js**
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version` and `npm --version`

2. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd advanced-todo-board
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

### Development Workflow

1. **Code Structure**
   - Follow React functional component patterns
   - Use TypeScript for all new code
   - Implement proper prop typing
   - Follow ESLint rules for consistency

2. **Styling Guidelines**
   - Use Tailwind CSS utility classes
   - Implement responsive design patterns
   - Maintain consistent spacing and typography
   - Support both light and dark themes

3. **State Management**
   - Use React hooks for local state
   - Implement proper state lifting
   - Maintain immutable state updates
   - Use local storage for persistence

### Building for Production

1. **Create Production Build**
   ```bash
   npm run build
   ```

2. **Preview Production Build**
   ```bash
   npm run preview
   ```

3. **Deploy**
   - Upload the `dist` folder to your web server
   - Configure server for single-page application routing
   - Ensure HTTPS for production deployment

### Performance Considerations

The application is optimized for performance through:

- **Code Splitting**: Vite automatically splits code for optimal loading
- **Tree Shaking**: Unused code is eliminated from the final bundle
- **CSS Purging**: Tailwind removes unused CSS classes
- **Local Storage**: Client-side persistence reduces server requests
- **Efficient Re-renders**: React hooks minimize unnecessary updates

## 🤝 Contributing

We welcome contributions to improve the Advanced Todo Board! Here's how you can help:

### Getting Started

1. **Fork the Repository**
   - Click the "Fork" button on the repository page
   - Clone your fork locally

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow the existing code style
   - Add tests for new functionality
   - Update documentation as needed

4. **Submit a Pull Request**
   - Push your changes to your fork
   - Create a pull request with a clear description

### Contribution Guidelines

- **Code Quality**: Ensure all ESLint rules pass
- **TypeScript**: Maintain proper type definitions
- **Testing**: Add tests for new features
- **Documentation**: Update README for significant changes
- **Accessibility**: Ensure features work with screen readers
- **Mobile Support**: Test on mobile devices

### Areas for Contribution

- **New Features**: Additional task properties, team collaboration, integrations
- **Performance**: Optimization for large task lists
- **Accessibility**: Enhanced keyboard navigation, screen reader support
- **Testing**: Unit tests, integration tests, end-to-end tests
- **Documentation**: Tutorials, API documentation, examples

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 🙏 Acknowledgments

- **React Team** for the excellent React library
- **Tailwind CSS** for the utility-first CSS framework
- **React DnD** for the drag-and-drop functionality
- **Vite Team** for the fast build tool
- **TypeScript Team** for type safety

## 📞 Support

If you encounter any issues or have questions:

1. **Check the Documentation**: Review this README and inline code comments
2. **Search Issues**: Look for similar problems in the issue tracker
3. **Create an Issue**: Provide detailed information about your problem
4. **Community Support**: Join discussions in the project community

---

**Built with ❤️ by Manus AI**

*Last updated: January 2025*
