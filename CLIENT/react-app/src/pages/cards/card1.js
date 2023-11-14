import { Link } from 'react-router-dom'
import './final.css'

export default function Card1({_id,title,summary,cover,content,createdAt}) {
    return(
        <div class="card c1">
                <Link to={`/post/${_id}`}>
                <h5>{title}</h5>
                </Link>
                <p>{summary}</p>
            </div>
    )
}