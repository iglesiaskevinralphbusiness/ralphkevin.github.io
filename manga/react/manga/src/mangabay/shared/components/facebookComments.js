import React from "react";
import { FacebookProvider, Comments } from 'react-facebook';

class FacebookComments extends React.Component {
  render() {
    const { url } = this.props;

    const host = window.location.hostname;
    const fbCommentUrl = host + url;

    return (
      <div className="fb-comments-holder">
        <FacebookProvider appId="610108826218736">
          <Comments href={fbCommentUrl} width="100%" />
        </FacebookProvider>
      </div>
    );
  }
}

export default FacebookComments;
