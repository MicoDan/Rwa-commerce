import React, { useContext, useReducer, useState } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import  Form  from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button'
import { toast } from "react-toastify";
import { br, getError } from "../utils";
import axios from "axios";

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_REQUEST':
            return { ...state, loadingUpdate: true}
        case 'UPDATE_SUCCESS':
            return { ...state, loadingUpdate: false }
        case 'UPDATE_FAIL':
            return { ...state, loadingUpdate: false}
        default:
            return state
    }
}

export default function ProfileScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [name, setName] = useState(state.userInfo.name);
  const [email, setEmail] = useState(state.userInfo.email);
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const  [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false
  })

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
        const { data } = await axios.put(
          br +
            '/api/users/profile',
            {
                name,
                email,
                password,
            },
            { 
                headers: { Authorization: `Bearer ${state.userInfo.token}`,
                "Access-Control-Allow-Origin": "*"
              }
            }
        )
        dispatch({
            type: 'UPDATE_SUCCESS'
        })
        ctxDispatch({ type: 'USER_SIGNIN', payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
        toast.success('User updated successfully')
    } catch (err) {
        dispatch({
            type: 'FETCH_FAIL',
        })
        toast.error(getError(err))
    }
  };

  return (
    <div className="container " id="small_container">
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <h1 className="my-3">User Profile</h1>
      <form onSubmit={submitHandler}>
        <Form.Group className="mb-3 form-floating" controlId="name">
          <Form.Control
           id="name"
           type="name"
           placeholder="enter your email here"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Label for="name">Name</Form.Label>
        </Form.Group>
        <Form.Group className="mb-3 form-floating" controlId="name">
          <Form.Control
            type="email"
            id="email"
            placeholder="place your email here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Form.Label for="email">Email</Form.Label>
        </Form.Group>
        <Form.Group className="mb-3 form-floating" controlId="password">
          <Form.Control
            id="password"
            placeholder="Enter your password here"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Form.Label for="password">Password</Form.Label>
        </Form.Group>
        <Form.Group className="mb-3 form-floating" controlId="password">
          <Form.Control
            id="confirmPassword"
            placeholder="Enter your password here"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Form.Label for="confirmPassword">Confirm Password</Form.Label>
        </Form.Group>
        <div className="mb-3">
          <Button type="submit" variant="warning">Update</Button>
        </div>
      </form>
    </div>
  );
}
