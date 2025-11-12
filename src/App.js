import React,{useState,createContext} from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom';

import PlanPage from './pages/Planpage';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import Result from './pages/resultsPage';




export const store = createContext();

const App = () => {
  const [token,setToken] = useState(localStorage.getItem('authToken') || null);

  return (
    <div>
      <store.Provider value={[token,setToken]}>
      <BrowserRouter>
        


        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path='/results/:id' element={<Result />} />
        </Routes>
      </BrowserRouter>
      </store.Provider>
    </div>
  )
}

export default App