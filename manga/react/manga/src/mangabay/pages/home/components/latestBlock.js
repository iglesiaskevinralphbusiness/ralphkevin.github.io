import React from "react";

//modules
import { Link } from "react-router-dom";

class LatestBlock extends React.Component {
  render() {
    const { manga } = this.props;

    return (
      <div className="latest-block">
        <div className="cover">
          <Link to={manga.url}>
            <img src={manga.image} alt={manga.name} />
          </Link>
        </div>
        <div className="desc">
          <p>
            <Link to={manga.url}>{manga.name}</Link>
          </p>
          <ul>
            {manga.chapter.slice(0, 3).map(e => {
              return (
                <li key={e.url}>
                  <Link to={e.url}>{e.name}</Link>
                  <span>{e.release_date}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default LatestBlock;
