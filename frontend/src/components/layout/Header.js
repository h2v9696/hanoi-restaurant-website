import React, {Component} from "react"
import {
    Link,
} from "react-router-dom";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <header className="header-area">
                {/* Top Header Area */}
                <div className="delicious-main-menu">
                    <div className="classy-nav-container breakpoint-off">
                        <div className="container">
                            {/* Menu */}
                            <nav className="classy-navbar justify-content-between" id="deliciousNav">
                                {/* Logo */}
                                <a className="nav-brand" href="/"><img src="/img/core-img/logo.png"/></a>
                                {/* Navbar Toggler */}
                                <div className="classy-navbar-toggler">
                                    <span className="navbarToggler"><span/><span/><span/></span>
                                </div>
                                {/* Menu */}
                                <div className="classy-menu">
                                    {/* close btn */}
                                    <div className="classycloseIcon">
                                        <div className="cross-wrap"><span className="top"/><span
                                            className="bottom"/></div>
                                    </div>
                                    {/* Nav Start */}
                                    <div className="classynav">
                                        <ul>
                                            <li className="active"><a href="index.html">Home</a></li>
                                            <li><a href="">Restaurant</a></li>
                                            <li><a href="#">Notification</a></li>
                                            <li><Link to="logIn">Login</Link></li>
                                        </ul>
                                        {/* Newsletter Form */}
                                        <div className="search-btn">
                                            <i className="fa fa-search" aria-hidden="true"/>
                                        </div>
                                    </div>
                                    {/* Nav End */}
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
                {/* Navbar Area */}
                <div className="top-header-area">
                    <div className="container h-100">
                        <div className="row h-100 align-items-center justify-content-between">
                            <div className="col-12 col-sm-6">
                                <div className="top-social-info text-right">
                                    <a href="#"><i className="fa fa-pinterest" aria-hidden="true"/></a>
                                    <a href="#"><i className="fa fa-facebook" aria-hidden="true"/></a>
                                    <a href="#"><i className="fa fa-twitter" aria-hidden="true"/></a>
                                    <a href="#"><i className="fa fa-dribbble" aria-hidden="true"/></a>
                                    <a href="#"><i className="fa fa-behance" aria-hidden="true"/></a>
                                    <a href="#"><i className="fa fa-linkedin" aria-hidden="true"/></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
