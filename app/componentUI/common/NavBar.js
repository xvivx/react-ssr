import React from 'react';
import {NavLink} from 'react-router-dom';

const style = `
    .navbar-inverse .navbar-nav > li > a.active{
        background-image: linear-gradient(to bottom, #080808 0%, #0f0f0f 100%);
        border-bottom: 2px solid #f60;
    }
`
export default props => {
    const data = props.data;
    return (
        <nav className="navbar navbar-inverse">
            <style>
                {style}
            </style>
            <div className="container">
                <ul className="nav navbar-nav">
                {
                    data.map((item, index) => {
                        return (
                            <li key={index}>
                                <NavLink to={item.href} exact activeClassName="active">{item.name}</NavLink>
                            </li>
                        );
                    })
                }
                </ul>
            </div>
        </nav>
    );
}