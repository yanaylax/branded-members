import React from 'react'
import {useSelector} from "react-redux";

export const UserList = () => {
    const users   = useSelector(state => state.users)

    const renderedUsers = users.map(user=>{
   return <p>{user.firstName}{user.lastName}</p>
    })

    return(
        <div>
        {renderedUsers}
        </div>
    )
}
