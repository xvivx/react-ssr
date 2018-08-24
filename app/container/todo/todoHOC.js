import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ACTIONS from '../../redux/actions/todoActions.js';


const mapStateToProps = state => {
    var visibility = state.visibility;

    return {...state};
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchAddTodo: bindActionCreators(ACTIONS.addTodo, dispatch),
        dispatchToggleTodo: bindActionCreators(ACTIONS.toggleTodoActive, dispatch),
        dispatchDeleteTodo: bindActionCreators(ACTIONS.deleteTodo, dispatch),
        dispatchFilter: bindActionCreators(ACTIONS.setVisibility, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps);