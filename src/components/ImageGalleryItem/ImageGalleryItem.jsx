import s from '../ImageGalleryItem/ImageGalleryItem.module.scss'

export default function ImageGalleryItem({ pics, onClick }) {
    return (
        <li className={s.item} key={pics.id} onClick={onClick}>
            <img  className={s.image} srcSet={pics.webformatURL} src={pics.largeImageURL} alt={pics.tags} />
        </li>
    )
}