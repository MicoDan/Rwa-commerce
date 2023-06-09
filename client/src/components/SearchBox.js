import React from "react";
import Form from 'react-bootstrap/Form'
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import { useState } from "react";

export default function SearchBox() {
    const navigate = useNavigate()
    const  [query, setQuery] = useState('')
    const submitHandler = (e) => {
        e.preventDefault()
        navigate(query ? `/search/?query=${query}` : '/search')
    }

    return (
        <Form className="d-flex me-auto search offset-3" onSubmit={submitHandler}>
              <InputGroup>
              <FormControl type="text"
              className="result"
              name= "q"
              id="q"
              onChange = {(e) => setQuery(e.target.value)} placeholder="search products..."
              aria-label="Search Products"
              aria-describedby="button-search"
              >
              </FormControl>
              <Button variant="outline-primary" type="submit" id="button-search" className="rounded-cirle result">
                <i className="fas fa-search text-white"></i>
              </Button>
              </InputGroup>
        </Form>
    )
}