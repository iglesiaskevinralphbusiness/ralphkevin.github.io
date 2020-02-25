import React from "react";

class Manga extends React.Component {
  render() {
    const { list, chapters } = this.props;
    const { name } = this.props.match.params;

    const manga = list.find(l => l.url == "/" + name);
    //console.log(manga);

    return <p>test</p>;
  }
}

export default Manga;
