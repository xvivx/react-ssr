import React from 'react';

export default class extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            time: ''
        };
    }

    formatTime(time) {
        return time.toLocaleString();
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                time: this.formatTime(new Date())
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render () {
        return (
            <div>{this.state.time}</div>
        )
    }
}