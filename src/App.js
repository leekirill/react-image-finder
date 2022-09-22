import { Component } from "react";
import "./App.scss";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Searchbar from "./components/Searchbar/Searchbar";
import Modal from "./components/Modal/Modal";
import picsAPI from "./services/picsApi";
import { TailSpin } from "react-loader-spinner";

class App extends Component {
  constructor() {
    super();

    this.state = {
      request: "",
      pics: [],
      modal: false,
      loading: false,
      pictureSrc: "",
      page: 1,
      status: "idle",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const request = this.state.request;
    const page = this.state.page;

    if (this.state.page > 2 && prevState.page !== this.state.page) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
        lerp: 2,
      });
    }

    if (prevState.request !== request) {
      this.getImages();

      // если страница не меняется, то обнуляем массив с картинками
      prevState.page === page && this.setState({ pics: [] });
    }
  }

  getImages() {
    const { request, page } = this.state;
    this.setState({ loading: true });
    picsAPI
      .fetchPics(request, page)
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        return Promise.reject(new Error(`Капец, ошибка`));
      })
      .then((pics) => {
        this.setState((prevState) => ({
          pics: [...prevState.pics, ...pics.hits],
          status: "resolved",
          page: prevState.page + 1,
        }));
      })
      .catch((error) => this.setState({ error, status: "rejected" }))
      .finally(() => this.setState({ loading: false }));
  }

  handleClick = (e) => {
    this.setState({
      modal: !this.state.modal,
      pictureSrc: e.target.src,
    });
  };

  closeModalOnClickByOverlay = (e) => {
    if (e.currentTarget === e.target) {
      this.setState({
        modal: !this.state.modal,
      });
    }
  };

  loadMore = () => {
    this.getImages();
  };

  getRequest = (value) => {
    this.setState({
      request: value,
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.loading && (
          <TailSpin color="#3f51b5" width="50px" height="50px" />
        )}
        <Searchbar onSubmit={this.getRequest} />
        <ImageGallery
          request={this.state.request}
          pics={this.state.pics}
          status={this.state.status}
          loadmore={this.loadMore}
          handleClick={this.handleClick}
        />
        {this.state.modal && (
          <Modal
            pic={this.state.pictureSrc}
            closeModal={this.closeModalOnClickByOverlay}
          />
        )}
      </div>
    );
  }
}

export default App;
