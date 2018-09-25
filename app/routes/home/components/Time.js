import React from 'react';

export default class extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = { time: '' };
        this.updateTime = this.updateTime.bind(this);
    }

    twoNum(num) {
        return (num > 9 ? '' : '0') + num;
    }

    formatTime(time) {
        var y = time.getFullYear();
        var m = this.twoNum(time.getMonth() + 1);
        var d = this.twoNum(time.getDate());
        var hh = this.twoNum(time.getHours());
        var mm = this.twoNum(time.getMinutes());
        var ss = this.twoNum(time.getSeconds());
        
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
    }

    updateTime() {
        this.setState({
            time: this.formatTime(new Date())
        });
    }

    componentWillMount() {
        this.updateTime();
    }

    componentDidMount() {
        console.log(this.state.time)
        this.timer = setInterval(this.updateTime, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render () {
        return (
            <div className="time">{this.state.time}</div>
        )
    }
};