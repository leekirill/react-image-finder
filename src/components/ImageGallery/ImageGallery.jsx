import React, { Component } from "react"
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem"
import Button from "../Button/Button";
import picsAPI from '../../services/pics-api'
import Modal from '../Modal/Modal'
import s from '../ImageGallery/ImageGallery.module.scss'
import { TailSpin } from 'react-loader-spinner'

export default class ImageGallery extends Component {

    constructor() {
        super()
        
        this.state = {
            pics: [],
            loading: false,
            modal: false,
            pictureSrc: '',
            page: 1
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const request = this.props.request
        const page = this.state.page
        

        if (prevProps.request !== request || prevState.page !== page) {

            this.setState({loading: true})

            picsAPI
                .fetchPics(request, page)
                .then(r => {
                    if (r.ok) {
                        return r.json()
                    }
                    return Promise.reject(
                        new Error(`Капец, ошибка`)
                    )
                })
                .then(pics => this.setState(prevState =>
                ({ pics: [...prevState.pics, ...pics.hits], loading: false})))
                .finally(console.log(123))
            
            prevState.page === page && this.setState({ pics: [] })
        } 
    }
 
    handleClick = (e) => {
        this.setState({ 
            modal: !this.state.modal,
            pictureSrc: e.target.src,
        })
    }

    closeModalOnClickByOverlay = (e) => {
        if (e.currentTarget === e.target) {
            this.setState({
                modal: !this.state.modal,
            })
        }
    }

    loadMore = () => {
        this.setState(prevState => ({
            page: prevState.page + 1,
        }))
        setTimeout(() => {
            window.scrollTo({
                top: document.body.scrollHeight,
                left: 0,
                behavior: 'smooth'
            })
        }, 500)
    }

    render() {
        return (
            <React.Fragment>
                {this.state.loading && <TailSpin color="#3f51b5" width="50px" height="50px"/>}
                <ul className={s.ImageGallery}>
                    {this.state.pics &&
                        this.state.pics.map((pics) => <ImageGalleryItem pics={pics} key={pics.id} onClick={this.handleClick}/> )}
                </ul>
                {this.state.pics.length !== 0 ? <Button onClick={this.loadMore} /> : ''}
                {this.state.modal && <Modal pic={this.state.pictureSrc} closeModal={this.closeModalOnClickByOverlay} />}
            </React.Fragment>
        )
    }
}