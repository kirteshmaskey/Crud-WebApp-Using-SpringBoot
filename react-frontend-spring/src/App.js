import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from './views/Navbar';
import { Home } from './views/Home';
import { Route, Routes } from 'react-router-dom';
import { AddUser } from './views/AddUser';
import { EditUser } from './views/EditUser';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add/user' element={<AddUser />} />
        <Route path='/edit/user/:id' element={<EditUser />} />
      </Routes>
    </div>
  );
}

export default App;
