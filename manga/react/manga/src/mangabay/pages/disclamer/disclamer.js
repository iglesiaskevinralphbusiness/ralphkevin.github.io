import React from "react";

//packages
import _ from "lodash";
import { Link } from "react-router-dom";

//components
import Sidebar from "./../../includes/sidebar/sidebar";
import FacebookComments from "../../shared/components/facebookComments";
import Breadcrumbs from "../../shared/components/breadcrumbs";

class Disclamer extends React.Component {
  componentDidMount() {
    document.title = "MangaRiot | Manga List";
  }

  render() {
    const { list, chapters, top } = this.props;
    const breadcrumbs = [
      {
        name: "Manga Online",
        link: "/"
      },
      {
        name: "Disclamer",
        link: null
      }
    ];

    return (
      <main>
        <div className="wrap">
          <section className="body-column">
            <div className="body-content content-block">
              <Breadcrumbs data={breadcrumbs}></Breadcrumbs>
              <h2>
                <span>Legal Disclamer</span>
              </h2>
              <div class="latest">
                <p>
                  All manga, characters and logos belong to their respective
                  copyrights owners, MangaRiot does NOT own or host any content.
                  It simply aggreates links in a convenient, user-friendly
                  interface.
                  <br />
                  All MangaRiot does is link or embed content that was uploaded
                  to popular Online Image Manga hosting sites like Google Photos
                  / mangakakalot / mangareader . By clicking on any Links to
                  images while surfing on MangaRiot you read content hosted on
                  third parties and MangaRiot can't take the responsibility for
                  any content hosted on other sites.
                </p>
                <br />
                <p>
                  We will be unable to take any action if you do not provide us
                  with the required information, so please fill out all fields
                  accurately and completely. You may make a written notice via
                  e-mail, facsimile or postal mail to our DMCA Agent as listed
                  below. Your written notice must include the following:
                  <br />- Specific identification of the copyrighted work which
                  you are alleging to have been infringed. If you are alleging
                  infringement of multiple copyrighted works with a single
                  notification you must submit a representative list which
                  specifically identifies each of the works that you allege are
                  being infringed.
                  <br />- Specific identification of the location and
                  description of the material that is claimed to be infringing
                  or to be the subject of infringing activity with enough
                  detailed information to permit us to locate the material. You
                  should include the specific URL or URLs of the web pages where
                  the allegedly infringing material is located.
                  <br />- Information reasonably sufficient to allow us to
                  contact the complaining party which may include a name,
                  address, telephone number and electronic mail address and
                  signature at which the complaining party may be contacted.
                  <br />- A statement that the complaining party has a good
                  faith belief that use of the material in the manner complained
                  of is not authorized by the copyright owner, its agent or the
                  law.
                  <br />- A statement that the information in the notification
                  is accurate, and under penalty of perjury that the complaining
                  party is authorized to act on behalf of the owner of an
                  exclusive right that is allegedly infringed.
                </p>
                <br />
                <br />
                <p>
                  Please email any question or concern to admin@mangariot.com.
                  We will be more than happy to comply with any DMCA requests.
                  MangaRiot is developed independently with the content
                  providers.
                </p>

                <br />
                <p>
                  We reserve the right to change the source of manga without
                  prior notice
                </p>
              </div>
            </div>
            <Sidebar list={list} chapters={chapters} top={top}></Sidebar>
          </section>
        </div>
      </main>
    );
  }
}

export default Disclamer;
