import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './pages/Login'
import Layout from './layouts/Layout'
import PokemonInfo from './pages/PokemonInfo'
import Home from './pages/Home'
import RegisterPage from './pages/RegisterPage'
import MyProfile from './pages/MyProfile'
import Pokemons from './pages/Pokemons'
import PokemonsOld from './pages/Pokemons-old'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pokemonsold" element={<PokemonsOld />} />
          <Route path="/pokemons" element={<Pokemons />} />
          <Route path="/pokemon/:id" element={<PokemonInfo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/myprofile" element={<MyProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
