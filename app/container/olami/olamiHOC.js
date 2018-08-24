import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ACTIONS from '../../redux/actions/olamiActions';


const mapStateToProps = (state) => {
    return { data: state.text };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchAddTodo: bindActionCreators(ACTIONS.fetchPosts, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps);