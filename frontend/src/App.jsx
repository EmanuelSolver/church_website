import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import LoginForm from './pages/LoginForm';
import SignUpForm from './pages/SignUpForm';
import AboutUs from './pages/About';
import YouthMinistry from './pages/YouthMinistry';
import  Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound'
// import ProtectedRoute from "./components/HomeComponents/ProtectedRoute"
import { Context } from './context/userContext/Context'


const App = () =>{
  const { user } = useContext(Context)

  return (
      <div className="app">
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/youth" element={<YouthMinistry  />} />
            <Route path="/signin" element={ <LoginForm  />} />
            <Route path="/register" element={<SignUpForm  />} />
            <Route path="/about" element={<AboutUs  />} />
            {/* <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            /> */}
            <Route path="/dashboard" element={ user ? <Dashboard /> : <LoginForm/>} />
            <Route path="*" element={<NotFound />} />

          </Routes>
          
          {!user && (<Footer />)}

        </BrowserRouter>
      </div>
  )
}

export default App
