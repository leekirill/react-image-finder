import { Component } from "react"
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem"

export default class ImageGallery extends Component {

    state = {
        request: this.props.request,
        fetch: []
    }

    componentDidMount() {
        const request = this.props.request
        const BASE_URL = "https://pixabay.com/api/"
        const API_KEY = "19115231-b63e497fa397eaff465691d91"

        fetch(`${BASE_URL}?q=${request}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`).then(r => r.json()).then(pics => this.setState({fetch: pics.hits}))
    }

    componentDidUpdate(prevProp, prevState) {
        if (this.state.request !== prevState) {
            
        }
    }

    render() {
        return (
            <ul className="gallery">
                {this.state.fetch.map((e,id) => {
                    return <ImageGalleryItem keyId={id} />
                })}
            </ul>
        )
    }


}