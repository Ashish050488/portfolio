import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Main/Home.jsx"

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-neutral-950 transition-colors">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
