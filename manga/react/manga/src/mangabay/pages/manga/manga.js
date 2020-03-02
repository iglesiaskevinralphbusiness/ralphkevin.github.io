import React from "react";

//modules
import { Redirect } from "react-router-dom";

//components
import Sidebar from "./../../includes/sidebar/sidebar";
import MangaDetails from "./components/mangaDetails";
import ChapterList from "./components/chapterList";
import Breadcrumbs from "../../shared/components/breadcrumbs";
import FacebookComments from "../../shared/components/facebookComments";

class Manga extends React.Component {

  render() {
    window.scrollTo(0, 0);
    const { list, chapters, top, bookmarks, addBookmark } = this.props;
    const { name } = this.props.match.params;

    const manga = list.find(l => l.url == "/" + name);
    if (!manga) {
      return <Redirect to="/not-found" />;
    }

    const fbCommentUrl = manga.url;
    const breadcrumbs = this.createBreadcrumbs(manga.name);
    document.title = 'MangaRiot | ' + manga.name;

    return (
      <main>
        <div className="wrap">
          <section className="body-column">
            <div className="body-content manga-info">
              <Breadcrumbs data={breadcrumbs}></Breadcrumbs>
              <MangaDetails manga={manga} bookmarks={bookmarks} addBookmark={addBookmark}></MangaDetails>
              <ChapterList manga={manga} ></ChapterList>
              <FacebookComments url={fbCommentUrl}></FacebookComments>
            </div>
            <Sidebar list={list} chapters={chapters} top={top}></Sidebar>
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
