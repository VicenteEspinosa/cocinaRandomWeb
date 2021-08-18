import React from 'react';
import '../App'
import { Link } from 'react-router-dom';


function Nav() {
    const NavStyle = {
        color: 'white',
        textDecoration: 'none',
    }

    return(
        <nav>
            <ul className="nav-links">
                <Link style={NavStyle} to ="/">
                    <li>Buscar</li>
                </Link>
                <Link style={NavStyle} to ="/receta">
                    <li>Crear</li>
                </Link>
            </ul>
        </nav>
    );
}

export default Nav;