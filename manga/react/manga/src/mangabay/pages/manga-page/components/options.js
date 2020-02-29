import React from "react";
import { Link, useHistory } from "react-router-dom";

class Options extends React.Component {

  state = {
    chapter_active: this.props.optionSettings.chapters.active,
    episode_active: this.props.optionSettings.episodes.active
  };
  
  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        chapter_active: nextProps.optionSettings.chapters.active,
        episode_active: nextProps.optionSettings.episodes.active,
      }
    );
  }

  render() {
    const { optionSettings } = this.props;

    const prev = this.setButton(optionSettings.buttons.prev,'Previous');
    const next = this.setButton(optionSettings.buttons.next,'Next');

    return (
      <div className="page-options">
        <div className="chapters">
          <select onChange={this.changePath}  value={this.state.chapter_active}>
            {
              optionSettings.chapters.list.map(l => (
                <option key={l.link} value={l.link}>{l.name}</option>
              ))
            }
          </select>
        </div>
        <div className="total">
          <select>
            <option>Single Page</option>
            <option>All Pages</option>
          </select>
        </div>
        <div className="spacer"></div>
        <div className="buttons">
          <div className="pageof">
            <select onChange={this.changePath}  value={this.state.episode_active}>
            {
              optionSettings.episodes.list.map(l => (
                <option key={l.url} value={l.url}>{l.name}</option>
              ))
            }
            </select>
            <span>of {optionSettings.episodes.list.length}</span>
          </div>
          <div className="btn">
            {prev}
            {next}
          </div>
        </div>
      </div>
    );
  }

  setButton = (prev,value) => {
    if(prev){
      return <Link to={prev}><button>{value}</button></Link>
    }
    return
  }

  changePath = e => {
    this.props.history.push(e.target.value)    
  }

}

export default Options;
