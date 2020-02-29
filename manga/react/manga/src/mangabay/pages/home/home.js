import React from "react";
import { Link } from "react-router-dom";

//packages
import _ from "lodash";
import ReactTooltip from 'react-tooltip';

//components
import LatestBlock from "./components/latestBlock";
import Sidebar from "./../../includes/sidebar/sidebar";

//markets
import Slider from 'react-slick';


class Home extends React.Component {
  state = {
    maxItem: 16,
    currentItem: 16,
    viewMore: true
  };

  render() {
    window.scrollTo(0, 0);
    const { list, chapters, top } = this.props;
    const popularUpdates = this.getPopularUpdates(list, chapters);
    const latestRelease = this.getLatestRelease(list);
    

    var slickSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
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
      <main>
        <div className="wrap">
          <section className="pupular content-block">
				    <h2><span>Popular Manga Updates</span></h2>
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
          </section>

          <section className="body-column">
            <div className="body-content content-block">
              <h2>
                <span>Latest Release</span>
              </h2>
              <div className="latest">
                {popularUpdates.slice(0, this.state.currentItem).map(l => (
                  <LatestBlock key={l.url} manga={l}></LatestBlock>
                ))}
              </div>
              <div className={this.state.viewMore ? 'view-more' : 'view-more hide'} onClick={() => {this.viewMore(popularUpdates)}}>
                  <p>View More</p>
              </div>
            </div>

            <Sidebar list={list} chapters={chapters} top={top}></Sidebar>
          </section>
        </div>

        <ReactTooltip
          className='tool-tip-parent'
          place='right'
          type={'dark'}
          getContent={(url) => {
            let data = {
              url: "",
              name: "",
              image: "",
              alternative_name: "",
              year_release: "",
              status: "",
              author: "",
              artist: "",
              reading_direction: "",
              genre: [],
              chapters:[]
            }
            const find = list.find(l => l.url == url);
            if(find){
              data = find;
            }

            return (
              <div className="data-tip-container">
                <div className="manga-details">
                  <div className="details-image">
                    <p className="img-container" style={{ backgroundImage: "url(" + data.image + ")" }}>
                      <img src={data.image} alt={'Read manga ' + data.alternative_name}/>
                    </p>
                  </div>
                  <div className="details-block">
                    <h2>{data.name}</h2>
                    <dl>
                      <dt>Alternate Name:</dt>
                      <dd>{data.alternative_name}</dd>
                    </dl>
                    <dl>
                      <dt>Genre:</dt>
                      <dd>
                        <span>Adventure, Action</span>
                      </dd>
                    </dl>
                    <dl>
                      <dt>Year of Release:</dt>
                       <dd>{data.year_release}</dd>
                    </dl>
                    <dl>
                      <dt>Status:</dt>
                      <dd>{data.status}</dd>
                    </dl>
                    <dl>
                      <dt>Author:</dt>
                      <dd>{data.author}</dd>
                    </dl>
                    <dl>
                      <dt>Artist:</dt>
                      <dd>{data.artist}</dd>
                    </dl>
                    <dl>
                      <dt>Reading Direction:</dt>
                      <dd>{data.reading_direction}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            )
          }}
        />
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

export default Home;
