import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Store } from "../Store";
import { useContext } from "react";
import Navbar from 'react-bootstrap/Navbar'
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useState } from "react";

import "react-toastify/dist/ReactToastify.css";



 const Header = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    const signoutHandler = () => {
        ctxDispatch({ type: "USER_SIGNOUT" });
        localStorage.removeItem("userInfo");
        localStorage.removeItem("paymentMethod");
        window.location.href = "/signin";
      };
    return(
        <header>
          <Navbar bg="white" variant="white" expand="lg">
            <Container>
              <Button
                id="btn2"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i> {/*creates hamburger menu */}
              </Button>
              <LinkContainer to="/">
                <Navbar.Brand className="text-warning offset-1" >RwaShop</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav" className="offset-1 search_box">
                <Nav className="me-auto offset-6" w-100 justify-content-end>
                  <Link to="/cart" className="nav-link text-warning">
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown" className="text-warning">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item className="text-warning">User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderHistory">
                        <NavDropdown.Item className="text-warning">Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item text-warning"
                        to="/signin"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                  {state.userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown" className="text-warning">
                      <LinkContainer to='/admin/dashboard'>
                        <NavDropdown.Item className="text-warning">Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/products'>
                        <NavDropdown.Item className="text-warning">Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/orders'>
                        <NavDropdown.Item className="text-warning">Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/users'>
                        <NavDropdown.Item className="text-warning">Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
    )
}
export default Header