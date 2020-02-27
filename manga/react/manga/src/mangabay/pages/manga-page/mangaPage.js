import React from "react";

//modules
import { Redirect } from "react-router-dom";

//components
import Sidebar from "./../../includes/sidebar/sidebar";
import Breadcrumbs from "../../shared/components/breadcrumbs";

class MangaPage extends React.Component {
  render() {
    const { list, chapters } = this.props;
    const { name, chapter } = this.props.match.params;

    //get manga details
    const manga = list.find(l => l.url == "/" + name);
    if (!manga) {
      return <Redirect to="/not-found" />;
    }

    //get manga current chapter
    const manga_url = `/${name}/${chapter}`;
    const manga_chapter = chapters.find(c => c.url == manga_url);
    if (!manga_chapter) {
      return <Redirect to="/not-found" />;
    }

    //get manga previous chapter
    const prevChapter = this.getPreviousChapter(
      list,
      manga.url,
      manga_chapter.url
    );
    console.log(prevChapter);
    //get manga next chapter

    const breadcrumbs = [
      {
        name: "Manga Online",
        link: "/"
      },
      {
        name: manga.name,
        link: manga.url
      },
      {
        name: manga_chapter.name,
        link: null
      }
    ];

    return (
      <main>
        <div className="wrap">
          <section className="body-column">
            <div className="body-content manga-info">
              <Breadcrumbs data={breadcrumbs}></Breadcrumbs>
              test
            </div>
            <Sidebar list={list} chapters={chapters}></Sidebar>
          </section>
        </div>
      </main>
    );
  }

  getPreviousChapter(list, manga_url, chapter_url) {
    const manga = list.find(data => data.url == manga_url);
    const chapter = manga.chapters.find(c => c.link == chapter_url);
    const index = manga.chapters.indexOf(chapter);
    console.log(manga.chapters);
    console.log(index);

    if (index > 1) {
      return manga.chapters[index - 1].link;
    } else {
      return null;
    }
  }
  getNextChapter() {}
}

export default MangaPage;
