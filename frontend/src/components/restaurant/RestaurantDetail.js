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
import axios from "axios";
import API from 'constants/api';

export default class RestaurantDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            ratingId: 0,
            dish: 0,
            userInfo: 0,
            comments: 0,
            checkComment: 0,
            subscribe: []
        };
        this.changeRating = this.changeRating.bind(this);
        this.getComment = this.getComment.bind(this);
        this.checkComment = this.checkComment.bind(this);
        this.getSubscribe = this.getSubscribe.bind(this);
    }

    componentDidMount () {
        axios.get(API+'api/dishes/?restaurant_id=' + this.props.match.params.id)
            .then(
                response => {
                    this.setState({dish: response.data.data})
                })
            .catch(
                error => console.log('Dish: error!')
            );
        this.getComment(this.props.match.params.id);
        this.getSubscribe();
        this.getRating();
        this.checkComment();
    }

    getUser() {
        axios.get(API+'api/users/' + sessionStorage.getItem('id_user'))
            .then(
                response => {
                    this.setState({userInfo: response.data.data})
                })
            .catch(
                error => console.log('Dish: error!')
            )
    }

    getComment (restaurantId) {
        axios.get(API+'api/comments/?restaurant_id=' + restaurantId)
            .then(
                response => {
                    this.setState({comments: response.data.data})
                })
            .catch(
                error => console.log('Comments: error!')
            );
    }

    postComment (comment) {
        comment.set('content', this.refs.comment.value);
        axios({
            method: 'post',
            url: API + 'api/comments',
            data:comment,
            headers: {'Content-Type': 'multipart/form-data'}
        })
            .then(response=>{
                console.log("commented!");
                this.getComment(this.props.match.params.id);
            })
            .catch(error=>console.log("comment: error!"));
    }

    putComment () {
        let comment = new FormData();
        comment.set('content', this.refs.comment.value);
        axios({
            method: 'put',
            url: API + 'api/comments/'+this.state.checkComment[0].id,
            data:comment,
            headers: {'Content-Type': 'multipart/form-data'}
        })
            .then(response=>{
                console.log("updated comment!");
                this.getComment(this.props.match.params.id);
            })
            .catch(error=>console.log("updated comment: error!"));
    }

    checkComment () {
        axios.get(API+'api/comments/?restaurant_id=' + this.props.match.params.id + "&&user_id=" + sessionStorage.getItem('id_user'))
            .then(
                response => {
                    this.setState({checkComment: response.data.data})
                })
            .catch(
                error => console.log('Check comments: error!')
            );
    }

    getSubscribe () {
        axios.get(API+'api/subscriptions/?restaurant_id=' + this.props.match.params.id + "&&" + "user_id="+sessionStorage.getItem('id_user'))
            .then(
                response => {
                    this.setState({subscribe: response.data.data})
                })
            .catch(error => console.log('Follow: error!'));
    }

    Subscribe () {
        if (this.state.subscribe.length === 0) {
            const subscribe = new FormData();
            subscribe.set('restaurant_id', this.props.match.params.id);
            subscribe.set('user_id', sessionStorage.getItem("id_user"));
            axios({
                method: 'post',
                url: API + 'api/subscriptions',
                data:subscribe,
                headers: {'Content-Type': 'multipart/form-data'}
            })
                .then(response=>{
                    console.log("subscribed!");
                    this.getSubscribe();
                })
                .catch(error=>console.log("subscribe: error!"));
        }
        else {
            console.log(this.state.subscribe);
            axios({
                method: 'delete',
                url: API + 'api/subscriptions/'+this.state.subscribe[0].id,
                headers: {'Content-Type': 'multipart/form-data'}
            })
                .then(response=>{
                    console.log("deleted subscribe!");
                    this.getSubscribe();
                })
                .catch(error=>console.log("delete subscribe: error!"));
        }
    }

    getRating () {
        axios.get(API+'api/ratings/?restaurant_id=' + this.props.match.params.id + "&&" + "user_id="+sessionStorage.getItem('id_user'))
            .then(
                response => {
                    this.setState({rating: response.data.data[0].value})
                    this.setState({ratingId: response.data.data[0].id})
                })
            .catch(error => console.log('Follow: error!'));   
    }

    changeRating( newRating ) {
        if (this.state.rating.length === 0) { 
            this.setState({
                rating: newRating
            },
                ()=>console.log(this.state.rating));

            const rating = new FormData();
                rating.set('restaurant_id', this.props.match.params.id);
                rating.set('user_id', sessionStorage.getItem("id_user"));
                rating.set('value', newRating);
                axios({
                    method: 'post',
                    url: API + 'api/ratings',
                    data:rating,
                    headers: {'Content-Type': 'multipart/form-data'}
                })
                    .then(response=>{
                        console.log("rated!");
                        this.getSubscribe();
                    })
                    .catch(error=>console.log("rating: error!"));
            }
        else {
            this.setState({
                rating: newRating
            },
                ()=>console.log(this.state.rating));

            const rating = new FormData();
                rating.set('value', newRating);
                axios({
                    method: 'put',
                    url: API + 'api/ratings/' +this.state.ratingId,
                    data:rating,
                    headers: {'Content-Type': 'multipart/form-data'}
                })
                    .then(response=>{
                        console.log("rating updated!");
                        this.getSubscribe();
                    })
                    .catch(error=>console.log("rating updated: error!"));
        }
    }

    render() {
        if (this.props.restaurantDetail !== 0) {
            const restaurantDetail = this.props.restaurantDetail;

            //show menu
            const dish = this.state.dish;
            let dishes = [];
            if (dish !== 0) {
                dishes = dish.map((dish,index)=>{
                    return (
                        <div className="col-12 col-sm-6 col-lg-4" key={index}>
                            <div className="single-best-receipe-area mb-30">
                                <img className="dish_image" src={dish.image_url} alt="true"/>
                                <div className="receipe-content">
                                    <a href="receipe-post.html">
                                        {dish.name}
                                    </a>
                                    <div className="ratings" style={{color: "grey"}}>
                                        <i className="fa fa-money" aria-hidden="true" style={{color: "gold"}}/><a>{dish.price}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                });
            }

            //show comment
            const commentState = this.state.comments;
            let comments = []
            if (commentState !== 0) {
                comments = commentState.map((comment)=>{
                    return (
                        <div className="col-12" key={comment.id}>
                            <div className="contact-form-area">
                                <form>
                                    <div className="row commentPost">
                                        <div className="col-1">
                                            <img className="avatar" src="/img/bg-img/bg5.jpg"/>
                                        </div>
                                        <div className="col-11" style={{textAlign: "justify"}}>
                                            <h3 style={{fontWeight: "bold !important"}}>{comment.user_id}</h3>
                                            <h4 style={{fontWeight: "bold !important"}}>{comment.content}</h4>
                                        </div>
                                        <p className="col-1"></p>
                                        <p className="col-2 time"><Moment>{comment.created_at}</Moment></p>
                                        <p className="col-2 time">Updated at <Moment>{comment.updated_at}</Moment></p>
                                        <p className="col-1"></p>
                                        <p className="col-2"><i className="fa fa-thumbs-up" style={{}}/>Like</p>
                                        <p className="col-2"><i className="fa fa-comment" style={{}}/>Reply</p>
                                        <p className="col-2"><i className="fa fa-flag" style={{}}/>Report</p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    );
                });
            }

            // post new comment, subscribe
            let newComment = [];
            let subscribe = [];
            let commentForm = new FormData();
            if (sessionStorage.getItem('id_user')) {
                //new comment
                if (this.state.checkComment.length === 0) {
                    newComment =
                    <div className="row">
                        <div className="col-12">
                            <div className="contact-form-area">
                                <div className="row">
                                    <div className="col-1">
                                        <img className="avatar" src="/img/bg-img/bg5.jpg"/>
                                    </div>
                                    <div className="col-11">
                                        <input name="message" className="form-control" id="message"
                                               placeholder="Message"
                                               defaultValue={""} style={{borderRadius: "15px"}} ref="comment"/>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn delicious-btn mt-30" onClick={()=>this.postComment(commentForm)} type="submit" style={{float: "right", fontSize: "15px"}}>Post
                                            Comments
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>;
                    commentForm.set('user_id', sessionStorage.getItem('id_user'));
                    commentForm.set('restaurant_id', this.props.match.params.id);
                    commentForm.set('content', this.refs.comment);
                }

                //update comment
                if (this.state.checkComment !==0) {
                    newComment =
                    <div className="row">
                        <div className="col-12">
                            <div className="contact-form-area">
                                <div className="row">
                                    <div className="col-1">
                                        <img className="avatar" src="/img/bg-img/bg5.jpg"/>
                                    </div>
                                    <div className="col-11">
                                        <input name="message" className="form-control" id="message"
                                               placeholder={this.state.checkComment[0].content}
                                               defaultValue={this.state.checkComment[0].content} style={{borderRadius: "15px"}} ref="comment"/>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn delicious-btn mt-30" onClick={()=>this.putComment()} type="submit" style={{float: "right", fontSize: "15px"}}>Update
                                            Comments
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>;
                }

                //subscribe
                if ((this.state.subscribe).length === 0) {
                    subscribe = 
                    <a className="btn btn-myself" onClick={()=>this.Subscribe()}>
                        <i className="fa fa-plus"
                           style={{color: "white"}}/>Subscribe
                    </a>
                }
                 if ((this.state.subscribe).length !== 0) {
                    subscribe =
                    <a className="btn btn-light btn-myself-2" onClick={()=>this.Subscribe()}>
                        <i className="fa fa-check"
                           style={{color: "grey"}}/>Subscribed
                    </a>
                }
            } 

            if (!sessionStorage.getItem('id_user')) {
                newComment = 
                <div>
                    <button className="comment btn">Please <Link className="comment-1" to="/login">log in</Link> to comment this restaurant!</button>
                </div>;

                subscribe =
                    <a className="btn btn-light btn-myself-2" data-toggle="tooltip" title="You must log in to subscribe this restaurant!" data-placement="top" disabled>
                        <i className="fa fa-plus"
                           style={{color: "grey"}}/>Subscribe
                    </a>
            }

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
                                            {subscribe}
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
                                            <h4>{restaurantDetail.description}</h4>
                                        </TabPanel>
                                        <TabPanel className="row" style={{maxHeight: "1000px", overflow: "auto"}}>
                                            {dishes}
                                        </TabPanel>
                                    </Tabs>
                                </div>
                                <div className="row" style={{marginTop: "4em"}}>
                                    <div className="col-12">
                                        <div className="section-heading text-left">
                                            <h3>Comment</h3>
                                        </div>
                                        {comments}
                                    </div>
                                </div>
                                <div className="row" style={{marginTop: "4em"}}>
                                    <div className="col-12">
                                        <div className="section-heading text-left">
                                            <h3>Leave a comment</h3>
                                        </div>
                                    </div>
                                </div>
                                {newComment}
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
