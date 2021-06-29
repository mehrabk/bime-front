import React from 'react';
import { lazy } from 'react';
import { Route, Switch } from 'react-router';

const Home = lazy(() => import('Containers/Home'));
const Bime = lazy(() => import('Containers/Bime/Index'));
const Customer = lazy(() => import('Containers/Customer'));
const Ghest = lazy(() => import('Containers/Ghest/Index'));

const MyAppRouter = () => {
  return (
    <Switch>
      <Route exact path="/app" component={Home} />
      <Route exact path="/app/customerList" component={Customer} />
      <Route excat path="/app/customer/:cId/bimeList" component={Bime} />
      <Route
        exact
        path="/app/customer/:cId/bime/:bId/ghestList"
        component={Ghest}
      />
    </Switch>
  );
};

export default MyAppRouter;
