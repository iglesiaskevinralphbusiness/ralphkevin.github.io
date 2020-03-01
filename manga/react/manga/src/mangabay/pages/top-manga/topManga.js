import React from "react";
import { Link } from "react-router-dom";

//packages
import _ from "lodash";

//components
import LatestBlock from "./components/latestBlock";
import Sidebar2 from "./../../includes/sidebar/sidebar2";
import SliderLatest from "../../shared/components/sliderLatest";
import FacebookComments from "../../shared/components/facebookComments";

class topManga extends React.Component {
  state = {
    maxItem: 16,
    currentItem: 16,
    viewMore: true
  };

  render() {
    const { list, chapters, top } = this.props;
    const latestRelease = this.getLatestRelease(list);
    const fbCommentUrl = "/top-manga";

    return (
      <main>
        <div className="wrap">
          <section className="pupular content-block">
				    <h2><span>Latest Manga Release</span></h2>
            <SliderLatest latestRelease={latestRelease}></SliderLatest>
          </section>

          <section className="body-column">
            <div className="body-content content-block">
              <h2>
                <span>Most Popular Manga</span>
              </h2>
              <div className="latest">
                {top.slice(0, this.state.currentItem).map(l => (
                  <LatestBlock key={l.url} manga={l.details}></LatestBlock>
                ))}
              </div>
              <div className={this.state.viewMore ? 'view-more' : 'view-more hide'} onClick={() => {this.viewMore(top)}}>
                  <p>View More</p>
              </div>
              <FacebookComments url={fbCommentUrl}></FacebookComments>
            </div>

            <Sidebar2 list={list} chapters={chapters} top={top}></Sidebar2>
          </section>
        </div>

      </main>
    );
  }

  getLatestRelease = (list) => {
    const copied = [...list];
    const latest = copied.filter(c => c.year_release != '').sort((a, b) => new Date(a.year_release) - new Date(b.year_release)).reverse();
    return latest;
  }

  getDateFormat(date) {
    return (
      (date.getMonth() > 8
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)) +
      "/" +
      (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
      "/" +
      date.getFullYear()
    );
  }

  viewMore(popularUpdates){
    const { maxItem, currentItem, viewMore } = this.state;
    const total = popularUpdates.length - 1;
    const newItem = currentItem + 10;
    let newMore = viewMore;
    
    if(currentItem + maxItem < total){
      newMore = true;
    }
    else if(currentItem + maxItem  == total){
      newMore = true;
    }
    else if(currentItem + maxItem > total){
      newMore = false;
    }
    this.setState({ currentItem: newItem, viewMore: newMore });
  }
}

export default topManga;
