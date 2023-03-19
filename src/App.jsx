import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/gameContext'
import Layout from './components/Layout'
import './styles/normalize.css'

function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <Routes>
          <Route index element={<Layout />} />
          <Route path=':id' element={<Layout />} />
        </Routes>
      </GameProvider>
    </BrowserRouter>
  )
}

export default App
