import {Route, Routes} from  'react-router-dom';
import TaskPage from "./pages/Taskpage";
import React from 'react';
import ResizableTextBox from './components/ResizableTextBox';

function App() {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-8">Ajuste de Tamaño de Fuente</h1>
        
        {/* Usa el componente ResizableTextBox */}
        <ResizableTextBox>
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque euismod, metus ut laoreet vehicula, sapien libero convallis purus, vitae dictum odio nunc non nulla.
          </p>
          <p className="mb-4">
            Integer non semper risus, a faucibus ex. Nullam varius dolor in facilisis malesuada. Suspendisse potenti. Phasellus at metus sit amet sapien suscipit gravida et at enim.
          </p>
        </ResizableTextBox>
      </div>
    );
  }
  
  export default App;