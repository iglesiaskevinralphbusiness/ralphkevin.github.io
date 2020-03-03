import React from "react";

import { Link } from "react-router-dom";

class SidebarTopManga extends React.Component {
  render() {
    const { chapters, top } = this.props;

    return (
      <div className="content-block">
        <h2>
          <span>Most Popular Manga</span>
        </h2>
        <div className="side-popular">
          <ul>
            {
              top.filter(f => {
                const find = chapters.find(c => c.manga_url == f.url);
                if(find){
                  return true;
                }
                return false;
              }).slice(0,5).map(t => (
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
        <Link to="/top-manga" className="view-more">View More </Link>
      </div>
    );
  }
}

export default SidebarTopManga;
