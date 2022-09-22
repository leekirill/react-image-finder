import React, { Component } from "react"
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem"
import Button from '../Button/Button'
import s from '../ImageGallery/ImageGallery.module.scss'



export default class ImageGallery extends Component {

    render() {  
        
        if (this.props.status === 'idle') {
            return (
                <div className={s.welcome}>
                    <h1 className={s.heading}>Stunning free images</h1> 
                    <p className="">Over 2.6 million+ high quality stock images, videos and music shared by our talented community.</p>
                </div>
            )
        }
        if (this.props.status === 'rejected') {
            return <h1 className={s.heading}>Ошибка</h1>
        }
        if (this.props.pics.length === 0) {
            return <h1 className={s.heading}>{this.props.request} не найдено :(</h1>
        }
        if (this.props.status === 'resolved')
            return (  
                <React.Fragment>
                <ul className={s.ImageGallery}>
                    {this.props.pics.map((pics) => <ImageGalleryItem pics={pics} key={pics.id} onClick={this.props.handleClick} />)}
                </ul>
                <Button onClick={this.props.loadmore}/>
            </React.Fragment>
            )    

    }    
}