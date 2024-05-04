import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers,faInfoCircle, faUserPlus, faSignInAlt, faSignOutAlt, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import globeIcon from "../images/globe.png"; 
import '../styles/Header.css'; 
import { Context } from '../context/userContext/Context';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, dispatch } = useContext(Context)

    const handleLogout = () =>{
  
        dispatch({ type: "LOGOUT"})
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
    }


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                {/* Church Name and Logo */}
                <div className="d-flex align-items-center">
                    <img src={globeIcon} alt="globe" className="globe-icon mr-3 rotate-left-to-right" style={{ height: '27px' }} />
                    <h1 className="navbar-brand mb-0 me-5">KASARANI CHURCH</h1>
                </div>
                {/* Navbar Toggler */}
                <button className="navbar-toggler" type="button" onClick={toggleMenu}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* Navbar Links */}
                <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item me-4">
                            <Link className="nav-link fw-bold" to="/"><FontAwesomeIcon icon={faHome} /> Home</Link>
                        </li>

                        <li className="nav-item me-4">
                            <Link className="nav-link fw-bold" to="/register"><FontAwesomeIcon icon={faUserPlus} /> Join us</Link>
                        </li>
                        <li className="nav-item me-4">
                            <Link className="nav-link fw-bold" to="/signin"><FontAwesomeIcon icon={faSignInAlt} /> Sign in</Link>
                        </li>
                        <li className="nav-item me-4">
                            <Link className="nav-link fw-bold" to="/youth"><FontAwesomeIcon icon={faUsers} /> Youths</Link>
                        </li>

                        <li className="nav-item me-4">
                            <Link className="nav-link fw-bold" to="/about"><FontAwesomeIcon icon={faInfoCircle} /> About</Link>
                        </li>

                        {user && (<>
                            <li className="nav-item me-4">
                                <Link className="nav-link fw-bold" to="/dashboard"><FontAwesomeIcon icon={faTachometerAlt} /> Dashboard</Link>
                            </li>
                            <li className="nav-item me-4">
                                <Link className="nav-link fw-bold" to="/signin" onClick={handleLogout}>
                                    <FontAwesomeIcon icon={faSignOutAlt} /> LogOut
                                </Link>
                            </li>
                        </>
                        )}

                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
