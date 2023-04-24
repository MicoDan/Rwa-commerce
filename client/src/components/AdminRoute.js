import React, { useContext } from "react";
import { Store } from "../Store";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
    const { state } = useContext(Store)
    // check if a user is signed in
    return state.userInfo && state.userInfo.isAdmin ? children : <Navigate to='/signin' />
}