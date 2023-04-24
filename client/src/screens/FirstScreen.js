import React from "react";
import Slider from "../components/Slider";
import Card from "react-bootstrap/Card";
import search_icon from "../icons/search_icon.jpg";
import shop from "../icons/shop.jpg";
import cash_back from "../icons/cashback.jpg";
import maps from "../icons/maps.jpg";
import cart from "../icons/cart_icon.jpg";
import easy from "../icons/easy_to_chose-removebg-preview.jpg";
import paypal from "../icons/paypal.jpg";
import price from "../icons/price.jpg";

const FirstScreen = () => {
  return (
    <div className="container">
      <Slider />
      <h1
        className="text-warning"
        id="works"
      >
        How it works
      </h1>
      <div>
        <div className="first_icons">
        <div id="card_1">
            <Card  className="shadow  mb-5 bg-white rounded">
              <Card.Title>
                <img
                  id="search_image"
                  className="cart_card"
                  src={search_icon}
                  alt="search_icon"
                />
              </Card.Title>
              <Card.Body>
                <h3 id="text_1" className="text-warning">
                  Search
                </h3>
                <p id="p_1">
                  By typing the product you wish to buy and access it directly.
                </p>
              </Card.Body>
            </Card>
            </div>
            <div id="card_2">
            <Card  className="shadow  mb-5 bg-white rounded">
              <Card.Title>
                <img id="search_image" className="shop_card" src={shop} alt="search_icon" />
              </Card.Title>
              <Card.Body>
                <h1 id="text_1" className="text-warning">
                  Shop
                </h1>
                <p id="p_12">
                  Start shopping immediately by clicking the <span className="text-warning">shop now</span> button above and let's amaze you.
                </p>
              </Card.Body>
            </Card>
            </div>
            </div>
        <div className="second_icons">
              <div className="cash_back2">
        
            <Card className="shadow  mb-5 bg-white rounded">
              <Card.Title>
                <img id="search_image" className="cash_card" src={cash_back} alt="cash_back" />
              </Card.Title>
              <Card.Body>
                <h1 id="text_1" className="text-warning">
                  CashBack
                </h1>
                <p id="p_1_unique">
                  100% guaranteed money-back if the product doesn't meet your
                  expectations
                </p>
              </Card.Body>
            </Card>
          </div>
          <div className="cash_back2" id="cash_back21">
            <Card
              className="shadow  mb-5 bg-white rounded"
            >
              <Card.Title>
                <img id="search_image" className="maps_card" src={maps} alt="maps_icon" />
              </Card.Title>
              <Card.Body>
                <h1 id="text_1" className="text-warning">
                  maps
                </h1>
                <p id="p_1">
                  We are able to find you at your exact location using google
                  maps
                </p>
              </Card.Body>
            </Card>
          </div>
          </div>
          <div id="cart_itemss">
            <Card
              className="shadow  mb-5 bg-white rounded"
            >
              <Card.Title>
                <img className="maps_card" src={cart} alt="cart_icon" id="maps_card"/>
              </Card.Title>
              <Card.Body>
                <h2 id="text_1" className="text-warning">
                  Unlimited cart items
                </h2>
                <p id="p_1">
                  you have the ability to order unlimited items.
                </p>
              </Card.Body>
            </Card>
          </div>
        
      </div>


      <div>
        <h1
          id="text_2"
          className="text-warning works"
        >
          Our Key features
        </h1>
            <Card className="shadow  mb-5 bg-white rounded">
              <Card.Title>
                <img id="price-img" className="cash_card" src={price} alt="cash_back" />
              </Card.Title>
              <Card.Body>
                <h1 id='price_header'  className="text-warning">
                  Price comparison
                </h1>
                <p id="price_text">
                Get the best value for your money with our e-commerce website. We offer products at prices that are cheaper than the competition, without sacrificing quality. Shop with us and discover a wide selection of affordable goods that fit your budget.
                </p>
              </Card.Body>
            </Card>
         <div className="third_icons">
          <div className="features">
            <Card
              className="shadow  mb-5 bg-white rounded"
            >
              <Card.Title>
                <img id="easy"  className="maps_card" src={easy} alt="maps_icon" />
              </Card.Title>
              <Card.Body>
                <h1 className="text-warning">
                  Easy to use
                </h1>
                <p id="p_paypal1">
                  It is easy to use and not to mention the user-friendly interface
                </p>
              </Card.Body>
            </Card>
          </div>
          <div className="features">
            <Card
              className="shadow  mb-5 bg-white rounded"
            >
              <Card.Title>
                <img id="paypal_icon" src={paypal} alt="cart_icon" className="paypal-icon"/>
              </Card.Title>
              <Card.Body>
                <h2 className="text-warning">
                  Paypal payment method
                </h2>
                <p id="p_paypal">
                 It uses one of the best payment methods which is paypal.
                </p>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstScreen;
