import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, author, publishedat, description, url, newsurl, source } =
      this.props;
    return (
      <>
        <div className="card" style={{ style: "width:18rem" }}>
          <img src={url} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <span
              class="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
              style={{ left: "90%", zIndex: "1" }}
            >
              {source}
            </span>
            <p className="card-text">{description}</p>
            <a href={newsurl} className="btn btn-dark my-3">
              Go somewhere
            </a>
            <div class="card-footer">
              <small class="text-muted">
                By: {author ? author : ""} on {publishedat.slice(0, 7)}
              </small>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default NewsItem;
