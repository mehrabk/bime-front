import React, { useState } from 'react';
import { Modal, Box, Typography } from '@material-ui/core';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import { PUBLIC_FOLDER_PATH, API_ADDRESS } from 'shared/helpers/APIUtils';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <>
      <section className="slider d-inline-flex">
        <div className="d-flex align-items-center justify-content-center">
          {slides && slides.length > 1 && (
            <FaArrowAltCircleRight
              className="right-arrow mx-1"
              onClick={nextSlide}
            />
          )}
        </div>
        {slides &&
          slides.map((slide, index) => {
            return (
              <div
                className={
                  index === current
                    ? 'slide active d-flex align-items-center justify-content-center'
                    : 'slide'
                }
                key={index}>
                {index === current && (
                  <img
                    onClick={() => setOpenModal(true)}
                    src={`${PUBLIC_FOLDER_PATH}img/upload/${slide.src}`}
                    // src={`${API_ADDRESS}/upload/${slide.fileName}`}
                    alt="travel image"
                    style={{ maxWidth: '150px', maxHeight: '100px' }}
                    className="img-fluid rounded-sm"
                  />
                )}
              </div>
            );
          })}
        {slides && slides.length > 1 && (
          <div className="d-flex align-items-center justify-content-center">
            <FaArrowAltCircleLeft
              className="left-arrow mx-1"
              onClick={prevSlide}
            />
          </div>
        )}
      </section>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box style={style}>
          <img
            src={`${PUBLIC_FOLDER_PATH}img/upload/${slides[current].src}`}
            className="img-fluid img-fit-container rounded-sm"
          />
        </Box>
      </Modal>
    </>
  );
};

export default ImageSlider;
