import React from 'react';
import { Link, useNavigate} from 'react-router-dom';

const Nav=()=>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout =()=>{
        localStorage.clear();
        navigate('./SignUp')
    }

    return(
        <div>
            <ul className="navigation-ul">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Dashboard">Dashboard</Link></li>
                <li><Link to="/Profile">Profile</Link></li>
                <li><Link to="/LogIn">Log In</Link></li>
                <li>{auth ? <Link onClick={logout} to="/SignUp">Log out</Link>:
                <Link to="/SignUp">Sign Up</Link>}</li>
                </ul>
        </div>
    );
}


export default Nav;