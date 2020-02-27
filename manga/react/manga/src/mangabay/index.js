import React from "react";

//modules
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

//packages
import _ from "lodash";

//includes
import Header from "./includes/header";
import Footer from "./includes/footer";

//pages
import Home from "./pages/home/home";
import Manga from "./pages/manga/manga";
import MangaList from './pages/manga-list/mangaList'

//styles
import "./assets/css/reset.css";
import "./assets/css/common.css";
import "./assets/css/scheme.css";
import "./assets/css/pages.css";

let m_list = require("../services/list.json");
let m_chapters = require("../services/chapters.json");

class Index extends React.Component {
  state = {
    list: this.cleanListUrl(m_list),
    chapters: this.cleanCaptersUrl(m_chapters)
  };

  render() {
    const { list, chapters } = this.state;

    console.log(list, "m_list");
    console.log(chapters, "m_chapters");

    return (
      <React.Fragment>
        <Header></Header>

        <BrowserRouter>
          <Switch>
            <Route
              path="/"
              exact
              render={props => <Home list={list} chapters={chapters} />}
            ></Route>
            <Route
              path="/manga-list"
              render={props => (
                <MangaList list={list} chapters={chapters} />
              )}
            ></Route>
            <Route
              path="/:name"
              render={props => (
                <Manga list={list} chapters={chapters} {...props} />
              )}
            ></Route>
          </Switch>
        </BrowserRouter>

        <Footer></Footer>
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

  replaceUrl(url) {
    return url.replace("http://www.mangareader.net", "");
  }
}

export default Index;
