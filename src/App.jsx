import Nav from './components/Nav'
import NavMenu from '../src/Button/NavMenu.jsx'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Hero from './Pages/Hero'

function App() {

  return (
    <div className='p-2'>
      <Nav/>
      <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Hero/>} />
      </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
