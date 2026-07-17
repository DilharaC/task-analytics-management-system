import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


    
     function App() {
 
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="p-10 bg-white rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-blue-600">
          Tailwind Works ✅
        </h1>

        <p className="mt-4 text-green-600">
          Green color test
        </p>

        <button className="mt-4 px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700">
          Red Button
        </button>
      </div>
    </div>
  );
}



export default App;
    


