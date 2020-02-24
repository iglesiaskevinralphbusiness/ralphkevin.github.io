import React from 'react';
import './App.css';
import Chapters from './chapters';

let m_list = require('./services/list.json');
let m_chapters = require('./services/chapters.json');
console.log(m_list);
console.log(m_chapters);

class List extends React.Component {
  
  state = {
    list: m_list
  }

  render() {
    const list = [...this.state.list];
    

    return (
      <ul>
        {
          list.map(l => (
            <li key={ l.name }>{ l.name }
            <Chapters list={l}></Chapters>
            </li>
          ))
        }


      </ul>
    );
  }
}



export default List;
