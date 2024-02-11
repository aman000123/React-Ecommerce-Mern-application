import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './layout.css'

const Backgrounds = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        centerMode: true,
        centerPadding: '0',
    };

    return (
        <div className='sliders'>
            <div className="slider-container customSlides" style={{ width: '100vw', }}>
                <Slider {...settings}>
                    <div>
                        <img
                            src="/images/pic11.jpg"
                            className="d-block w-100"
                            alt=""
                            style={{ height: '300px', objectFit: 'cover' }} />
                    </div>
                    <div>
                        <img
                            src="/images/pic12.jpg"
                            className="d-block w-100"
                            alt=""
                            style={{ height: '300px', objectFit: 'cover' }} />
                    </div>
                    <div> <img
                        src="/images/pic13.jpg"
                        className="d-block w-100"
                        alt=""
                        style={{ height: '300px', objectFit: 'cover' }} />
                    </div>
                    <div>
                        <img
                            src="/images/pexels-sora-shimazaki-5926462.jpg"
                            className="d-block w-100"
                            alt=""
                            style={{ height: '300px', objectFit: 'cover' }} />
                    </div>
                </Slider>
            </div>

        </div>
    );
};

export default Backgrounds;
