import React from 'react';
import Slider from 'react-slick';

const CarouselProvider = () =>
{
    const CarouselSlider = (props) =>
    {
        var settings =
        {
            dots: true,
            infinite: false,
            slidesToShow: 4,
            // infinite: props.length > 3,
            speed: 500,
            slidesToScroll: 4,
            initialSlide: 0,

            responsive:
                [
                    {
                        breakpoint: 1024,
                        settings:
                        {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings:
                        {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            initialSlide: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings:
                        {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
        };

        return (
            <>
                <Slider {...settings} className="slider">
                    {props.children}
                </Slider>
            </>
        )
    }

    return (
        CarouselSlider
    );
};

export default CarouselProvider;