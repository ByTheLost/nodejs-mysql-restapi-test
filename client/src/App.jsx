import { Route, Routes } from 'react-router-dom';

import ClaimsPage from './pages/Claims/claims.page';
import NotFoundPage from './pages/notfound.page';
import RegisterPage from './pages/Users/register.page';
import UsersPage from './pages/Users/users.page';
import UpdateUser from './pages/Users/updateuser.page';
import { UserContextProvider } from './context/UserProvider.Context';
import { LoginContextProvider } from './context/LoginProvider.Context';
import LoginPage from './pages/Login/login.page';

import Navbar from './components/navbar'
import './App.css'

function App() {
  return (
    <LoginContextProvider>
      <UserContextProvider>
      <Navbar/>
        <Routes>
          <Route path="/" element={<ClaimsPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/private/users" element={<UsersPage/>}/>
          <Route path="/private/UpdateUser/:id" element={<UpdateUser/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </UserContextProvider>
    </LoginContextProvider>
  )
}

export default App