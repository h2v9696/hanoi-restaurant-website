import React, {Component} from "react"
import Slider from "react-slick";
import StarRatings from 'react-star-ratings';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Moment from 'react-moment';
import 'moment-timezone';

import {
    Link,
} from "react-router-dom";
import {Image} from "cloudinary-react";
import cloudinary from 'cloudinary-core'

const cloudinaryCore = new cloudinary.Cloudinary({cloud_name: 'dzd4yfu79'})
export default class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 4
        };
    }

    render() {
        if (this.props.restaurantInfo !== 0) {
            const restaurant = this.props.restaurantInfo;
            const restaurantTop3 = [].concat(restaurant
                .sort((a, b)=>b.rating_avg - a.rating_avg))
                .map((restaurantInfo, index)=>{
                if (index <= 2){
                    return (
                        <div key={restaurantInfo.id}>
                            <div style={{
                                height: "700px",
                                backgroundImage: `url(${cloudinaryCore.url(restaurantInfo.cover_url)})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'noRepeat'
                            }}>
                                <div className="container h-100">
                                    <div className="row h-100 align-items-center"
                                         style={{backgroundColor: "rgba(255,255,255, 0.3)", width: "500px", position: "fixed", textOverflow: "ellipsis",overflow: "hidden"}}>
                                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                            <a>
                                                <h1 style={{color: "white"}}>{restaurantInfo.name}</h1>
                                            </a>
                                            <div className="ratings">
                                                <StarRatings
                                                    rating={restaurantInfo.rating_avg}
                                                    starRatedColor="gold"
                                                    starDimension="20px"
                                                    starSpacing="3px"
                                                    name={restaurantInfo.id}
                                                />
                                            </div>
                                            <a>
                                                <h5 style={{
                                                    color: "white",
                                                    fontStyle: "italic"
                                                }}>{restaurantInfo.address}</h5>
                                            </a>
                                            <div className="hero-slides-content" data-animation="fadeInUp"
                                                 data-delay="100ms" style={{height: "11em",textOverflow: "ellipsis",overflow: "hidden"}}>
                                                <a>
                                                    <h5 style={{
                                                        color: "white",
                                                        fontStyle: "italic",
                                                        textOverflow: "ellipsis"
                                                    }}>{restaurantInfo.description}</h5>
                                                </a>
                                            </div>
                                            <Link to={"restaurant/"+restaurantInfo.id} style={{color: "white",textDecoration: "underline"}}>More info about {restaurantInfo.name}</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
            });

            const restaurantTop6 = [].concat(restaurant
                .sort((a, b)=> a.name.localeCompare(b.name)))
                .map((restaurantInfo, index)=>{
                if (index <= 5){
                    return (
                        <div className="col-12 col-sm-6 col-lg-4" key={restaurantInfo.id}>
                            <div className="single-best-receipe-area mb-30">
                                <Image
                                    publicId={restaurantInfo.cover_url}>
                                </Image>
                                <div className="receipe-content">
                                    <Link to={"restaurant/"+restaurantInfo.id}>{restaurantInfo.name}</Link>
                                    <div className="ratings">
                                        <StarRatings
                                            rating={restaurantInfo.rating_avg}
                                            starRatedColor="gold"
                                            starDimension="15px"
                                            starSpacing="2px"
                                            name={restaurantInfo.id}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
            });

            const newRestaurant= [].concat(restaurant
                .sort((a, b)=>a.created_at > b.created_at))
                .map((restaurantInfo, index)=>{
                    if (index <= 8) {
                        return (
                            <div className="col-12 col-sm-6 col-lg-4" key={restaurantInfo.id}>
                                <div className="single-small-receipe-area d-flex">
                                    {/* Receipe Thumb */}
                                    <div className="receipe-thumb">
                                        <Image
                                            publicId={restaurantInfo.cover_url}>
                                        </Image>
                                    </div>
                                    {/* Receipe Content */}
                                    <div className="receipe-content">
                                        <span><Moment format="YYYY/MM/DD HH:MM">{restaurantInfo.created_at}</Moment></span>
                                        <Link to={"restaurant/" + restaurantInfo.id}>{restaurantInfo.name}</Link>
                                        <div className="ratings">
                                            <StarRatings
                                                rating={restaurantInfo.rating_avg}
                                                starRatedColor="gold"
                                                starDimension="10px"
                                                starSpacing="1px"
                                                name={restaurantInfo.id}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                });

            let middle = [];
            if (!sessionStorage.getItem('id_user')) {
                middle =
                    <div className="cta-content text-center">
                        <p>Follow the favourite restaurants, share your feeling with more and more people,find the best for you and your family!</p>
                        <Link to="login" className="btn btn-myself">Login now!</Link>
                    </div>
            }
            if (sessionStorage.getItem('id_user')) {
                middle =
                    <div className="cta-content text-center">
                        <h3 style={{color: "white"}}>See all restaurants which you are subscribing!</h3>
                        <Link to="profile" className="btn btn-myself">My profile</Link>
                    </div>
            }

            //slider-slick's setting
            var settings = {
                dots: true,
                infinite: true,
                speed: 1000,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 3000,
                arrows: false,
                adaptiveHeight: false
            };

            return (
                <div>
                    {/*caseroul*/}
                    <section className="hero-area">
                        <div className="single-hero-slide bg-img">
                            <Slider {...settings}>
                                {restaurantTop3}
                            </Slider>
                        </div>
                    </section>
                    <br/>
                    <br/>

                    {/* ##### Top Catagory Area End ##### */}
                    {/* ##### Best Receipe Area Start ##### */}
                    <section className="best-receipe-area">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="section-heading">
                                        <h3>The best Restaurants</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {restaurantTop6}
                            </div>
                        </div>
                    </section>
                    {/* ##### Best Receipe Area End ##### */}
                    {/* ##### CTA Area Start ##### */}
                    <section className="cta-area bg-img bg-overlay"
                             style={{backgroundImage: 'url(/img/bg-img/bg4.jpg)'}}>
                        <div className="container h-100">
                            <div className="row h-100 align-items-center">
                                <div className="col-12">
                                    {middle}
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* ##### CTA Area End ##### */}
                    {/* ##### Small Receipe Area Start ##### */}
                    <section className="small-receipe-area section-padding-80-0">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="section-heading">
                                        <h3>New restaurants</h3>
                                    </div>
                                </div>
                                {newRestaurant}
                            </div>
                        </div>
                    </section>
                    {/* ##### Small Receipe Area End ##### */}
                    {/* ##### Quote Subscribe Area Start ##### */}
                    <section className="quote-subscribe-adds">
                        <div className="container">
                            <div className="row align-items-end">
                                {/* Quote */}
                                <div className="col-12 col-lg-4">
                                    <div className="quote-area text-center">
                                        <span>"</span>
                                        <h4>Nothing is better than going home to family and eating good food and
                                            relaxing</h4>
                                        <span>"</span>
                                        <p>Jap3 team</p>
                                        <div className="date-comments d-flex justify-content-between">
                                            <div className="date">October 23, 2018</div>
                                        </div>
                                    </div>
                                </div>
                                {/* Newsletter */}
                                <div className="col-12 col-lg-4">
                                    <div className="newsletter-area">
                                        <h4>Subscribe to our newsletter</h4>
                                        {/* Form */}
                                        <div className="newsletter-form bg-img bg-overlay"
                                             style={{backgroundImage: 'url(img/bg-img/bg1.jpg)'}}>
                                            <form action="#" method="post">
                                                <input type="email" name="email" placeholder="Subscribe to newsletter"/>
                                                <button type="submit" className="btn delicious-btn w-100">Subscribe
                                                </button>
                                            </form>
                                            <p>Fusce nec ante vitae lacus aliquet vulputate. Donec sceleri sque accumsan
                                                molestie. Vestibulum ante ipsum primis in faucibus orci luctus et
                                                ultrices
                                                posuere cubilia.</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Adds */}
                                <div className="col-12 col-lg-4">
                                    <div className="delicious-add">
                                        <img src="/img/bg-img/add.png" alt="true"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            );
        }
        else {
            return (
                <div></div>
            )
        }
    }
}
