import React from "react";
import { Link } from "react-router-dom";

//packages
import _ from "lodash";

//components
import LatestBlock from "./components/latestBlock";
import Sidebar from "./../../includes/sidebar/sidebar";
import SliderLatest from "../../shared/components/sliderLatest";
import FacebookComments from "../../shared/components/facebookComments";

class LatestManga extends React.Component {
  state = {
    maxItem: 16,
    currentItem: 16,
    viewMore: true
  };

  componentDidMount() {
    document.title = 'MangaRiot | Latest Release';
  }

  render() {
    const { list, chapters, top } = this.props;
    const popularUpdates = this.getPopularUpdates(list, chapters);
    const latestRelease = this.getLatestRelease(list);
    const fbCommentUrl = "/latest-release";
    
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
                <span>Latest Manga Updates</span>
              </h2>
              <div className="latest">
                {popularUpdates.slice(0, this.state.currentItem).map(l => (
                  <LatestBlock key={l.url} manga={l}></LatestBlock>
                ))}
              </div>
              <div className={this.state.viewMore ? 'view-more' : 'view-more hide'} onClick={() => {this.viewMore(popularUpdates)}}>
                  <p>View More</p>
              </div>
              <FacebookComments url={fbCommentUrl}></FacebookComments>
            </div>

            <Sidebar list={list} chapters={chapters} top={top}></Sidebar>
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

  getPopularUpdates = (list, chapters) => {
    const copied = [...chapters];
    const lastest = copied.sort((a, b) => new Date(a.release_date) - new Date(b.release_date)).reverse();

    //today and yesterday (not used yet)
    const today = this.getDateFormat(new Date());
    let yesterday = new Date();
    yesterday.setTime(yesterday.getTime() - 24 * 60 * 60 * 1000 * 1);
    yesterday = this.getDateFormat(yesterday);
    let yesyesterday = new Date();
    yesyesterday.setTime(yesyesterday.getTime() - 24 * 60 * 60 * 1000 * 2);
    yesyesterday = this.getDateFormat(yesyesterday);

    //organize chapters
    let holder = [];
    lastest.map(l => {
      let temp = l;
      if (holder[l.manga_url]) {
        temp = _.concat(holder[l.manga_url], l);
      }
      holder[l.manga_url] = temp;
    });

    //organize with list
    let organize = [];
    for (var key in holder) {
      if (holder.hasOwnProperty(key)) {
        const find = list.find(l => l.url == key);
        const value = {
          url: find.url,
          name: find.name,
          image: find.image,
          alternative_name: find.alternative_name,
          year_release: find.year_release,
          status: find.status,
          author: find.author,
          artist: find.artist,
          reading_direction: find.reading_direction,
          genre: find.genre,
          chapter: _.concat([], holder[key])
        };
        organize = _.concat(organize, value);
      }
    }

    return organize;
  };

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

export default LatestManga;
