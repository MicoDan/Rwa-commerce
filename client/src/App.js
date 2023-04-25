import { BrowserRouter, Route, Routes } from "react-router-dom";
import FirstScreen from "./screens/FirstScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Store } from "./Store";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShippingAddressScreen from "./screens/ShippingAdressScreen";
import SignupScreen from "./screens/SignupScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import OrderScreen from "./screens/OrderScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Button from "react-bootstrap/Button";
import { getError } from "./utils";
import axios from "axios";
import SearchScreen from "./screens/SearchScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardScreen from "./screens/DashboardScreen";
import AdminRoute from "./components/AdminRoute";
import OrderListScreen from "./screens/OrderListScreen";
import ProductListScreen from "./screens/ProductListScreen";
import UserListScreen from "./screens/UserListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ForgetPasswordScreen from "./screens/ForgetPassword";
import ResetPasswordScreen from "./screens/ResetPassword";
import MapScreen from "./screens/MapScreen";
import HomeScreen from "./screens/HomeScreen";
import cart_icon from './icons/cart_nav.jpg'
import linked_in from './icons/linked_in.jpg'
import whatsapp from './icons/whatsapp.jpg'

export default function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([[]]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (error) {
        toast.error(getError(error));
      }
    };
    fetchCategories();
  }, []);

  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? "d-flex flex-column site-container active-cont"
            : "d-flex flex-column site-container"
        }
      >
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="light" variant="white" expand="lg">
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
                    <img className="img_nav" src={cart_icon} alt="cart" />
                    {cart.cartItems.length > 0 && (
                      <Badge pill className="count"  bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  <Link to='/Home' style={{textDecoration: 'none'}} className="text-warning" id="shop">Shop</Link>
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
        <div
          className={
            sidebarIsOpen
              ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column"
              : "side-navbar d-flex justify-content-between flex-wrap flex-column"
          }
          style={{ 
            position: 'fixed',
            height: '100vh'
           }}
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {Array.isArray(categories) && categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={{
                    pathname: "/search",
                    search: `?category=${category}`,
                  }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link className="text-warning bg-grey">{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/profile" element={
                <ProtectedRoute> <ProfileScreen /></ProtectedRoute>
              } />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/admin/dashboard" element={
              <AdminRoute>
                <DashboardScreen />
                </AdminRoute>
                } />
              <Route path="/admin/orders" element={
              <AdminRoute>
                <OrderListScreen />
                </AdminRoute>
                } />
              <Route path="/admin/products" element={
              <AdminRoute>
                <ProductListScreen />
                </AdminRoute>
                } />
              <Route path="/admin/users" element={
              <AdminRoute>
                <UserListScreen />
                </AdminRoute>
                } />
              <Route path="/orders/:id" element={<ProtectedRoute><OrderScreen /></ProtectedRoute>} />
              <Route path="/admin/product/:id" element={<AdminRoute><ProductEditScreen /></AdminRoute>} />
              <Route path="/admin/user/:id" element={<AdminRoute><UserEditScreen /></AdminRoute>} />
              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen />} />
              <Route path="/Home" element={<HomeScreen />} />
              <Route path="/map" element={<MapScreen />} />
              <Route path="/orderHistory" element={
              <ProtectedRoute>
                <OrderHistoryScreen />
                </ProtectedRoute>} />
              <Route path="/" element={<FirstScreen />} />
              <Route
                path="/forget-password"
                element={<ForgetPasswordScreen />}
              />
              <Route
                path="/reset-password/:token"
                element={<ResetPasswordScreen />}
              />
            </Routes>
          </Container>
        </main>
        <footer className="bg-dark" >
            <h4 className="text-warning" style={{display: 'block'}}>CONTACT THE MANAGER:</h4>
            <Link to='https://www.linkedin.com/in/mico-dan-778732258/'> 
            <img id='footer_item' className="paypal_card" style={{display: 'inline-block', borderRadius: '10px'}}  src={linked_in} alt="linkedIn_icon" /></Link>
             <img id="footer_item" className="paypal_card" style={{display: 'inline-block', borderRadius: '10px'}}  src={whatsapp} alt="whatsapp_icon" /> 
             <p id="footer_item" className="text-warning" style={{display: 'inline-block'}} >0791324912</p>
          <div className="text-center text-white">© 2023 - 2026, All rights reserved</div>
         
        </footer>
      </div>
    </BrowserRouter>
  );
}
