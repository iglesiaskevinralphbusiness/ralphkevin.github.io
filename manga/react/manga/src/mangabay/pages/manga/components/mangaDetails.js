import React from "react";

//modules
import { Link } from "react-router-dom";

//components
import FacebookLike from "../../../shared/components/facebookLike";

class MangaDetails extends React.Component {
  render() {
    const { manga, addBookmark } = this.props;
    const fbCommentUrl = manga.url;
    const bookmarkStatus = this.getBookmarkActive(manga.url);

    return (
      <div className="manga-details">
        <div className="details-image">
          <p className="img-container">
            <img src={manga.image} />
          </p>
          <p className={bookmarkStatus ? 'link-bookmark btn-add' : 'link-bookmark btn-remove'}>
            <span onClick={() => addBookmark(manga.url)}>{ bookmarkStatus ? 'ADD BOOKMARK': 'REMOVE BOOKMARK'}</span>
          </p>
          <p className="link-chapter">
            <a href="#">CHAPTER LIST</a>
          </p>
        </div>
        <div className="details-block">
          <h2>{manga.name}</h2>
          <dl>
            <dt>Alternate Name:</dt>
            <dd>{manga.alternative_name}</dd>
          </dl>
          <dl>
            <dt>Year of Release:</dt>
            <dd>{manga.year_release}</dd>
          </dl>
          <dl>
            <dt>Status:</dt>
            <dd>{manga.status}</dd>
          </dl>
          <dl>
            <dt>Author:</dt>
            <dd>{manga.author}</dd>
          </dl>
          <dl>
            <dt>Artist:</dt>
            <dd>{manga.artist}</dd>
          </dl>
          <dl>
            <dt>Genre:</dt>
            <dd>
              <ul className="genre">
                {manga.genre.map(g => (
                  <li key={g.link}>
                    <Link to={g.link}>{g.name}</Link>
                  </li>
                ))}
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>Reading Direction:</dt>
            <dd>Right to Left</dd>
          </dl>
          <FacebookLike url={fbCommentUrl}></FacebookLike>
        </div>
      </div>
    );
  }

  getBookmarkActive(url){
    const { bookmarks } = this.props;
    const find = bookmarks.find(b => b == url);
    if(find){
      return false;
    }
    return true;
  }
}

export default MangaDetails;
