import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home'
import About from './components/about'
import Services from './components/services'
import Footer from './components/footer'
/*import PersonalInfo from './components/profil/PersonalInfo';
import UpdatePassword from './components/profil/UpdatePassword';*/

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        <Home/>
        <About/>
        <Services/>
        <Footer/>
      </div>
    </>
  )
}

export default App
