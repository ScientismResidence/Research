import { Link, NavLink } from 'react-router-dom';
import './appHeader.scss';

const AppHeader = () => {
    const style = {
        color: "#9f6313"
    }

    const isActive = (({ isActive }) => {
        return isActive ? style : null
    });

    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink end style={isActive} to="/">Characters</NavLink></li>
                    /
                    <li><NavLink end style={isActive} to="/comics">Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;