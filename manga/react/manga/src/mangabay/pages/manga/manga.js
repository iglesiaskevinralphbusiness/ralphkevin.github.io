import React from "react";

//modules
import { Redirect } from "react-router-dom";

//components
import Sidebar from "./../../includes/sidebar/sidebar";
import MangaDetails from "./components/mangaDetails";
import ChapterList from "./components/chapterList";
import Breadcrumbs from "../../shared/components/breadcrumbs";

class Manga extends React.Component {
  render() {
    const { list, chapters } = this.props;
    const { name } = this.props.match.params;

    const manga = list.find(l => l.url == "/" + name);
    if (!manga) {
      return <Redirect to="/not-found" />;
    }

    const breadcrumbs = this.createBreadcrumbs(manga.name);

    return (
      <main>
        <div className="wrap">
          <section className="body-column">
            <div className="body-content manga-info">
              <Breadcrumbs data={breadcrumbs}></Breadcrumbs>
              <MangaDetails manga={manga}></MangaDetails>
              <ChapterList manga={manga}></ChapterList>
            </div>
            <Sidebar list={list} chapters={chapters}></Sidebar>
          </section>
        </div>
      </main>
    );
  }

  createBreadcrumbs(name) {
    return [
      {
        name: "Manga Online",
        link: "/"
      },
      {
        name: name,
        link: null
      }
    ];
  }
}

export default Manga;
