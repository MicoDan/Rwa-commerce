import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import { getError, br } from '../utils';

export default function ForgetPasswordScreen() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post(br + '/api/users/forget-password', {
        email,
      }, {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      });
      toast.success(data.message);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <h1 className="my-3">Forget Password</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3 form-floating" controlId="email">
          <Form.Control
            id='email'
            placeholder='place your email here'
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Label for="email">Email</Form.Label>
        </Form.Group>

        <div className="mb-3">
          <Button type="submit" variant='warning'>submit</Button>
        </div>
      </Form>
    </Container>
  );
}
