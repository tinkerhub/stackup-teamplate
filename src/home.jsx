import { Link, useNavigate } from 'react-router-dom'
import './home.css'

export default function Home() {
    return (
        <div className="Cards">
            <div className="card">
                <div className="content">
                    <p className="heading">General Knowledge</p>
                    <p className="para">
                    Engage, Educate, Excel: Welcome to a General Knowledge Odyssey Where Minds Are Nurtured and Tested
                    </p>
                    <Link to = "/gk"><button className="btn">Take the Quiz  </button></Link>
                </div>
            </div>
            <div className="card">
                <div className="content">
                    <p className="heading">Books</p>
                    <p className="para">
                    From Timeless Classics to Contemporary Gems, Our Book Quiz Showdown Is the Ultimate Literary Challenge.
                    </p>
                    <button className="btn">Take the Quiz</button>
                </div>
            </div>
            <div className="card">
                <div className="content">
                    <p className="heading">Geography</p>
                    <p className="para">
                    Beyond Maps and Borders: The Geography Quiz Showdown Where You'll Uncover the Diversity of Our Planet.
                    </p>
                    <button className="btn">Take the Quiz</button>
                </div>
            </div>
        </div>
    )
}