import React from "react";

//modules
import { Redirect } from "react-router-dom";

//components
import Sidebar from "./../../includes/sidebar/sidebar";
import Breadcrumbs from "../../shared/components/breadcrumbs";

class MangaPage extends React.Component {
  render() {
    const { list, chapters } = this.props;
    const { name, chapter, episode } = this.props.match.params;

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

    //get manga current episde
    let episode_url = '';
    if(episode){
      episode_url = `/${name}/${chapter}/${episode}`;
    } else {
      episode_url = `/${name}/${chapter}`; //page 1
    }
    const manga_episodes = manga_chapter.episodes.find(c => c.url == episode_url);
    if (!manga_episodes) {
      return <Redirect to="/not-found" />;
    }

    //get manga previous/next chapter/page
    const prevChapter = this.getPreviousChapter(
      list,
      chapters,
      manga.url,
      manga_chapter.url
    );
    const nextChapter = this.getNextChapter(
      list,
      manga.url,
      manga_chapter.url
    );
    const prevPage = this.getPreviousPage(manga_chapter.episodes, episode_url);
    const nextPage = this.getNextPage(manga_chapter.episodes, episode_url);
    const nextPrevButtons = this.getButtonNextPreviousValue(prevChapter, nextChapter, prevPage, nextPage);
    console.log(nextPrevButtons);

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

  getPreviousChapter(list, chapters, manga_url, chapter_url) {
    const manga = list.find(data => data.url == manga_url);
    const chapter = manga.chapters.find(c => c.link == chapter_url);
    const index = manga.chapters.indexOf(chapter);
    if (index >= 1) {
      const prevChapter = manga.chapters[index - 1];
      const prevChapterEpisodes = chapters.find(c => c.url ==  prevChapter.link);
      const prevChapterLast = prevChapterEpisodes.episodes;
      const prevChapterLastPage = prevChapterLast[prevChapterLast.length - 1];
      return prevChapterLastPage.url;
    } else {
      return null;
    }
  }
  getNextChapter(list, manga_url, chapter_url) {
    const manga = list.find(data => data.url == manga_url);
    const chapter = manga.chapters.find(c => c.link == chapter_url);
    const total_chapters = manga.chapters.length;
    const index = manga.chapters.indexOf(chapter);
    if((index + 1) < total_chapters){
      return manga.chapters[index + 1].link;
    } else {
      return null;
    }
  }
  getPreviousPage(episodes, episode_url){
    const ordered_episodes = episodes.sort(function(a, b){
      return a.order_id - b.order_id
    });
    const page = ordered_episodes.find(c => c.url == episode_url);
    const index = ordered_episodes.indexOf(page);
    if (index >= 1) {
      return ordered_episodes[index - 1].url;
    } else {
      return null;
    }
  }
  getNextPage(chapters, episode_url){
    const ordered_episodes = chapters.sort(function(a, b){
      return a.order_id - b.order_id
    });
    const page = ordered_episodes.find(c => c.url == episode_url);
    const total_chapters = ordered_episodes.length;
    const index = ordered_episodes.indexOf(page);

    if((index + 1) < total_chapters){
      return ordered_episodes[index + 1].url;
    } else {
      return null;
    }
  }
  getButtonNextPreviousValue(prevChapter, nextChapter, prevPage, nextPage){
    let prev = null;
    let next = null;
   
    if(prevPage){
      prev = prevPage;
    } else if(prevChapter){
      prev = prevChapter;
    } else {
      prev = null;
    }

    if(nextPage){
      next = nextPage;
    } else if(nextChapter){
      next = nextChapter;
    } else {
      next = null;
    }

    return {
      prev: prev,
      next: next
    }
  }
}

export default MangaPage;
