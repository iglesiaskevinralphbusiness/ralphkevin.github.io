import React from "react";

//modules
import { Redirect } from "react-router-dom";

//components
import Breadcrumbs from "../../shared/components/breadcrumbs";
import Options from './components/options';
import FacebookComments from "../../shared/components/facebookComments";
import FacebookLike from "../../shared/components/facebookLike";

class MangaPage extends React.Component {

  state = {
    next: '',
    prev: ''
  }

  constructor(props){
    super(props);
    this.handleBindKeyDown = this.handleBindKeyDown.bind(this);
  }
  componentDidMount(){
    document.addEventListener("keydown", this.handleBindKeyDown, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleBindKeyDown, false);
  }
  handleBindKeyDown(event){
    if(event.keyCode === 39 && this.keyNext){
      this.props.history.push(this.keyNext);
    }
    else if(event.keyCode === 37 && this.keyPrev){
      this.props.history.push(this.keyPrev);
    }
  }

  componentWillReceiveProps(){
    window.scrollTo(0, 0);
  }

  render() {
    const { list, chapters, top } = this.props;
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
    this.keyPrev = nextPrevButtons.prev;
    this.keyNext = nextPrevButtons.next;

    const optionSettings = {
      chapters: {
        list: manga.chapters,
        active: manga_url
      },
      episodes: {
        list:manga_chapter.episodes,
        active: episode_url
      },
      buttons: nextPrevButtons
    }

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

    const fbCommentUrl = episode_url;
    document.title = 'MangaRiot | ' + name + ' | ' + chapter;

    return (
      <main>
        <div className="wrap">
          <Breadcrumbs data={breadcrumbs} />
          <div className="manga-page">
            <Options optionSettings={optionSettings}  history= {this.props.history}/>
            <div className="image-containers small-image">
              <ul>
                <li>
                  <img src={manga_episodes.image} alt={'Read manga ' + manga_episodes.name}/>
                </li>
              </ul>
            </div>
            <Options optionSettings={optionSettings}  history= {this.props.history}/>
          </div>
          <FacebookLike url={fbCommentUrl}></FacebookLike>
          <FacebookComments url={fbCommentUrl}></FacebookComments>
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
