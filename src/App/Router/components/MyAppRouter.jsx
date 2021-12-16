import React, { lazy } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';

const Home = lazy(() => import('Containers/Home'));
const Bime = lazy(() => import('Containers/Bime/Index'));
const Customer = lazy(() => import('Containers/Customer'));
const Ghest = lazy(() => import('Containers/Ghest/Index'));
const Login = lazy(() => import('Containers/Auth/Login'));

const MyAppRouter = () => {
  console.log('MyAppRouter');
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <Switch>
        <Route exact path="/app" component={Home} />
        <Route exact path="/app/customer/list" component={Customer} />
        <Route excat path="/app/bime/:cId/list" component={Bime} />
        <Route exact path="/app/ghest/:bId/list" component={Ghest} />
      </Switch>
    </>
  );
};

export default MyAppRouter;
