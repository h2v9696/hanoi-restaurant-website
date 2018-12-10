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
            filterValue: 'name',
            results: [],
        }
    }

    onInputChange = (value) => {
        this.setState({inputValue: value}, () => value.length > 0 && this.fetchSearch().then(res => this.onFetchSuggess(res)))
    }
    fetchSearch = () => new Promise((resolve, reject) => {
        const {inputValue, filterValue} = this.state
            let fetchURL = ''
        switch (filterValue) {
            case 'name':
                fetchURL = API + '/api/search/?name=' + inputValue
                break
            case 'address':
                fetchURL = API + '/api/search/?address=' + inputValue
                break
            default:
                break
        }
        fetch(fetchURL, {
            method: 'GET'
        }).then(res => res.json()).then(json => resolve(json)).catch(e => reject(e))
    })
    onFetchSuggess = (data) => {
        this.setState({results: data.data})
    }
    onFilterChange = (e) => {
        const value = e.target.value
        this.setState({filterValue: value}, () => this.fetchSearch().then(res => this.onFetchSuggess(res)))
    }

    render() {
        const {results, inputValue} = this.state
        return (
            <div className={styles.wrap}>
                <div className={styles.searchBar}>
                    <div className={styles.input}>
                        <input placeholder='name, description or address' value={this.state.inputValue}
                               onChange={e => this.onInputChange(e.target.value)}/>
                    </div>
                    <select value={this.state.filterValue} onChange={this.onFilterChange}>
                        <option value='name'>Name</option>
                        <option value='address'>Address</option>
                    </select>
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
    data.sort((a, b) => b.rating_avg - a.rating_avg)
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
