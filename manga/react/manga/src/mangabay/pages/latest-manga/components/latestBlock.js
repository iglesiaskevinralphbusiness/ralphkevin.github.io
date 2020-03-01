import React from "react";

//modules
import { Link } from "react-router-dom";

class LatestBlock extends React.Component {
  render() {
    const { manga } = this.props;

    return (
      <div className="latest-block-all">
        <div className="manga-details">
          <div className="details-image">
            <Link to={manga.url} className="img-container" style={{ backgroundImage: "url(" + manga.image + ")" }}>
              <img src={manga.image} alt={'Read manga ' + manga.alternative_name}/>
            </Link>
          </div>
          <div className="details-block">
            <h2><Link to={manga.url}>{manga.name}</Link></h2>
            <dl>
              <dt>Alternate Name:</dt>
              <dd>{manga.alternative_name}</dd>
            </dl>
            <dl>
              <dt>Genre:</dt>
              <dd>
                {
                  manga.genre.map(g => (
                    <span key={g.name}>{g.name}</span>
                  ))
                }
              </dd>
            </dl>
            <dl>
              <dt>Year of Release:</dt>
                <dd>{manga.year_release}</dd>
            </dl>
            <dl>
              <dt>Status:</dt>
              <dd>{manga.status}</dd>
            </dl>
            <dl>
              <dt>Author:</dt>
              <dd>{manga.author}</dd>
            </dl>
            <dl>
              <dt>Artist:</dt>
              <dd>{manga.artist}</dd>
            </dl>
            <dl>
              <dt>Reading Direction:</dt>
              <dd>{manga.reading_direction}</dd>
            </dl>
          </div>
        </div>
      </div>
    );
  }
}

export default LatestBlock;
