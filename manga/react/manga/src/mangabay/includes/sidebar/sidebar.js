import React from "react";

//modules
import { Link } from "react-router-dom";

//packages
import _ from "lodash";

//components
import SidebarTopManga from "../../shared/components/sidebarTopManga";

//ads
import Ads250x300 from "../../shared/adsterra/ads250x300";
import Ads320x50 from "../../shared/adsterra/ads320x50";

class Sidebar extends React.Component {
  render() {
    const { list, chapters, top } = this.props;

    const categories = this.getCategories(list);

    return (
      <div className="body-sidebar">
        <SidebarTopManga chapters={chapters} top={top} />
        <Ads250x300 />
        <div className="content-block">
          <h2>
            <span>Categories</span>
          </h2>
          <div className="categories">
            <ul>
              <li>
                <Link to="/latest-release">Newest</Link>
              </li>
              <li>
                <a href="/status/completed">Completed</a>
              </li>
              <li>
                <a href="/status/on-going">Ongoing</a>
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
        <Ads320x50 />
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
