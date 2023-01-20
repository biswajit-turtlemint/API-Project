import {useEffect, useState, useContext } from "react"
import { useLocation } from "react-router"
import './singlePost.css'
import axios from "axios"
import {Link} from 'react-router-dom';
import { Context } from "../../context/Context";
export default function SinglePost() {
    const PF = "http://localhost:8000/images/";
    //to get the id from url  
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const { user } = useContext(Context);
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [updateMode, setUpdateMode] = useState(false)

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/posts/" + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        }
        getPost();
    },[path]);
    
    const handleDelete = async () => {
        try{
            await axios.delete(`/posts/${post._id}` , {
                data: {username: user.username},
            });
            window.location.replace("/");
        } catch(err){

        }
    }
    const handleUpdate = async () => {
        try {
          await axios.put(`/posts/${post._id}`, {
            username: user.username,
            title,
            desc,
          });
          setUpdateMode(false)
        } catch (err) {}
    };



  return (
    <div className='singlePost'>
        <div className="singleP ostWrapper">
            {post.photo && (
                <img src={PF + post.photo} alt="" className="singlePostImg" />
            )}
            {
                updateMode ? <input type="text" value={title} className="singlePostTitleInput" autoFocus onChange={(e) => setTitle(e.target.value)}/> : (
                    <h1 className="singlePostTittle">
                        {title}
                        {post.username === user?.username && (
                            <div className="singlePostEdit">
                                <i className="singlePostIcon fa-regular fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
                                <i className="singlePostIcon fa-solid fa-trash" onClick={handleDelete}></i>
                            </div>
                        )}
                        
                    </h1>
                )
            }
                <div className="singlePostInfo">
                    <Link to={`/?user=${post.username}`} className="link">
                    <span className='singlePostAuthor'>Author: <b>{post.username}</b></span>
                    </Link>
                    
                    <span className='singlePostDate'>{new Date(post.createdAt).toDateString()}</span>
                </div>
                { updateMode ? (
                    <textarea className='singlePostDescInput' value={desc} onChange={(e) => setDesc(e.target.value)}/>
                ): (
                    <p className='singlePostDesc'>
                        {desc}
                    </p>
                )}
                {updateMode && 
                    <button className="singlePostButton" onClick={handleUpdate}>Update</button>
                }
                
        </div>
    </div>
  )
}
