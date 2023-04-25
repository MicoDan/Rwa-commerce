import { useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet-async";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { br, getError } from "../utils";


export default function SignupScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {userInfo} = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
        toast.error('Passwords do not match')
        return;
    }
    try {
      const { data } = await axios.post(br + "/api/users/signup", {
        name,
        email,
        password,
      },{
        headers: { "Access-Control-Allow-Origin": "*"}
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (error) {
      toast.error(getError(error))
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    } 
  }, [navigate, userInfo, redirect]);

  return (
    <Container id="small_container">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className="my-3">Sign Up</h1>
      <Form onSubmit={submitHandler}>

      <Form.Group className="mb-3 form-floating" controlId="name">
      <Form.Control
            placeholder="place your name here"
            id="name"
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Label for="name" text-warning>Name</Form.Label>
          
        </Form.Group>

        <Form.Group className="mb-3 form-floating" controlId="email">
          <Form.Control
            placeholder="place your email here"
            id="email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
           <Form.Label for="email">Email</Form.Label>
        </Form.Group>
        <Form.Group className="mb-3 form-floating" controlId="password">
          <Form.Control
            placeholder="place your password here"
            id="password"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Label for="password">Password</Form.Label>
        </Form.Group>
        <Form.Group className="mb-3 form-floating" controlId="confirmPassword">
          <Form.Control
            placeholder="confirmPassword"
            id="confirmPassword"
            type="password"
            required
            onChange={(e) => setconfirmPassword(e.target.value)}
          />
          <Form.Label for="confirmPassword">Confirm Password</Form.Label>
        </Form.Group>
        <Button type="submit" variant="warning">Sign Up</Button>
      
      <div className="mb-3">
        Already have an account?{" "}
        <Link to={`/signin`} style={{color: 'gold', textDecoration: 'none'}}>Sign-In</Link>
    </div>
    </Form>
    </Container>
  );
}
