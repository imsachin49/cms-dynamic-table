import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import "./index.css"
import CreateEntity from './pages/CreateEntity';
import AllEntity from './pages/AllEntity';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer />
      <div>
        <Navbar />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<AllEntity />} />
          <Route path="/createEntity" element={<CreateEntity/>}/>
        </Routes>
      </div>
    </>
  );
};

export default App;
