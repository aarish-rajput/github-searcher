import React, { Component } from 'react'
import PropTypes from 'prop-types'


export class Search extends Component {
    state = {
        text: '',
    }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired
    }

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmitHandler = (e) => {
        e.preventDefault()
        if (this.state.text === '') {
            this.props.setAlert('Please Enter Something', 'light')
        }
        else {
            this.props.searchUser(this.state.text)
            this.setState({ text: '' })

        }

    }



    render() {
        const { showClear, clearUsers } = this.props;
        return (
            <div>
                <form className="form" onSubmit={this.onSubmitHandler}>
                    <input type="text" name="text" placeholder="Search User" value={this.state.text} onChange={this.onChangeHandler} />
                    <input type="submit" value="Search" className="btn btn-dark btn-block" />
                </form>
                {showClear === true && <button className="btn btn-light btn-block" onClick={clearUsers}> Clear</button>}


            </div>
        )
    }
}

export default Search
