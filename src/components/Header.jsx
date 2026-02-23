import { NavLink } from "react-router";

export default function Header() {
    return (
        <header>
            <nav className="flex justify-between items-center p-4">
                <NavLink to="/">
                    <img className="max-h-16" src="/pokeapi.png" alt="logo" />
                </NavLink>
                <ul className="flex gap-4">
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/pokemons">Pokemons</NavLink>
                    </li>
                    <li>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}