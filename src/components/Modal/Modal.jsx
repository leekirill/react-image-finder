import s from '../Modal/Modal.module.scss'

export default function Modal({pic, closeModal}) {
    return <div className={s.overlay} onClick={closeModal}>
                <div className={s.modal}>
                    <img src={pic} alt="pics" />
                </div>
            </div>
}