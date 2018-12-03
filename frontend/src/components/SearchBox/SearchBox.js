import React from 'react'
import {Link,} from 'react-router-dom'
import * as styles from './SearchBox.module.scss'
import API from '../../constants/api'
import StarRatings from "react-star-ratings";

export default class SearchBox extends React.PureComponent {
    constructor() {
        super()
        this.state = {
            inputValue: '',
            results: [],
        }
    }

    onInputChange = (value) => {
        this.setState({inputValue: value}, () => value.length > 0 && this.fetchSearch(value).then(res => this.onFetchSuggess(res)))
    }
    fetchSearch = (value) => new Promise((resolve, reject) => {
        fetch(API + '/api/search/?q=' + value, {
            method: 'GET'
        }).then(res => res.json()).then(json => resolve(json)).catch(e => reject(e))
    })
    onFetchSuggess = (data) => {
        this.setState({results: data.data})
    }

    render() {
        const {results, inputValue} = this.state
        return (
            <div className={styles.wrap}>
                <div className={styles.input}>
                    <input placeholder='name, description or address' value={this.state.inputValue}
                           onChange={e => this.onInputChange(e.target.value)}/>
                </div>
                <div className={styles.resultsBox}>
                    {
                        inputValue.length > 0 ? (results.length > 0 ? hasResults(results, this.props.closeModal) :
                            <NotFound/>)
                            : null
                    }
                </div>
            </div>
        )
    }
}

const hasResults = (data, closeModal) => {
    data.sort((a, b) => b.rating_avg - a.rating_avg )
    return <React.Fragment>
        {data.map((e, index) => <Link key={index} to={'/restaurant/' + e.id} onClick={closeModal}>
            <p>{e.name}</p>
            <StarRatings
                rating={e.rating_avg}
                starRatedColor="gold"
                starDimension="15px"
                starSpacing="2px"
                name={e.id}
            />
            <br/>
            <span>{e.address}</span>
        </Link>)}
    </React.Fragment>
}
const NotFound = () => (
    <div>
        No result Found.
    </div>
)
