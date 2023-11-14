import './App.css';
import React, { useState } from "react";
function App() {
  const [toDos, setToDos]= useState([])
const [toDo, setToDo] = useState('')
  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's a great day</h2>
      </div>
      <div className="input">
        <input value={toDo} onChange={(e)=>setToDo (e.target.value)} type="text" placeholder=" Add todos..." />
        <i onClick={()=>setToDos([...toDos,{id:Date.now() , text : toDo,status:false}])} className="fas fa-plus"></i>
      </div>
      <div className="todos">
      {  toDos.map((obj)=>{
        return (
        <div className="todo">
          <div className="left">
            <input onChange={(e)=>{
            console.log(e.target.value)
            console.log(obj)
            setToDo(toDo.filter(obj2=>{
              if(obj2.id==obj.id){
                obj2.status=e.target.value
              }
              return obj2
            }))
             } }value={obj.status} type="checkbox" name="" id="" />
            <p>{obj.text}</p>
          </div>
          <div className="right">
            <i className="fas fa-times"></i>
          </div>
        </div> )
      })}
      </div>
    </div>
  );
}

export default App;
