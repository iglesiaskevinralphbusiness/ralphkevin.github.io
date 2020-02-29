import React from "react";

//modules
import { Link } from "react-router-dom";

//packages
import _ from "lodash";

class Sidebar extends React.Component {
  render() {
    const { list, top } = this.props;

    const categories = this.getCategories(list);

    return (
      <div className="body-sidebar">
        <div className="content-block">
          <h2>
            <span>Most Popular Manga</span>
          </h2>
          <div className="side-popular">
            <ul>
              {
                top.slice(0,5).map(t => (
                  <li key={t.url}>
                    <div className="cover">
                      <Link to={t.url} style={{ backgroundImage: "url(" + t.details.image + ")" }}>
                        <img src={t.details.image} alt={'Read manga ' + t.details.name} />
                      </Link>
                    </div>
                    <div className="desc">
                      <p className="title">
                        <Link to={t.url}>{t.details.name}</Link>
                      </p>
                      <p className="chapter">
                        {t.details.chapters.slice(t.details.chapters.length - 1, t.details.chapters.length).map(c => (
                          <Link key={c.link} to={c.link}>{c.name}</Link>
                        ))}
                      </p>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        <div className="content-block">
          <h2>
            <span>Categories</span>
          </h2>
          <div className="categories">
            <ul>
              <li>
                <a href="/newest">Newest</a>
              </li>
              <li>
                <a href="/completed">Completed</a>
              </li>
              <li>
                <a href="/on-going">Ongoing</a>
              </li>
            </ul>
            <ul>
              {categories
                .filter(c => c.name != "")
                .map(c => (
                  <li key={c.name}>
                    <Link to={c.url}>
                      {c.name} <span>({c.total})</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  getCategories = list => {
    let holder = [];
    list.map(l => {
      l.genre.map(g => {
        holder[g.name] = g.link;
      });
    });

    let organize = [];
    for (var key in holder) {
      if (holder.hasOwnProperty(key)) {
        let total = 0;
        list.find(l => {
          const found = l.genre.find(g => g.name == key);
          if (found) {
            total++;
          }
        });

        const value = {
          name: key,
          url: holder[key],
          total: total
        };
        organize = _.concat(organize, value);
      }
    }

    const sorted = _.sortBy(organize, ["name"]);
    return sorted;
  };
}

export default Sidebar;
