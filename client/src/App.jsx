import { Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import HeaderPart from './components/HeaderPart'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashbord from './pages/Dashbord'

function App() {
  return(
    <>
      <HeaderPart/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashbord' element={<Dashbord/>}/>
        <Route path='/signUp' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
