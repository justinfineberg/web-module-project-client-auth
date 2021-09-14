import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosWithAuth from './utils/axiosWithAuth'
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import EditingMode from './EditingMode'

function FriendsList(props) {
   const [friends, setFriends] = useState([])
    const [form, setForm] = useState({
        id: '',
        name: '',
        age: '',
        email: ''
    })
    const [editing, setEditing] = useState(false)
useEffect(()=>{
    axiosWithAuth()
    .get("http://localhost:5000/api/friends")
    .then(res=>{
        setFriends(res.data)
    })
},[])

    const onChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    } 

    const onSubmit = (e)=>{
        e.preventDefault();
        const token = localStorage.getItem("token")
        let newFriend = {
            id: Date.now(),
            name: form.name,
            age: form.age,
            email: form.email
        }
       
       
       
        axios.post("http://localhost:5000/api/friends", newFriend, {headers:{authorization:token}})
        .then(res=>{
            setFriends(res.data)
        }).catch(err=>{
            console.log(err)
        })

        // axiosWithAuth()
        // .post("http://localhost:5000/api/friends",newFriend)
        // .then(resp=>{
        //     console.log(resp)
        // setFriends(resp.data)
        // })

    }

    const editMode = ()=>{
        setEditing(!editing)
    }

    const deleteName = (name)=>{
        setFriends(
            friends.filter(item=>{
                if (item.name !== name){
                    return item
                }
            })
        )
    }

   console.log(friends)
    return (
        <div>
            <form>
                <input value={form.name} onChange={onChange} type="input" name="name" placeholder="Name" />
                <input value={form.age} onChange={onChange}  type="input" name="age" placeholder="Age" />
                <input value={form.email} onChange={onChange} type="email" name="email" placeholder="email" />
                <div>
                    <button onClick={onSubmit}>Submit</button>
                </div>
            </form>
    <div>{friends.map(item=>{
        return( <div>{item.name} {editing && <span><button onClick={e=>deleteName(item.name)}>delete</button></span> }</div> 
        )
    })}</div>
   <button onClick={editMode}> Edit Mode </button>
    
        </div>
    );
}

export default FriendsList;