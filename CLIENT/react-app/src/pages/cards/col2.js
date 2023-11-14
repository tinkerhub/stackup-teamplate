import { useEffect, useState } from 'react'
import Card1 from './card1'

import './final.css'

export default function Col2() {

    const [posts, setPosts] = useState([]);

    useEffect(() => { fetch('http://localhost:4000/post').then(response => {
        response.json().then(posts => {
            setPosts(posts);
        });
    });
}, []);
    
    
    
    return(

    
    <>
        {posts.length > 0 && posts.map(post => (
            <Card1 {...post} />
        ))}
    </>
    )
}