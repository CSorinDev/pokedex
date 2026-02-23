import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import Layout from './layouts/Layout'
import PokemonInfo from './pages/PokemonInfo'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<PokemonInfo />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter >
  )
}

export default App
