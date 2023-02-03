import React, { useState } from "react";
import { useTodoContext } from "../hooks/useTodoContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";
import { GrDocumentUpdate } from 'react-icons/gr';
import {RiDeleteBinLine,RiEdit2Line} from 'react-icons/ri'

function TodoDetails({ todo }) {
  const{taskname,priority,_id} = todo;
  const [updatetaskname,setUpdatetaskname ] = useState(taskname);
  const [updatepriority, setUpdatePriority] = useState(priority);
  const [edit,setEdit] = useState(false);
  const { dispatch } = useTodoContext();
  const { user } = useAuthContext();

  const handleEdit = ()=>{
    setEdit(true);
  }
  const handleClick = async () => {
    if (!user) {
      return;
    }
    
    const response = await fetch("https://merntodobackend.vercel.app/api/todos/" + todo._id, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_TODO", payload: json });
    }
  };
  const handleUpdate = async () => {
    if (!user) {
      return;
    }

  
    const response = await fetch("https://merntodobackend.vercel.app/api/todos/" + todo._id, {
      method: "PATCH",
      body: JSON.stringify({taskname:updatetaskname,priority:updatepriority}),
      headers: { "Content-Type": "application/json",Authorization: `Bearer ${user.token}` },
    });
    const json = await response.json();
    const tempjson = {...todo,taskname:updatetaskname,priority:updatepriority};
    if (response.ok) {
     
      dispatch({ type: "UPDATE_TODO", payload: tempjson });
      console.log(tempjson);
    }
    setEdit(false)
  };
  return (
    <div className="todo-details">
      {edit?
      <div>
         <input type="text" className="updateinput" value={updatetaskname} onChange={(e)=>setUpdatetaskname(e.target.value)}/>
       <div className="updatepriority">
        <div>   <p>  <strong>priority:</strong></p></div>
      
         <div className="setpriority">
        <button className={(updatepriority=="high")&&"high"} onClick={()=>setUpdatePriority("high")}>High</button>
        <button className={(updatepriority=="medium")&&"medium"} onClick={()=>setUpdatePriority("medium")}>Medium</button>
        <button className={(updatepriority=="low")&&"low"} onClick={()=>setUpdatePriority("low")}>Low</button>
      </div>
         </div>
        
      
       <p>
         {formatDistanceToNow(new Date(todo.updatedAt), { addSuffix: true })}
       </p>
      </div>
      
      :<div>
      <h4>{todo.taskname}</h4>
      <p>
        <strong>priority:</strong>
        {todo.priority=="high" && <button className="high">High</button>}
        {todo.priority=="medium" && <button className="medium">Medium</button>}
        {todo.priority=="low" && <button className="low">Low</button>}
      </p>
      <p>
      {formatDistanceToNow(new Date(todo.updatedAt), { addSuffix: true })}
      </p>
      </div>}
      <div className="todoside">
      <button lassName="material-symbols-outlined" onClick={edit?handleUpdate:handleEdit}>
       {edit?<GrDocumentUpdate size={20}/>:<RiEdit2Line size={20}/>}

      </button>
      <button onClick={handleClick}>
      <RiDeleteBinLine size={20}/>
      </button>
      </div>
      
    </div>
  );
}

export default TodoDetails;
