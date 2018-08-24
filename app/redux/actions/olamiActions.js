import { Fetch } from '../../utils/baseUtils';
import { olamiApi } from '../api.config';
import md5 from '../../utils/md5';


export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const MYSELF_MESSAGE = 'MYSELF_MESSAGE';

export const receivePosts = (text) => {
    return {
        type: RECEIVE_POSTS,
        text: text
    };
};


const appkey = `7881b6651cc24ac7a8de4d3d10d8d4d0`;
const secret = `8e769e2db61043319c962b38f78192c6`;


const myselfMessage = (text) => {
    return {
        type: MYSELF_MESSAGE,
        text
    };
};


export const fetchPosts = (value) => dispatch => {
    const md5String = `${ secret }api=nliappkey=${ appkey }timestamp=${ Date.now() }${ secret }`;
    const rq = JSON.stringify({
        'data': { 'input_type': 1, 'text': value },
        'data_type': 'stt'
    });
    const params = {
        appkey,
        timestamp: Date.now(),
        sign: md5(md5String),
        rq,
        api: 'nli',
    };

    dispatch(myselfMessage(value));

    return Fetch(olamiApi, params).then(res => {
        var data_obj = res.data.nli[0].data_obj;
        if(data_obj) {
            return dispatch(receivePosts(data_obj[0].content));
        }
        return dispatch(receivePosts(res.data.nli[0].desc_obj.result));
    });
};