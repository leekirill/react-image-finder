import s from '../Button/Button.module.scss'

export default function Button({ onClick }) {

    return <button className={s.Button} onClick={onClick}>Load more</button>
}