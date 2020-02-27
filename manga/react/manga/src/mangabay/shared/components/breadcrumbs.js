import React from "react";

import { Link } from "react-router-dom";

class Breadcrumbs extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <div className="breadcrumbs">
        <ul>
          {data.map(d => {
            if (d.link) {
              return (
                <li key={d.name}>
                  <Link to={d.link}>{d.name}</Link>
                </li>
              );
            } else {
              return <li key={d.name}>{d.name}</li>;
            }
          })}
        </ul>
      </div>
    );
  }
}

export default Breadcrumbs;
