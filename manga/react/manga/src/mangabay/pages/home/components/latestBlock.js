import React from "react";

//modules
import { Link } from "react-router-dom";

class LatestBlock extends React.Component {
  render() {
    const { manga, status } = this.props;
    const stats = this.getStatus(status);

    return (
      <div className="latest-block">
        <div className="cover">
          <Link
            to={manga.url}
            style={{ backgroundImage: "url(" + manga.image + ")" }}
            data-tip={manga.url}
          >
            <img src={manga.image} alt={"Read manga " + manga.name} />
          </Link>
        </div>
        <div className="desc">
          <p>
            <Link to={manga.url}>
              <span data-tip={manga.url}>{manga.name}</span>
              {stats}
            </Link>
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

  getStatus = status => {
    switch (status) {
      case "Hot":
        return <span class="status-hot">Hot</span>;
      case "New":
        return <span class="status-new">New</span>;
      default:
        return "";
    }
  };
}

export default LatestBlock;
