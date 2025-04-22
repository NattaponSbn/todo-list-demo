// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link text-6xl"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import TodoListPage from "./pages/TodoListPage";
import AddTodoPage from "./pages/AddTodoPage";
import EditTodoPage from "./pages/EditTodoPage";

const App = () => {
  return (
    <div className="px-[500px] py-[150px]">
      <Routes>
        <Route path="/" element={<TodoListPage />} />
        <Route path="/add" element={<AddTodoPage />} />
        <Route path="/edit/:id" element={<EditTodoPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
   
  );
};

export default App;

