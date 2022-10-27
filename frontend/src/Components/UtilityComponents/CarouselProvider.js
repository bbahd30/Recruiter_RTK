import React from 'react';
import Slider from 'react-slick';
import MyDialogBox from './MyDialogBox';
import AddIcon from '@mui/icons-material/Add';

const CarouselProvider = () =>
{
    const CarouselSlider = (props) =>
    {
        var settings =
        {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
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
                <MyDialogBox
                    buttonChild=
                    {
                        <AddIcon sx={{ fontSize: "50px" }} />
                    }
                    dataChild=
                    {
                        props.formComponent
                    }
                    title={props.title}
                />
            </>
        )
    }

    return (
        CarouselSlider
    );
};

export default CarouselProvider;