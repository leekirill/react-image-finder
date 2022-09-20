import { Component } from "react";
import s from "../Searchbar/Searchbar.module.scss"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


export default class Searchbar extends Component {

    state = {
        request: ""
    }

    handleChange = e => {
        this.setState({
            request: e.currentTarget.value
        })
    }
    handleSubmit = e => {
        e.preventDefault()
        this.props.onSubmit(this.state.request)
        
    }

    render() {
        return (
            <header className={s.Searchbar}>
                <form className={s.SearchForm} onSubmit={this.handleSubmit}>
                    <button type="submit" className={s.SearchFormButton}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>

                    <input
                    className={s.SearchFormInput}
                    type="text"
                    value={this.state.request}
                    onChange={this.handleChange}
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                        
                    />
                </form>
            </header>
        )
    }
}