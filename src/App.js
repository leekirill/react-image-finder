import { useEffect, useState } from "react";
import "./App.scss";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Searchbar from "./components/Searchbar/Searchbar";
import Modal from "./components/Modal/Modal";
import picsAPI from "./services/picsApi";
import { TailSpin } from "react-loader-spinner";

export default function App() {
  const [query, setQuery] = useState("");
  const [pics, setPics] = useState([]);
  const [isModal, setModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [pictureSrc, setPictureSrc] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (query === "") return;

    if (pageNumber > 2) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
    getImages();

    pageNumber === pageNumber && setPics([]);
  }, [query]);

  function getImages() {
    setLoading(true);
    picsAPI
      .fetchPics(query, pageNumber)
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        return Promise.reject(new Error(`Ошибка`));
      })
      .then((pics) => {
        setPics((state) => {
          return [...state, ...pics.hits];
        });
        setStatus("resolved");
        setPageNumber((state) => state + 1);
      })
      .catch((error) => setStatus("rejected"))
      .finally(() => setLoading(false));
  }

  const handleClick = (e) => {
    setModal(!isModal);
    setPictureSrc(e.target.src);
  };

  const closeModalOnClickByOverlay = (e) => {
    if (e.currentTarget === e.target) {
      setModal(!isModal);
    }
  };

  const loadMore = () => {
    getImages();
  };

  const getRequest = (value) => {
    setQuery(value);
  };

  return (
    <div className="App">
      {isLoading && <TailSpin color="#ff5959" width="50px" height="50px" />}
      <Searchbar onSubmit={getRequest} />
      <ImageGallery
        request={query}
        pics={pics}
        status={status}
        loadmore={loadMore}
        handleClick={handleClick}
      />
      {isModal && (
        <Modal pic={pictureSrc} closeModal={closeModalOnClickByOverlay} />
      )}
    </div>
  );
}

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       request: "",
//       pics: [],
//       modal: false,
//       loading: false,
//       pictureSrc: "",
//       page: 1,
//       status: "idle",
//     };
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const request = this.state.request;
//     const page = this.state.page;

//     if (this.state.page > 2 && prevState.page !== this.state.page) {
//       window.scrollTo({
//         top: document.documentElement.scrollHeight,
//         behavior: "smooth",
//       });
//     }

//     if (prevState.request !== request) {
//       this.getImages();
//       // если страница не меняется, то обнуляем массив с картинками
//       prevState.page === page && this.setState({ pics: [] });
//     }
//   }

//   getImages() {
//     const { request, page } = this.state;

//     this.setState({ loading: true });
//     picsAPI
//       .fetchPics(request, page)
//       .then((r) => {
//         if (r.ok) {
//           return r.json();
//         }
//         return Promise.reject(new Error(`Капец, ошибка`));
//       })
//       .then((pics) => {
//         this.setState((prevState) => ({
//           pics: [...prevState.pics, ...pics.hits],
//           status: "resolved",
//           page: prevState.page + 1,
//         }));
//       })
//       .catch((error) => this.setState({ error, status: "rejected" }))
//       .finally(() => this.setState({ loading: false }));
//   }

//   handleClick = (e) => {
//     this.setState({
//       modal: !this.state.modal,
//       pictureSrc: e.target.src,
//     });
//   };

//   closeModalOnClickByOverlay = (e) => {
//     if (e.currentTarget === e.target) {
//       this.setState({
//         modal: !this.state.modal,
//       });
//     }
//   };

//   loadMore = () => {
//     this.getImages();
//   };

//   getRequest = (value) => {
//     this.setState({
//       request: value,
//     });
//   };

//   render() {
//     return (
//       <div className="App">
//         {this.state.loading && (
//           <TailSpin color="#ff5959" width="50px" height="50px" />
//         )}
//         <Searchbar onSubmit={this.getRequest} />
//         <ImageGallery
//           request={this.state.request}
//           pics={this.state.pics}
//           status={this.state.status}
//           loadmore={this.loadMore}
//           handleClick={this.handleClick}
//         />
//         {this.state.modal && (
//           <Modal
//             pic={this.state.pictureSrc}
//             closeModal={this.closeModalOnClickByOverlay}
//           />
//         )}
//       </div>
//     );
//   }
// }

// export default App;
