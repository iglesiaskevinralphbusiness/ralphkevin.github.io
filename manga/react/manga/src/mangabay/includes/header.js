import React from "react";

import { Link } from "react-router-dom";

class Header extends React.Component {

  state = {
    searchResult: [],
    list: this.props.list,
    show: false
  }

  render() {

    return (
      <header>
        <div className="header-block">
          <div className="wrap"></div>
        </div>
        <div className="header-nav">
          <div className="wrap">
            <ul>
              <li>
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="/manga-list">MANGA LIST</Link>
              </li>
              <li>
                <Link to="/latest-release">LATEST RELEASE</Link>
              </li>
              <li>
                <Link to="/top-manga">TOP MANGA</Link>
              </li>
              <li>
                <Link to="/advance-search">ADVANCE SEARCH</Link>
              </li>
            </ul>
            <div className="header-nav-search">
              <input type="text" placeholder="Search Manga Name / Artist" onKeyUp={this.handleSearch}></input>
              <div className={this.state.show ? 'auto-search-result' : 'auto-search-result hide'}>
                <ul>
                  {
                    this.state.searchResult.map(s => (
                      <li>
                        <Link to={s.url} onClick={this.handleSelected}>
                          <span className="title">{s.name}</span>
                          <span className="artist">{s.artist}</span>
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
  handleSearch = e => {
    if(e.key === 'Enter'){
      console.log('enter press here! ')
    }
    else {
      const value = e.target.value.trim();
      if(value.length >= 4){
        const searchResult = this.state.list.filter(l => l.name.toUpperCase().includes(value.toUpperCase()) || l.artist.toUpperCase().includes(value.toUpperCase()));
        const show = true;
        this.setState({searchResult,show});
      }
      else {
        const show = false;
        this.setState({show});
      }
    }
  }
  handleSelected = () => {
    const searchResult = [];
    const show = false;
    this.setState({searchResult,show});
  }
}

export default Header;
