import React from 'react';
import { lazy } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';

const Home = lazy(() => import('Containers/Home'));
const Bime = lazy(() => import('Containers/Bime/Index'));
const Customer = lazy(() => import('Containers/Customer'));
const Ghest = lazy(() => import('Containers/Ghest/Index'));

const MyAppRouter = () => {
  console.log('MyAppRouter');
  const user = useSelector((state) => state.auth.user);

  return (
    <Switch>
      {user && user.username && (
        <>
          <Route exact path="/app" component={Home} />
          <Route exact path="/app/customer/list" component={Customer} />
          <Route excat path="/app/bime/:cId/list" component={Bime} />
          <Route exact path="/app/ghest/:bId/list" component={Ghest} />
        </>
      )}
      {/* {!user && <Redirect to="/login" />} */}
    </Switch>
  );
};

export default MyAppRouter;
