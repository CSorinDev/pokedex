import { BrowserRouter, Route, Routes } from 'react-router'
import Pokemons from './pages/Pokemons'
import Login from './pages/Login'
import Layout from './layouts/Layout'
import PokemonInfo from './pages/PokemonInfo'
import Home from './pages/Home'
import Register from './pages/Register'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pokemons" element={<Pokemons />} />
          <Route path="/pokemon/:id" element={<PokemonInfo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter >
  )
}

export default App
