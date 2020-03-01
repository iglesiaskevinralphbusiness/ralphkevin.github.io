import React from "react";

import { Link } from "react-router-dom";

//markets
import Slider from 'react-slick';

class SliderLatest extends React.Component {
  render() {
    const { latestRelease } = this.props;

    var slickSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 1,
      autoplay: true,
      speed: 500,
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 414,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        }
      ]
    };

    return (
      <Slider {...slickSettings}>
        {
          latestRelease.slice(0,20).map(l => (
            <div key={l.url}>
              <Link className="slide-block" to={l.url} style={{ backgroundImage: "url(" + l.image + ")" }}>
                <img src={l.image} alt={'Read manga ' +  l.name} />
                <div className="desc">
                  <p className="name">{l.name}</p>
                  <p className="chapter">
                    { l.chapters.slice(l.chapters.length - 1,l.chapters.length).map(c => c.name)}
                  </p>
                </div>
              </Link>
            </div>
          ))
        }
      </Slider>
    );
  }
}

export default SliderLatest;
