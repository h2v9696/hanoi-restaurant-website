import React, {Component} from "react"
import {
    Link,
} from "react-router-dom";

import "components/restaurant/restaurant.css"
import Slider from "react-slick";
import StarRatings from 'react-star-ratings';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Moment from 'react-moment';
import 'moment-timezone';

export default class RestaurantDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0
        }
        ;
        this.changeRating = this.changeRating.bind(this);
    }

    changeRating( newRating ) {
        this.setState({
            rating: newRating
        },
            ()=>console.log(this.state.rating));
    }

    render() {
        if (this.props.restaurantDetail !== 0) {
            const restaurantDetail = this.props.restaurantDetail;
            const comment =
                <div className="row">
                    <div className="col-12">
                        <div className="contact-form-area">
                            <form>
                                <div className="row">
                                    <div className="col-1">
                                        <img className="avatar" src="/img/bg-img/bg5.jpg"/>
                                    </div>
                                    <div className="col-11">
                                        <input name="message" className="form-control" id="message"
                                               placeholder="Message"
                                               defaultValue={""} style={{borderRadius: "15px"}}/>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn delicious-btn mt-30" type="submit" style={{float: "right"}}>Post
                                            Comments
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>;
            return (
                <div>
                    {/* ##### Header Area End ##### */}
                    {/* ##### Breadcumb Area Start ##### */}
                    <div className="breadcumb-area bg-img bg-overlay"
                         style={{backgroundImage: 'url(/img/bg-img/breadcumb3.jpg)'}}>
                        <div className="container h-100">
                            <div className="row h-100 align-items-center">
                                <div className="col-12">
                                    <div className="breadcumb-text text-center">
                                        <h2>{restaurantDetail.name}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ##### Breadcumb Area End ##### */}
                    <div className="receipe-post-area section-padding-80">
                        {/* Receipe Post Search */}
                        <div className="receipe-post-search mb-80">
                            <div className="container">
                                <form action="#" method="post">
                                    <div className="row">
                                        <div className="col-10">
                                            <input type="search" name="search" placeholder="Search Receipies"/>
                                        </div>
                                        <div className="col-2  text-right">
                                            <button type="submit" className="btn delicious-btn">Search</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* Receipe Slider */}
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="receipe-slider">
                                        <img src="/img/bg-img/bg5.jpg"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Receipe Content Area */}
                        <div className="receipe-content-area">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-md-8">
                                        <div className="receipe-headline my-5">
                                            <span><Moment>{restaurantDetail.updated_at}</Moment></span>
                                            <h2>{restaurantDetail.name}</h2>
                                            <div className="receipe-duration">
                                                <h6 style={{fontStyle: "italic"}}>
                                                    <i className="fa fa-map-marker"
                                                       aria-hidden="true"/>
                                                    &emsp;{restaurantDetail.address}</h6>
                                                <h6 style={{fontStyle: "italic"}}>
                                                    <i className="fa fa-phone"
                                                       aria-hidden="true"/>
                                                    &emsp;{restaurantDetail.phone}</h6>
                                                <h6 style={{fontStyle: "italic"}}>
                                                    <i className="fa fa-clock-o"
                                                       aria-hidden="true"/>
                                                    &emsp;Open: 8h00 - 22h00</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <div className="receipe-ratings text-right my-5">
                                            <div className="ratings">
                                                <StarRatings
                                                    rating={this.state.rating}
                                                    changeRating={this.changeRating}
                                                    starRatedColor="gold"
                                                    starDimension="30px"
                                                    starHoverColor="gold"
                                                    starSpacing="3px"
                                                />
                                            </div>
                                            <a className="btn btn-myself">
                                                <i className="fa fa-plus"
                                                   style={{color: "white"}}/>Follow
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="row" >
                                    <Tabs>
                                        <TabList className="row">
                                            <Tab className="tab btn">Description</Tab>
                                            <Tab className="tab btn">Menu</Tab>
                                        </TabList>

                                        <TabPanel style={{maxHeight: "1000px", overflow: "auto", textAlign: "justify"}}>
                                            <h5>{restaurantDetail.description}</h5>
                                        </TabPanel>
                                        <TabPanel className="row" style={{maxHeight: "1000px", overflow: "auto"}}>
                                            <div className="col-12 col-sm-6 col-lg-4">
                                                <div className="single-best-receipe-area mb-30">
                                                    <img src="/img/bg-img/r1.jpg" alt="true"/>
                                                    <div className="receipe-content">
                                                        <a href="receipe-post.html">
                                                            Dog meat
                                                        </a>
                                                        <div className="ratings" style={{color: "grey"}}>
                                                            <i className="fa fa-money" aria-hidden="true" style={{color: "gold"}}/><a>35000VND</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-lg-4">
                                                <div className="single-best-receipe-area mb-30">
                                                    <img src="/img/bg-img/r1.jpg" alt="true"/>
                                                    <div className="receipe-content">
                                                        <a href="receipe-post.html">
                                                            Dog meat
                                                        </a>
                                                        <div className="ratings" style={{color: "grey"}}>
                                                            <i className="fa fa-money" aria-hidden="true" style={{color: "gold"}}/><a>35000VND</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-lg-4">
                                                <div className="single-best-receipe-area mb-30">
                                                    <img src="/img/bg-img/r1.jpg" alt="true"/>
                                                    <div className="receipe-content">
                                                        <a href="receipe-post.html">
                                                            Dog meat
                                                        </a>
                                                        <div className="ratings" style={{color: "grey"}}>
                                                            <i className="fa fa-money" aria-hidden="true" style={{color: "gold"}}/><a>35000VND</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-lg-4">
                                                <div className="single-best-receipe-area mb-30">
                                                    <img src="/img/bg-img/r1.jpg" alt="true"/>
                                                    <div className="receipe-content">
                                                        <a href="receipe-post.html">
                                                            Dog meat
                                                        </a>
                                                        <div className="ratings" style={{color: "grey"}}>
                                                            <i className="fa fa-money" aria-hidden="true" style={{color: "gold"}}/><a>35000VND</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabPanel>
                                    </Tabs>
                                </div>
                                <div className="row" style={{marginTop: "4em"}}>
                                    <div className="col-12">
                                        <div className="section-heading text-left">
                                            <h3>Comment</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="row" style={{marginTop: "4em"}}>
                                    <div className="col-12">
                                        <div className="section-heading text-left">
                                            <h3>Leave a comment</h3>
                                        </div>
                                    </div>
                                </div>
                                {comment}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }
}
