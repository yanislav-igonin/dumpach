import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from '../modules/MainPage';
// import Thread from '../modules/Thread';
// import NotFound from '../modules/NotFound';
// import Admin from '../modules/Admin';
// import Login from '../modules/Admin/components/Login';
// import Dashboard from '../modules/Admin/modules/Dashboard/Dashboard';
// import Boards from '../modules/Admin/modules/Dashboard/Boards';
// import ThreadsList from '../modules/Admin/modules/Dashboard/ThreadsList';

// const Routes = ({ getThread, getThreads }) => (
// <Router history={browserHistory}>
//   <Route path="admin" component={Admin}>
//     <IndexRedirect to="login" />
//     <Route
//       path="login"
//       component={Login}
//       onEnter={(nextState, replace) => Admin.onEnter(nextState, replace)}
//     />
//     <Route
//       path="dashboard"
//       component={Dashboard}
//       onEnter={(nextState, replace) => Admin.onEnter(nextState, replace)}
//     >
//       <Route path="boards" component={Boards}>
//         <IndexRedirect to="b" />
//         <Route
//           path=":boardId"
//           component={ThreadsList}
//           onEnter={({ params }) => getThreads(params)}
//         />
//       </Route>
//     </Route>
//   </Route>

//   <Route path="/" component={MainPage}>
//     <Route path="not_found" component={NotFound} />
//     <Route
//       path=":boardId"
//       component={Threads}
//       onEnter={({ params }) => getThreads(params)}
//     />
//     <Route
//       path=":boardId/:threadId"
//       component={Thread}
//       onEnter={({ params }) => getThread(params)}
//     />
//   </Route>
// </Router>

// );
const Routes = () => (
  <Router>
    <Route path="/" component={MainPage} />
  </Router>
);

export default Routes;
