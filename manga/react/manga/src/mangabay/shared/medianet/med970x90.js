import React from "react";

class Ads468x60 extends React.Component {
  render() {
    const rand = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
    const url = "http://mangariot.com/ads/ads729x90.html?id=" + rand;

    return <iframe src={url} class="ads729x90"></iframe>;
  }
}

export default Ads468x60;
