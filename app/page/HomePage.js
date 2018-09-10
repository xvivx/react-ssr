import React from 'react';
import Carousel from '../componentUI/common/Carousel';
import Void from '../componentUI/common/Void';
import { formatDate } from 'idiv-utils';

import img1 from '../styles/img/bg_pic1.jpg';
import img2 from '../styles/img/bg_pic2.jpg';
import img3 from '../styles/img/bg_pic3.jpg';
import img4 from '../styles/img/bg_pic4.jpg';

// 定义轮播内容
const data = [img1, img2, img3, img4].map((item, index) => (
    <div>
        <h1 style={{ textAlign: 'center' }}>第{index + 1}页</h1>
        <img src={item} title={item}/>
    </div>
));



export default props => {
    console.log(formatDate(Date.now()))
    return (
        <Void>
            <div className="container">
                <div className="page-header">
                    <h1>勇往直前 <small>你的指尖，有改变世界的力量</small></h1>
                </div>
                <Carousel interval={8000} data={data} />
                <div className="page-header">
                    <h1>为梦想而战 <small>学的不仅仅是技术，更是梦想！</small></h1>
                </div>
            </div>
            <div className="jumbotron">
                <div className="container">
                    <h1>Hello, world!</h1>
                    <p>书山有路勤为径，学海无涯苦作舟。</p>
                    <p><a className="btn btn-primary btn-lg" href="javascript: void(0)" role="button">Learn more</a></p>
                </div>
            </div>
        </Void>
    );
};