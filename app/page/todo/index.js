import dynamic from '../../utils/dynamic-page';
import React from 'react';
import Loadable from 'react-loadable';




// export default Loadable({
//     loader: () => import('./ToDoPage'),
//     loading: () => (<div>Loading</div>),
// });

// export default x => <dynamic(import('./ToDoPage'))/>


export default dynamic(() => import('./ToDoPage'));