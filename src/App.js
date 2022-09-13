import { Component } from "react";
import "./App.css";
import ImageGallery from "./ImageGallery/ImageGallery";
import Searchbar from "./Searchbar/Searchbar";

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
