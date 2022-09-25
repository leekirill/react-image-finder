import React from "react"
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem"
import Button from '../Button/Button'
import s from '../ImageGallery/ImageGallery.module.scss'


export default function ImageGallery({query, status, pics, loadmore, handleClick}) {
        
    if (status === 'idle') {
        return (
            <div className={s.welcome}>
                <h1 className={s.heading}>Stunning free images</h1> 
                <p className="">Over 2.6 million+ high quality stock images, videos and music shared by our talented community.</p>
            </div>
        )
    }
    if (status === 'rejected') {
        return <h2 className={s.heading}>Ошибка</h2>
    }
    if (pics.length === 0) {
        return <h2 className={s.heading}>{query} не найдено :(</h2>
    }
    if (status === 'resolved')
        return (  
            <React.Fragment>
            <ul className={s.ImageGallery}>
                {pics.map((pics) => <ImageGalleryItem pics={pics} key={pics.id} onClick={handleClick} />)}
            </ul>
            <Button onClick={loadmore}/>
        </React.Fragment>
        )
}

// export default class ImageGallery extends Component {

//     render() {  
        
//         if (this.props.status === 'idle') {
//             return (
//                 <div className={s.welcome}>
//                     <h1 className={s.heading}>Stunning free images</h1> 
//                     <p className="">Over 2.6 million+ high quality stock images, videos and music shared by our talented community.</p>
//                 </div>
//             )
//         }
//         if (this.props.status === 'rejected') {
//             return <h2 className={s.heading}>Ошибка</h2>
//         }
//         if (this.props.pics.length === 0) {
//             return <h2 className={s.heading}>{this.props.request} не найдено :(</h2>
//         }
//         if (this.props.status === 'resolved')
//             return (  
//                 <React.Fragment>
//                 <ul className={s.ImageGallery}>
//                     {this.props.pics.map((pics) => <ImageGalleryItem pics={pics} key={pics.id} onClick={this.props.handleClick} />)}
//                 </ul>
//                 <Button onClick={this.props.loadmore}/>
//             </React.Fragment>
//             )    

//     }    
// }