import React from "react";
import Header from "./header";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import './pages/cards/final.css';
import { Navigate } from "react-router-dom";


const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
};

const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ];

export default function CreatePost() {

    const [title, setTitle] = useState('');
const [summary, setSummary] = useState('');
const [content, setContent] = useState('');
const [files, setFiles] = useState([]);
const [redirect, setRedirect] = useState(false);
const [error, setError] = useState('');

async function createNewPost(ev) {
    const data = new FormData();
    data.set('title',title);
    data.set('summary',summary);
    data.set('content',content);
    data.set('file', files[0]);
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/post', {
        method: 'POST',
        body: data,
        credentials: 'include',
});
    if(response.ok) {
        setRedirect(true);
    }
    
}

    if (redirect)  {
        return (
            <Navigate to = {'/create'} />
        )
    }

    return (
        <div className="Hi">
            <Header />
            <form onSubmit={createNewPost}>
                <div className="title">
            <input type="title"
                placeholder={'Title'}
                value={title}
                onChange={ev => setTitle(ev.target.value)} />
                </div>
                <div className="summary">
      <input
                type="summary"
                placeholder={'Summary'}
                value={summary}
            onChange={ev => setSummary(ev.target.value)}/>
            </div>
            <div className="file">
      <input type="file" onChange={ev => setFiles(ev.target.files)}/>
      </div>
                <ReactQuill 
                value={content}
                onChange={newValue => setContent(newValue)}
                 modules={modules} 
                 formats={formats}/>
                <button style={{marginTop: '5px'}}>
                    Create myPost
                </button>
            </form>
        </div>
    );
}
