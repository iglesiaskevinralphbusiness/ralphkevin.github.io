import React from "react";

//packages
import _ from "lodash";
import { Link } from "react-router-dom";

//components
import Sidebar from "./../../includes/sidebar/sidebar";
import FacebookComments from "../../shared/components/facebookComments";
import Breadcrumbs from "../../shared/components/breadcrumbs";

class MangaList extends React.Component {
  componentDidMount() {
    document.title = "MangaRiot | Manga List";
  }

  render() {
    const { list, chapters, top } = this.props;
    const alphabetical = this.getAlphabeticalOrder(list);
    const fbCommentUrl = "/manga-list";
    const breadcrumbs = [
      {
        name: "Manga Online",
        link: "/"
      },
      {
        name: "Manga List",
        link: null
      }
    ];

    return (
      <main>
        <div className="wrap">
          <section className="body-column">
            <div className="content-block">
              <Breadcrumbs data={breadcrumbs}></Breadcrumbs>
              <section className="alphabetical">
                {alphabetical.map(a => {
                  let mangaList = [];
                  if (a.manga.length) {
                    mangaList = [...a.manga];
                  } else {
                    mangaList = [a.manga];
                  }

                  return (
                    <section className="alpha-block" key={a.alphabet}>
                      <div className="alpha-container">
                        <h2>{a.alphabet}</h2>
                        <ul>
                          {mangaList
                            .filter(m => {
                              const find = chapters.find(
                                c => c.manga_url == m.url
                              );
                              if (find) {
                                return true;
                              }
                              return false;
                            })
                            .map(m => (
                              <li key={m.url}>
                                <Link to={m.url}>{m.name}</Link>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </section>
                  );
                })}
              </section>
              <FacebookComments url={fbCommentUrl}></FacebookComments>
            </div>
            <Sidebar list={list} chapters={chapters} top={top}></Sidebar>
          </section>
        </div>
      </main>
    );
  }

  getAlphabeticalOrder(list) {
    let organized = [];
    let reorganized = [];

    list.map(l => {
      const name = l.name;
      let letter = name.trim().charAt(0);
      letter = letter.toUpperCase();
      organized[letter] = organized[letter]
        ? _.concat(organized[letter], l)
        : l;
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

    const sortItem = reorganized.sort(function(a, b) {
      const textA = a.alphabet;
      const textB = b.alphabet;
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    return sortItem;
  }
}

export default MangaList;
