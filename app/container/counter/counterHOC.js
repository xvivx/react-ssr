import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ACTIONS from '../../redux/actions/counterActions';

const mapStateToProps = (state) => {
    return {
        counter: state.counter
    };
};

let timer = null;

const incrementAuto = (dispatch) => {
    dispatch(ACTIONS.increment);
    clearInterval(timer);
    timer = setInterval(() => {
        dispatch(ACTIONS.increment);
    }, 1000);
};

const stopIncrement = () => {
    return clearInterval(timer);
};

// 几种不同的写法
const mapDispatchToProps = (dispatch) => {
    return {
        onIncrement: dispatch.bind(null, ACTIONS.increment),
        onDecrement: () => dispatch(ACTIONS.decrement),
        incrementAuto: incrementAuto.bind(null, dispatch),
        stopIncrement: stopIncrement,
        reset: bindActionCreators(() => ACTIONS.reset, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps);