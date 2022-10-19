import React from 'react';
import Slider from "react-slick";
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Links from '../../Links';


const Carousel = () =>
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

  const [seasons, setSeason] = useState([]);
  const navigate = useNavigate();
  const fetchSeasonData = () =>
  {
    axios
      .get(Links.seasons_api,
        {
          params:
          {
            withCredentials: true
          }
        })
      .then((response) =>
      {
        setSeason(response.data)
      })
      .catch((error) =>
      {
        console.log(error);
      });
  }

  const navigateToSeason = (id) =>
  {
    navigate(`/seasons/${id}`);
  }


  useEffect(() =>
  {
    fetchSeasonData();
  }, []);


  return (
    <>
      <h1>SEASONS</h1>
      <div className='seasonCont'>

        <Slider {...settings}>
          {seasons.map(season =>
          (
            <div className='seasonCard' key={season.id} id={"season" + season.id} onClick={() => { navigateToSeason(season.id) }}>
              <div className='season-year'>{season.year}</div>
              <div className='season-name'>
                {season.season_name}
              </div>
              <div className='season-image'>
                <img
                  src={require('../../Images/2019.png')}
                  width={"80px"} height={"70px"} />
              </div>
              <div className='season-description'>
                {season.description}
              </div>

            </div>
          ))}
        </Slider>
      </div >
    </>
  );
};

export default Carousel;