import {useEffect, useState } from "react"
import './sidebar.css'
import axios from "axios"
import {Link} from 'react-router-dom';
export default function Sidebar() {
  const [cats ,setCats] = useState([]);

    useEffect(() => {
      const getCats = async() => {
        const res = await axios.get("/categories");
        setCats(res.data);
        //console.log(res);
      };
      getCats();
    },[]);  
  return (
    <div className='sidebar'>
        <div className="sidebarItem">
          <span className="sidebarTitle">ABOUT ME</span>
            <img 
              src='https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
              alt=''
            />
            <p>
              Hello everyone!! This is me Biswajit Rout from IIIT Bhubaneswar
            </p>
        </div>
        <div className="sidebarItem">
          <span className="sidebarTitle">CATEGORIES</span>
          <ul className='sidebarList'>
            {cats.map((c) => {
              //console.log(c.name);
              return <Link to={`/?cat=${c.name}`} className="link">
                  <li className="sidebarListItem">{c.name}</li>
              </Link>
            })}
                      
          </ul>
        </div>
        <div className="sidebarItem">
          <span className='sidebarTitle'>FOLLOW US</span>
          <div className='sidebarSocial'>
            <i className="sidebarIcon fa-brands fa-square-facebook"></i>
            <i className="sidebarIcon fa-brands fa-square-twitter"></i>
            <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
            <i className="sidebarIcon fa-brands fa-square-instagram"></i>
          </div>
        </div>
    </div>
  )
}
