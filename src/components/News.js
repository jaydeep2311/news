import React, { Component } from "react";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  articles = [
    {
      source: {
        id: "news24",
        name: "News24",
      },
      author: "Lloyd Burnard",
      title:
        "Kapp-inspired Proteas pass biggest World Cup test, edge England in thrilling chase",
      description:
        "South Africa have passed their biggest test of the Women's Cricket World Cup in New Zealand so far, beating defending champions England in a thrilling final over clash in Mount Maunganui on Monday morning.",
      url: "https://www.news24.com/sport/Cricket/WomensCricketWorldCup/kapp-inspired-proteas-pass-biggest-world-cup-test-edge-england-in-thrilling-chase-20220314",
      urlToImage:
        "https://cdn.24.co.za/files/Cms/General/d/1265/fa1eff3ff2314f9b86c24896768c7088.jpg",
      publishedAt: "2022-03-14T10:22:42+00:00",
      content:
        "South Africa passed their biggest test of the Women's Cricket World Cup in New Zealand so far, beating defending champions England in a thrilling final over clash in Mount Maunganui on Monday morning… [+3757 chars]",
    },
    {
      source: {
        id: "espn-cric-info",
        name: "ESPN Cric Info",
      },
      author: null,
      title:
        "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
      description:
        "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
      url: "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
      urlToImage:
        "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
      publishedAt: "2020-04-27T11:41:47Z",
      content:
        "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
    },
    {
      source: {
        id: "espn-cric-info",
        name: "ESPN Cric Info",
      },
      author: null,
      title:
        "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
      description:
        "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
      url: "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
      urlToImage:
        "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
      publishedAt: "2020-03-30T15:26:05Z",
      content:
        "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]",
    },
  ];
  constructor(props) {
    super(props);
    console.log("construct");
    this.state = {
      articles: this.articles,
      load: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.props.category}-: DailyNews`;
  }
  async componentDidMount() {
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apikey=8d548215ad284b2781d92908db06d627&page=1&pagesize=${this.props.pagesize}`;
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseddata = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parseddata.articles,
      totalResults: parseddata.totalResults,
    });
    this.props.setProgress(100);
  }
  // handleOnNext = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=in&category=${
  //     this.props.category
  //   }&apikey=8d548215ad284b2781d92908db06d627&page=${
  //     this.state.page + 1
  //   }&pagesize=${this.props.pagesize}`;
  //   let data = await fetch(url);
  //   let parseddata = await data.json();
  //   this.setState({
  //     page: this.state.page + 1,
  //     articles: parseddata.articles,
  //   });
  // };
  // handleOnprev = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=in&category=${
  //     this.props.category
  //   }&apikey=8d548215ad284b2781d92908db06d627&page=${
  //     this.state.page - 1
  //   }&pagesize=${this.props.pagesize}`;
  //   let data = await fetch(url);
  //   let parseddata = await data.json();
  //   this.setState({
  //     articles: parseddata.articles,
  //   });
  //   this.setState({
  //     page: this.setState.page - 1,
  //   });
  // };
  fetchMoreData = async () => {
    this.props.setProgress(0);
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apikey=8d548215ad284b2781d92908db06d627&page=1&pagesize=${this.props.pagesize}`;
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseddata = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: this.state.articles.concat(parseddata.articles),
      totalResults: parseddata.totalResults,
    });
    this.props.setProgress(100);
  };
  render() {
    console.log("render");
    return (
      <div>
        <div className="container my-3 text-center">
          <h1 className="text-center my-5">
            Top headlines on {this.props.category}
          </h1>
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<h4>Loading...</h4>}
            style={{ overflowX: "hidden" }}
          >
            <div className="row" style={{ overflowX: "hidden" }}>
              {this.state.articles.map((element, idx) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 45) : ""}
                      author={element.author}
                      publishedat={element.publishedAt}
                      source={element.source.name}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      url={element.urlToImage}
                      newsurl={element.url}
                    />
                  </div>
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
        {/* <div className="container d-flex d-flex justify-content-between">
          <button
            type="button"
            class="btn btn-dark"
            disabled={this.state.page <= 1}
            onClick={this.handleOnprev}
          >
            &larr; prev
          </button>
          <button
            type="button"
            class="btn btn-dark"
            onClick={this.handleOnNext}
          >
            next &rarr;
          </button>
        </div> */}
      </div>
    );
  }
}

export default News;
