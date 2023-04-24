import { useContext } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import MessageBox from "../components/MessageBox";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import cart from '../assets/no_cart.jpg'


export default function CartScreen() {
  const navigate = useNavigate()
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;


  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`)
    if(data.countInStock <= quantity){
      window.alert('Sorry. the product is out stock')
      return;
    }

    ctxDispatch({
      type: 'CART_ADD_ITEM', 
      payload: {...item, quantity}
    })
  }

  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item})
  }

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping')
  }

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <MessageBox variant="light">
          <img src = {cart} alt="cart" /> <Link to="/" style={{color: 'gold', fontSize: '30px', textDecoration: 'none'}}>Go shopping ....</Link>
        </MessageBox>
      ) : (
        <div className="container">
          <div className="table-responsive">
            <table className="table table-hover ">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>quantity</th>
                  <th>delete</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {cartItems.map((item) => (
                  <tr>
                    <td>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded "
                        id="img-thumbnail"
                      />
                    </td>
                    <td>
                      <Link style={{color: 'black', textDecoration: 'none'}} to={`/product/${item.slug}`}>{item.name}</Link>
                    </td>
                    <td>${item.price}</td>
                    <td> 
                      <Button
                        variant="light"
                        disabled={item.quantity === 1}
                        onClick={() => updateCartHandler(item, item.quantity - 1)}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{" "}
                      <span>{item.quantity}</span>{" "}
                      <Button
                        variant="light"
                        onClick={() => updateCartHandler(item, item.quantity + 1)}
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </td>
                    <td>
                      <Button onClick={() => removeItemHandler(item)} variant="light">
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
                  </div>
                  <h1 style={{display: 'inline-block'}}>
                  subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items)
                      : ${cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                      </h1>
                  <Button
                    type="button"
                    onClick={checkoutHandler}
                    variant="primary"
                    disabled={cartItems.length === 0}
                    className="offset-10"
                  >
                    Proceed to checkout
                  </Button>
      </div>
   
)}
</div>
  )
  }
