import Nav from './components/Nav'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Pages/Main/Home.jsx'
function App() {

  return (
    <div className='p-5 flex flex-col'>
      {/* <Nav/> */}
      <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Home/>} />
      </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
