import React, { useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import { PUBLIC_FOLDER_PATH, API_ADDRESS } from 'shared/helpers/APIUtils';

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const [show, setShow] = useState(false);
  console.log(slides);

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  const imageHandler = () => {
    setShow(true);
  };

  return (
    <>
      <section className="slider">
        {slides && slides.length > 1 && (
          <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
        )}
        {slides && slides.length > 1 && (
          <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
        )}
        {slides &&
          slides.map((slide, index) => {
            return (
              <div
                className={index === current ? 'slide active' : 'slide'}
                key={index}>
                {index === current && (
                  <img
                    onClick={imageHandler}
                    // src={`${PUBLIC_FOLDER_PATH}/upload/${slide.fileName}`}
                    src={`${API_ADDRESS}/upload/${slide.fileName}`}
                    alt="travel image"
                    className="image"
                  />
                )}
              </div>
            );
          })}
      </section>
    </>
  );
};

export default ImageSlider;
