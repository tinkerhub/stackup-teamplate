import { Link } from 'react-router-dom';
import './final.css';

export default function Col1({ isLogin }) {
    return (
        <div className="col1">
            <h1>TCM Blogs</h1>
            <p>Welcome to TCM Blogs, your go-to destination for...</p>
            <Link to={isLogin ? '/blog' : '/login'}>
                <button id="logbut">{isLogin ? 'Create' : 'Login'}</button>
            </Link>
        </div>
    );
}
