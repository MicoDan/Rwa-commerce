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
import { getError } from "../utils";


export default function SigninScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {userInfo} = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/users/signin", {
        email,
        password,
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
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3 form-floating" controlId="email">
          <Form.Control
            id="email"
            placeholder="place your email here"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Label for="email">Email</Form.Label>
        </Form.Group>
        <Form.Group className="mb-3 form-floating" controlId="password">
          <Form.Control
            placeholder="Enter your password here"
            id="password"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Label for="password">Password</Form.Label>
        </Form.Group>
        <Button type="submit" variant="warning">Sign In</Button>
      </Form>
      <div className="mb-3"></div>
      <div>
        New customer?{" "}
        <Link to={`/signup?redirect=${redirect}`} style={{color: 'gold', textDecoration: 'none'}}>Create your account</Link>
      </div>
      {/* <div className="mb-3">
          Forget Password? <Link to={`/forget-password`} style={{color: 'gold', textDecoration: 'none'}}>Reset Password</Link>
        </div> */}
    </Container>
  );
}
