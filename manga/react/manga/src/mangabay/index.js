import React from "react";

//styles
import "./assets/css/reset.css";
import "./assets/css/common.css";
import "./assets/css/scheme.css";
import "./assets/css/pages.css";
import "./assets/css/markets.css";
import "./assets/css/responsive.css";

//modules
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

//packages
import _ from "lodash";
import axios from 'axios';

//includes
import Header from "./includes/header";
import Footer from "./includes/footer";

//pages
import Home from "./pages/home/home";
import Manga from "./pages/manga/manga";
import MangaList from "./pages/manga-list/mangaList";
import MangaPage from "./pages/manga-page/mangaPage";
import LatestManga from "./pages/latest-manga/latestManga";
import TopManga from "./pages/top-manga/topManga";
import Category from "./pages/category/category";
import PageNotFound from "./shared/pages/pageNotFound";

let m_list = require("../services/list.json");
let m_chapters = require("../services/chapters.json");
let m_top = require("../services/top.json");

class Index extends React.Component {
  state = {
    list: this.cleanListUrl(m_list),
    chapters: this.cleanCaptersUrl(m_chapters),
    top: this.clearTopUrl(m_top, m_list),
    bookmarks: localStorage.getItem('bookmarks') ? JSON.parse(localStorage.getItem('bookmarks')) : []
  };

  componentDidMount() {
    const enableApi = false;

    if(enableApi){
      const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

      const usernamePasswordBuffer = Buffer.from('mangabay' + ':' + 'mangabay');
      const base64data = usernamePasswordBuffer.toString('base64');

      axios.get(PROXY_URL + 'http://mangariot.com/php/get-list.php', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${base64data}`,
        }
      })
      .then(res => {
        const list = [...res.data];
        console.log(list,'list from php')
        //this.setState({ list });
      });

      axios.get(PROXY_URL + 'http://mangariot.com/php/get-chapters.php', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${base64data}`,
        }
      })
      .then(res => {
        const chapters = res.data
        console.log(chapters,'chapters from php')
        //this.setState({ chapters });
      });

    }


  }

  render() {
    const { list, chapters, top } = this.state;

    //console.log(list, "m_list");
    //console.log(chapters, "m_chapters");
    //console.log(top, "m_top");

    return (
      <React.Fragment>
        <BrowserRouter>
          <Header list={list} bookmarks={this.state.bookmarks}></Header>
          <Switch>
            <Route
              path="/"
              exact
              render={props => <Home list={list} chapters={chapters} top={top} />}
            ></Route>
            <Route
              path="/manga-list"
              render={props => <MangaList list={list} chapters={chapters} top={top} />}
            ></Route>
            <Route
              path="/latest-release"
              render={props => <LatestManga list={list} chapters={chapters} top={top} />}
            ></Route>
            <Route
              path="/top-manga"
              render={props => <TopManga list={list} chapters={chapters} top={top} />}
            ></Route>
            <Route
              path="/popular/:category"
              render={props => <Category list={list} chapters={chapters} top={top} {...props} />}
            ></Route>
            <Route
              path="/:name/:chapter/:episode"
              render={props => (
                <MangaPage list={list} chapters={chapters} top={top} {...props} />
              )}
            ></Route>
            <Route
              path="/:name/:chapter"
              render={props => (
                <MangaPage list={list} chapters={chapters} top={top} {...props} />
              )}
            ></Route>
            <Route
              path="/:name"
              render={props => (
                <Manga list={list} chapters={chapters} top={top} bookmarks={this.state.bookmarks} addBookmark={this.addBookmark} {...props} />
              )}
            ></Route>

            <Route path="/not-found" component={PageNotFound}></Route>
            <Redirect to="/not-found"></Redirect>
          </Switch>
          <Footer></Footer>
        </BrowserRouter>
      </React.Fragment>
    );
  }

  cleanListUrl(list) {
    const holder = list.map(l => {
      l.url = this.replaceUrl(l.url);
      l.chapters = l.chapters.map(c => {
        c.link = this.replaceUrl(c.link);
        return c;
      });
      l.genre = l.genre.map(g => {
        g.link = this.replaceUrl(g.link);
        return g;
      });
      return l;
    });
    return holder;
  }

  cleanCaptersUrl(chapters) {
    const holder = chapters.map(c => {
      c.url = this.replaceUrl(c.url);
      c.manga_url = this.replaceUrl(c.manga_url);
      c.episodes = c.episodes.map(e => {
        e.url = this.replaceUrl(e.url);
        return e;
      });
      return c;
    });
    return holder;
  }

  clearTopUrl(top, list){
    const holder = top.map((t, index) => {
      t.order_id = index;
      t.url = this.replaceUrl(t.url);
      t.details = list.find(l => l.url == t.url);
      return t;
    })
    return holder;
  }

  replaceUrl(url) {
    return url.replace("http://www.mangareader.net", "");
  }

  addBookmark = (url) => {
    const find = this.state.bookmarks.find(b => b == url);
    if(find){
      const bookmarks = this.state.bookmarks.filter(b => b != url);
      localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
      this.setState({bookmarks})
    }
    else {
      const bookmarks = [...this.state.bookmarks, url];
      localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
      this.setState({bookmarks})
    }
  }
}

export default Index;
