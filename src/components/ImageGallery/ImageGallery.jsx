import React, { Component } from "react"
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem"
import Button from "../Button/Button";
import picsAPI from '../../services/pics-api'
import Modal from '../Modal/Modal'
import s from '../ImageGallery/ImageGallery.module.scss'
import { nanoid } from 'nanoid'
import { TailSpin } from 'react-loader-spinner'

export default class ImageGallery extends Component {

    state = {
        pics: null,
        loading: false,
        modal: false,
        picture: ''
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.request !== this.props.request) {
            const request = this.props.request

            this.setState({loading: true})

            picsAPI.fetchPics(request).then(r => r.json()).then(pics => this.setState({ pics: pics.hits, loading: false}))
        }
    }

    handleClick = (e) => {
        this.setState({
            modal: !this.state.modal,
            picture: e.target.src
        })
        console.log(e)
    }

    render() {
        return (
            <React.Fragment>
                {this.state.loading && <TailSpin color="#1c1c1c" width="50px" height="50px"/>}
                <ul className={s.ImageGallery}>
                    {this.state.pics !== null ?
                        this.state.pics.map((pics) => <ImageGalleryItem pics={pics} key={nanoid(5)} onClick={this.handleClick}/> )
                        : ''}
                </ul>
                {this.state.pics !== null ? <Button /> : ''}
                {this.state.modal && <Modal pic={this.state.picture} closeModal={this.handleClick} />}
            </React.Fragment>
        )
    }
}