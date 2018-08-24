import * as ACTIONS from '../actions/olamiActions';

export const text = (state=[], action) => {
    switch(action.type) {
        case ACTIONS.RECEIVE_POSTS:
            return [
                ...state,
                {
                    className: '',
                    contentText: action.text
                }
            ];
        case ACTIONS.MYSELF_MESSAGE:
            return [
                ...state,
                {
                    className: 'right',
                    contentText: action.text
                }
            ];
        default:
            return state;
    }
};

export default { text };