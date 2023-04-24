import React, { useContext } from "react";
import { Store } from "../Store";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const { state } = useContext(Store)
    // check if a user is signed in
    return state.userInfo ? children : <Navigate to='/signin' />
}