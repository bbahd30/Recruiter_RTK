import React from 'react';
import Slider from "react-slick";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Links from '../../Links';
import AddIcon from '@mui/icons-material/Add';
import CustomizedDialogs from './Dialog';
import LoginButton from '../LoginComp/LoginButton';
import AddSeasonForm from './AddSeasonForm';
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
      {/* <h1>SEASONS</h1> */}
      <div className='seasonCont'>

        <Slider {...settings} className="slider">
          {
            seasons.map(season =>
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
        <div>
          <CustomizedDialogs
            buttonChild=
            {
              <AddIcon sx={{ fontSize: "50px" }} />
            }
            dataChild=
            {
              <AddSeasonForm />
            }
            title="Add Season"
          />


        </div>

      </div>
    </>
  );
};

export default Carousel;