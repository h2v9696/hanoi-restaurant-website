import React, {Component} from "react"
import {
    Link,
} from "react-router-dom";

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return (
            <footer className="footer-area">
                <div className="follow-us-instagram">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h5>Follow Us Instagram</h5>
                            </div>
                        </div>
                    </div>
                    {/* Instagram Feeds */}
                    <div className="insta-feeds d-flex flex-wrap">
                        {/* Single Insta Feeds */}
                        <div className="single-insta-feeds">
                            <img src="/img/bg-img/insta1.jpg" alt="true"/>
                            {/* Icon */}
                            <div className="insta-icon">
                                <a href="#"><i className="fa fa-instagram" aria-hidden="true"/></a>
                            </div>
                        </div>
                        {/* Single Insta Feeds */}
                        <div className="single-insta-feeds">
                            <img src="/img/bg-img/insta2.jpg" alt="true"/>
                            {/* Icon */}
                            <div className="insta-icon">
                                <a href="#"><i className="fa fa-instagram" aria-hidden="true"/></a>
                            </div>
                        </div>
                        {/* Single Insta Feeds */}
                        <div className="single-insta-feeds">
                            <img src="/img/bg-img/insta3.jpg" alt="true"/>
                            {/* Icon */}
                            <div className="insta-icon">
                                <a href="#"><i className="fa fa-instagram" aria-hidden="true"/></a>
                            </div>
                        </div>
                        {/* Single Insta Feeds */}
                        <div className="single-insta-feeds">
                            <img src="/img/bg-img/insta4.jpg" alt="true"/>
                            {/* Icon */}
                            <div className="insta-icon">
                                <a href="#"><i className="fa fa-instagram" aria-hidden="true"/></a>
                            </div>
                        </div>
                        {/* Single Insta Feeds */}
                        <div className="single-insta-feeds">
                            <img src="/img/bg-img/insta5.jpg" alt="true"/>
                            {/* Icon */}
                            <div className="insta-icon">
                                <a href="#"><i className="fa fa-instagram" aria-hidden="true"/></a>
                            </div>
                        </div>
                        {/* Single Insta Feeds */}
                        <div className="single-insta-feeds">
                            <img src="/img/bg-img/insta6.jpg" alt="true"/>
                            {/* Icon */}
                            <div className="insta-icon">
                                <a href="#"><i className="fa fa-instagram" aria-hidden="true"/></a>
                            </div>
                        </div>
                        {/* Single Insta Feeds */}
                        <div className="single-insta-feeds">
                            <img src="/img/bg-img/insta7.jpg" alt="true"/>
                            {/* Icon */}
                            <div className="insta-icon">
                                <a href="#"><i className="fa fa-instagram" aria-hidden="true"/></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container h-100">
                    <div className="row h-100">
                        <div
                            className="col-12 h-100 d-flex flex-wrap align-items-center justify-content-between">
                            {/* Footer Social Info */}
                            <div className="footer-social-info text-right">
                                <a href="#"><i className="fa fa-pinterest" aria-hidden="true"/></a>
                                <a href="#"><i className="fa fa-facebook" aria-hidden="true"/></a>
                                <a href="#"><i className="fa fa-twitter" aria-hidden="true"/></a>
                                <a href="#"><i className="fa fa-dribbble" aria-hidden="true"/></a>
                                <a href="#"><i className="fa fa-behance" aria-hidden="true"/></a>
                                <a href="#"><i className="fa fa-linkedin" aria-hidden="true"/></a>
                            </div>
                            {/* Footer Logo */}
                            <div className="footer-logo">
                                <a href="index.html"><img src="/img/core-img/logo.png" alt="true"/></a>
                            </div>
                            {/* Copywrite */}
                            <p>{/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                                Copyright © All rights reserved | This website is made with <i
                                    className="fa fa-heart-o" aria-hidden="true" style={{color: "pink"}}/> by <a
                                    href="https://colorlib.com"
                                    target="_blank">Jap3</a>
                            </p></div>
                    </div>
                </div>
            </footer>
        );
    }
}
