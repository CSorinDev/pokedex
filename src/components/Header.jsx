import { NavLink } from "react-router";
import PersonIcon from "../assets/PersonIcon";
import { useAuth } from "../context/AuthContext";

export default function Header() {
    const { user } = useAuth()
    const navLinkStyle = ({ isActive }) => `py-1 px-2 rounded-lg transition-all hover:bg-black/30 ${isActive ? "bg-black/30" : "bg-transparent"}`

    return (
        <header>
            <nav className="flex justify-between items-center p-4">
                <NavLink to="/">
                    <img className="max-h-16" src="/pokeapi.png" alt="logo" />
                </NavLink>
                
                <ul className="flex gap-4">
                    <li>
                        <NavLink className={navLinkStyle} to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={navLinkStyle}
                            to="/pokemons"
                        >
                            Pokemons
                        </NavLink>
                    </li>
                    <li>
                        {
                            user
                                ? <NavLink to="/myprofile">
                                    <PersonIcon />
                                </NavLink>
                                : <NavLink to="/login">
                                    <PersonIcon />
                                </NavLink>
                        }
                    </li>
                </ul>
            </nav>
        </header>
    )
}