import { BrowserRouter, Route, Routes } from 'react-router'
import Pokemons from './pages/Pokemons'
import Login from './pages/Login'
import Layout from './layouts/Layout'
import PokemonInfo from './pages/PokemonInfo'
import Home from './pages/Home'
import RegisterPage from './pages/RegisterPage'
import MyProfile from './pages/MyProfile'
import Pokemonsv2 from './pages/Pokemonsv2'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pokemons" element={<Pokemons />} />
          <Route path="/pokemonsv2" element={<Pokemonsv2 />} />
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
