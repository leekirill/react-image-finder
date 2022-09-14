import { Component } from "react";
import "./App.scss";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Searchbar from "./components/Searchbar/Searchbar";
import Modal from "./components/Modal/Modal";

class App extends Component {
  constructor() {
    super();

    this.getRequest = this.getRequest.bind(this);
    // тоже самое шо и публичные свойства класса
    // getRequest = (value) => {}

    this.state = {
      request: "",
    };
  }

  getRequest(value) {
    this.setState({
      request: value,
    });
  }

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.getRequest} />
        <ImageGallery request={this.state.request} />
      </div>
    );
  }
}

export default App;
