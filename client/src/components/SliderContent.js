import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function SliderContent({ activeIndex, sliderImage }) {
   const navigate = useNavigate()
  const clickHandler = () => {
    navigate('/Home')
  }

  return (
    <section className="container rounded " style={{backgroundColor: 'rgba(243, 220, 88, 1)'}}>
      {sliderImage.map((slide, index) => (
        <div
        id="test"
          key={index}
          className={index === activeIndex ? "slides active" : "inactive"}
        >
          <div id="slido">
          <div className="slider-title-text">
          <h2 className="slide-title">{slide.title}</h2>
          <h2 className="slide-text">{slide.description}</h2>
          <Button className="btn_shop " onClick={clickHandler}  variant="warning">Shop now</Button>
          </div>
          <div className="">
          <img className="slide-image" src={slide.urls} alt=""/>
          </div>
          </div>
        </div>
      ))}
      
    </section>
  );
}

export default SliderContent;
