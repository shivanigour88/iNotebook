import './App.css';
import Navbar from './componenents/Navbar';
import Home from './componenents/Home';
import About from './componenents/About';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import Alert from './componenents/Alert';
import Login from './componenents/Login';
import Signup1 from './componenents/Signup1';
import { useState } from 'react';

function App() {
  const[alert,setAlert] = useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg : message,
      type :type,
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
    <NoteState>
    <Router>
          <Navbar/>
          <Alert alert={alert}/>
          <div className="container">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert}/>} />
            <Route exact path="/about" element={<About/>} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exact path="/signup" element={<Signup1 showAlert={showAlert}/>} />
          </Routes>
         </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
