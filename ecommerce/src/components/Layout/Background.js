import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Backgrounds = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000, // Change the speed of transition in milliseconds
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 10000, // Change the delay between slides in milliseconds
        centerMode: true, // Center the active slide

    };

    return (
        <div className="slider-container">
            <Slider {...settings}>
                <div>
                    <img
                        src="/images/pexels-karolina-grabowska-5625110.jpg"
                        className="d-block w-100"
                        alt=""
                        style={{ height: '350px', objectFit: 'cover' }}
                    />
                </div>
                <div>
                    <img
                        src="/images/pexels-karolina-grabowska-5650023.jpg"
                        className="d-block w-100"
                        alt=""
                        style={{ height: '350px', objectFit: 'cover' }}
                    />
                </div>
                <div>
                    <img
                        src="/images/pexels-sora-shimazaki-5926462.jpg"
                        className="d-block w-100"
                        alt=""
                        style={{ height: '350px', objectFit: 'cover' }}
                    />
                </div>
            </Slider>
        </div>
    );
};

export default Backgrounds;
