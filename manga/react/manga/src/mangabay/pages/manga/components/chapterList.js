import React from "react";

//modules
import { Link } from "react-router-dom";

class ChapterList extends React.Component {
  render() {
    const { manga } = this.props;

    return (
      <div className="manga-chapters">
        <ul className="chapters-head">
          <li>
            <span className="chapter">Chapter Name</span>
            <span className="date">Date Released</span>
          </li>
        </ul>
        <ul className="chapters-list">
          {manga.chapters.map(c => (
            <li key={c.link}>
              <Link to={c.link}>
                <span className="chapter">{c.name}</span>
                <span className="date">{c.release_date}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ChapterList;
