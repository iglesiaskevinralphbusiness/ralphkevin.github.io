import React from 'react';
import './App.css';

let m_chapters = require('./services/chapters.json');

class Chapters extends React.Component {
  
  state = {
    chapters: m_chapters
  }

  render() {
    const list = this.props.list;
    const chapters = [...this.state.chapters];

    let total = '';
    
    const filter = chapters.filter(c => c.manga_url == list.url);
    if(filter.length){
      console.log(filter);
      const total_l = list.chapters.length;
      const total_d = filter.length;
      total = total_l + '/' + total_d;
    }

    return (
    <span>{ total }</span>
    );
  }
}



export default Chapters;
