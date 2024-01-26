import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Backgrounds = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        autoplaySpeed: 3000,
        centerMode: true,
        centerPadding: '0',
    };

    return (
        <div className="slider-container" style={{ width: '100vw', margin: '0 auto' }}>
            <Slider {...settings}>
                <div>
                    <img
                        src="/images/pic11.jpg"
                        className="d-block w-100"
                        alt=""
                        style={{ height: '300px', objectFit: 'cover' }}
                    />
                </div>
                <div>
                    <img
                        src="/images/pic12.jpg"
                        className="d-block w-100"
                        alt=""
                        style={{ height: '300px', objectFit: 'cover' }}
                    />
                </div>
                <div>
                    <img
                        src="/images/pic13.jpg"
                        className="d-block w-100"
                        alt=""
                        style={{ height: '300px', objectFit: 'cover' }}
                    />
                </div>
                <div>
                    <img
                        src="/images/pexels-sora-shimazaki-5926462.jpg"
                        className="d-block w-100"
                        alt=""
                        style={{ height: '300px', objectFit: 'cover' }}
                    />
                </div>
            </Slider>
        </div>
    );
};

export default Backgrounds;
