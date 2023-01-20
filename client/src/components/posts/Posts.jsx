import Post from '../post/Post'
import './posts.css'
 //props passed are used
export default function Posts({posts}) {
  return (
    <div className='posts'>
      {posts.map((p) => (
        // one by one posts are mapped and passed
        <Post post={p}/>
      ))}
    </div>
  )
}
