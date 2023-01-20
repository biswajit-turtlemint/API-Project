 import { Link } from "react-router-dom"
import "./navbar.css"
import { useContext } from 'react'
import { Context } from "../../context/Context";
export default function NavBar() {
    const {user ,dispatch}=useContext(Context);
    const handleLogout = () => {
        dispatch({type: "LOGOUT" });
    };
    const PF = "http://localhost:8000/images/";
  return (
    <div className='nav'> 
        <div className='topLeft'>
            <i className="topIcon fa-brands fa-square-facebook"></i>
            <i className="topIcon fa-brands fa-square-twitter"></i>
            <i className="topIcon fa-brands fa-square-pinterest"></i>
            <i className="topIcon fa-brands fa-square-instagram"></i>
        </div>
        <div className='topCenter'>
            <ul className="topList">
                <li className="topListItem"><Link className="link" to="/">HOME</Link></li>
                <li className="topListItem"><Link className="link" to="/">ABOUT</Link></li>
                <li className="topListItem"><Link className="link" to="/">CONTACT</Link></li>
                <li className="topListItem"><Link className="link" to="/write">WRITE</Link></li>
                <li className="topListItem"><Link className="link" to="/" onClick={handleLogout}>{user && "LOGOUT"} </Link></li>
            </ul>
        </div>
        <div className='topRight'>
            {
            user ? 
                (
                <Link to="/settings">
                    <img
                        className="topImg"
                        src={PF+user.profilePic}
                        alt=""
                    />
                </Link>
                ) : (
                    <ul className="topList">
                        <li className="topListItem"><Link className="link" to="/login">LOGIN</Link></li>
                        <li className="topListItem"><Link className="link" to="/register">REGISTER</Link> </li>
                    </ul>
                )
            }
            
            <i className="topSearchIcon fas fa-search"></i>
        </div>
    </div>
  )
}
