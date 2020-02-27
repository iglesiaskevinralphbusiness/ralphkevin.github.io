import React from "react";

//packages
import _ from "lodash";

class MangaList extends React.Component {
  render() {
    const { list, chapters } = this.props;
    const alphabetical = this.getAlphabeticalOrder(list);
    console.log(alphabetical); // <- alphabetical ready

    return <p>test1</p>;
  }

  getAlphabeticalOrder(list){
    let organized = [];
    let reorganized = [];

    list.map(l => {
      const name = l.name;
      const letter = name.trim().charAt(0);
      organized[letter] = organized[letter] ? _.concat(organized[letter], l) : l;
    });

    for (var key in organized) {
      if (organized.hasOwnProperty(key)) {   
        const value = {
          alphabet: key,
          manga: organized[key]
        };
        reorganized = reorganized ? _.concat(reorganized, value) : value;
      }
    }

    return reorganized;
  }
}

export default MangaList;
