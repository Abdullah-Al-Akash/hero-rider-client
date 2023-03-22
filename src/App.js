import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './Pages/Login/PrivateRoute';
import Home from './Pages/HomePage/Home';
import JoinAsRider from './Pages/JoinAsRider/JoinAsRider';
import JoinAsLearner from './Pages/JoinAsLearner/JoinAsLearner';
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={
          <Home></Home>
        }></Route>
        <Route path="/rider" element={<JoinAsRider></JoinAsRider>}></Route>
        <Route path="/learner" element={<JoinAsLearner></JoinAsLearner>}></Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
