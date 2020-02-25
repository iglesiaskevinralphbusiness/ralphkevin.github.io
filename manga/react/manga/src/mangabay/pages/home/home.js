import React from "react";

//packages
import _ from "lodash";

//components
import LatestBlock from "./components/latestBlock";
import Sidebar from "./../../includes/sidebar/sidebar";

class Home extends React.Component {
  render() {
    const { list, chapters } = this.props;

    const latestReleast = this.getLatestRelease(list, chapters);

    return (
      <main>
        <div className="wrap">
          <section className="body-column">
            <div className="body-content content-block">
              <h2>
                <span>Latest Release</span>
              </h2>
              <div className="latest">
                {latestReleast.slice(0, 10).map(l => (
                  <LatestBlock key={l.url} manga={l}></LatestBlock>
                ))}
              </div>
            </div>

            <Sidebar list={list} chapters={chapters}></Sidebar>
          </section>
        </div>
      </main>
    );
  }

  getLatestRelease = (list, chapters) => {
    //sort
    //const lastest = chapters
    //  .sort(
    //    (a, b) =>
    //      new Date(...a.release_date.split("/").reverse()) -
    //      new Date(...b.release_date.split("/").reverse())
    //  )
    //  .reverse();

    const lastest = chapters
      .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
      .reverse();

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
}

export default Home;
