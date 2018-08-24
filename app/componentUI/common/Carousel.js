import React from 'react';
import ReactDOM from 'react-dom';
import './style/style.less';

class Carousel extends React.Component {
    static defaultProps = {
        interval: 5000
    };

    constructor(props, context) {
        super(props, context);

        this.handlePrev = this.handlePrev.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleItemAnimateOutEnd = this.handleItemAnimateOutEnd.bind(this);
        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);

        this.state = {
            activeIndex: 0,
            previousActiveIndex: null,
            direction: null
        };

        this.childrenLength = props.data.length;
        this.isPaused = false;
    }

    componentDidMount() {
        this.waitForNext();
    }

    handleNext(e) {
        let index = this.getActiveIndex() + 1;
        
        if(index > this.childrenLength - 1) {
            index = 0;
        }

        this.select(index, e, 'next');
    }

    handlePrev(e) {
        let index = this.getActiveIndex() - 1;
        
        if(index < 0) {
            index = this.childrenLength - 1;
        }

        this.select(index, e, 'prev');
    }

    select(index, e, direction) {
        const prevIndex = this.getActiveIndex();
        
        clearTimeout(this.timeout);

        // 所选已经激活
        if(index === prevIndex) {
            return;
        }

        // 动画还未结束
        if(this.state.previousActiveIndex !== null) {
            return;
        }
        
        // 计算是上一个还是下一个方向
        direction = direction || this.getDirection(prevIndex, index);

        this.setState({
            activeIndex: index,
            previousActiveIndex: this.getActiveIndex(),
            direction
        });
    }

    getDirection(prevIndex, index) {
        if (prevIndex === index) {
          return null;
        }
    
        return prevIndex > index ? 'prev' : 'next';
    }

    waitForNext() {
        if(this.isPaused || this.isUnmounted) {
            return;
        }

        this.timeout = setTimeout(this.handleNext, this.props.interval);
    }

    getActiveIndex() {
        const activeIndexProp = this.props.activeIndex;
        return this.state.activeIndex;
    }

    getDirection(prevIndex, index) {
        if(prevIndex === index) {
            return null;
        }
      
        return prevIndex > index ? 'prev' : 'next';
    }

    handleItemAnimateOutEnd() {
        this.setState({
            previousActiveIndex: null,
            direction: null
        }, () => {
            this.waitForNext();
        });
    }

    handleMouseHover() {
        clearTimeout(this.timeout);
        this.isPaused = true;
    }

    handleMouseOut() {
        this.isPaused = false;
        this.waitForNext();
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {
        const { data, style = {}, className = '' } = this.props;
        const { previousActiveIndex, direction } = this.state;
        const activeIndex = this.getActiveIndex();

        return (
            <div 
                className={`carousel-wrapper ${className}`} 
                onMouseOver={this.handleMouseHover}
                onMouseOut={this.handleMouseOut}
                style={style}
            >
                <span className="prev-item" role="button" onClick={this.handlePrev} />
                <span className="next-item" role="button" onClick={this.handleNext} />
                <div className="carousel-subs">
                {
                    data.map((item, index) => (
                        <span
                            onClick={e => this.select(index, e)}
                            key={index} 
                            className={`sub-item ${index === activeIndex ? 'active' : ''}`} 
                            role="button" 
                        />
                    ))
                }
                </div>
            {
                data.map((item, index) => {
                    const active = index === activeIndex;
                    const previousActive = index === previousActiveIndex;
                    const props = {
                        active,
                        animateOut: previousActive,
                        animateIn: active && previousActiveIndex !== null,
                        direction,
                        onAnimateOutEnd: previousActive ? this.handleItemAnimateOutEnd : null,
                    };

                    return (
                        <Item {...props} key={index} data={item} />
                    );
                })
            }
            </div>
        )
    }
};

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.handleAnimateOutEnd = this.handleAnimateOutEnd.bind(this);
        this.state = {
            direction: null,
        };
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.active !== nextProps.active) {
            this.setState({ direction: null });
        }
    }

    componentDidMount() {
        this.domNode = ReactDOM.findDOMNode(this);
    }

    componentDidUpdate(previousProps) {
        const { active } = this.props;
        const prevActive = previousProps.active;

        if(!active && prevActive) {
            this.domNode.addEventListener('transitionend', this.handleAnimateOutEnd, false);
        }
      
        if(active !== prevActive) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => this.startAnimation(), 30);
        }
    }

    // 动画结束执行的回调
    handleAnimateOutEnd() {
        if(this.props.onAnimateOutEnd) {
            // 此时要调用父组件onAnimateOutEnd， 告诉父组件本次轮播已完成
            this.props.onAnimateOutEnd();
        }
    }

    startAnimation() {
        this.setState({
            direction: this.props.direction === 'prev' ? 'right' : 'left',
        });
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
        this.domNode.removeEventListener('transitionend', this.handleAnimateOutEnd);
    }

    render() {
        const {
            direction, active, animateIn, animateOut, className, ...props
        } = this.props;
      
        var classNameArr = [];
          
        if (direction && active && animateIn) {
            classNameArr.push(direction);
        }
        if(this.state.direction && (animateIn || animateOut)) {
            classNameArr.push(this.state.direction);
        }

        if((active && !animateIn) || animateOut) {
            classNameArr.push('active');
        }

        return (
            <div className={`carousel-item ${classNameArr.join(' ')}`}>
                {this.props.data}
            </div>
        )
    }
}

export default Carousel;