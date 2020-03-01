import React from "react";
import { FacebookProvider, Like } from 'react-facebook';

class FacebookLike extends React.Component {
  render() {
    const { url } = this.props;

    const host = window.location.hostname;
    const fbCommentUrl = host + url;

    return (
      <div className="fb-comments-holder">
        <FacebookProvider appId="610108826218736">
          <Like href={fbCommentUrl} colorScheme="dark" showFaces share />
        </FacebookProvider>
      </div>
    );
  }
}

export default FacebookLike;
