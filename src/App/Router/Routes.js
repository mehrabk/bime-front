import { ThemeProvider } from '@material-ui/styles';
import Login from 'Containers/Auth/Login/index';
import { AnimatePresence, motion } from 'framer-motion';
import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
// Layout Blueprints
import {
  CollapsedSidebar,
  LeftSidebar,
  MinimalLayout,
  PresentationLayout
} from '../../layout-blueprints';
import MuiTheme from '../../theme';
import MyAppRouter from './components/MyAppRouter';

// Example Pages
// const Home = lazy(() => import('Containers/Home'));

const Routes = ({ loading }) => {
  console.log('Routes');
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  console.log(loading);
  const pageVariants = {
    initial: {
      opacity: 0
    },
    in: {
      opacity: 1
    },
    out: {
      opacity: 0
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'linear',
    duration: 0.3
  };

  const SuspenseLoading = () => {
    return (
      <>
        <AnimatePresence>
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}>
              <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
                <div className="d-flex align-items-center flex-column px-4">
                  <ClimbingBoxLoader color={'#3c44b1'} loading={true} />
                </div>
                <div className="text-muted font-size-xl text-center pt-3">
                  Please wait while we load the live preview examples
                  <span className="font-size-lg d-block text-dark">
                    This live preview instance can be slower than a real
                    production build!
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  };
  return (
    <ThemeProvider theme={MuiTheme}>
      <AnimatePresence>
        <Suspense fallback={<SuspenseLoading />}>
          {!loading && (
            <Switch>
              <Redirect exact from="/" to="/app" />
              <Route path={['/Overview']}>
                <PresentationLayout>
                  <Switch location={location} key={location.pathname}>
                    <motion.div
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}>
                      {/* <Route path="/Overview" component={Overview} /> */}
                    </motion.div>
                  </Switch>
                </PresentationLayout>
              </Route>

              <Route path={['/app']}>
                {user && user.username && (
                  <LeftSidebar>
                    <Switch location={location} key={location.pathname}>
                      <motion.div
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}>
                        <Route path="/app" component={MyAppRouter} />
                      </motion.div>
                    </Switch>
                  </LeftSidebar>
                )}
                {!user && <Login />}
              </Route>

              <Route
                path={
                  [
                    // '/PageCalendar',
                  ]
                }>
                <CollapsedSidebar>
                  <Switch location={location} key={location.pathname}>
                    <motion.div
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}>
                      {/* <Route path="/PageCalendar" component={PageCalendar} /> */}
                    </motion.div>
                  </Switch>
                </CollapsedSidebar>
              </Route>

              <Route
                path={
                  [
                    // '/PageError404',
                    // '/PageError500',
                    // '/PageError505',
                    // '/login'
                    // '/register',
                    // '/verify',
                    // '/recover',
                    // '/newpass'
                  ]
                }>
                <MinimalLayout>
                  <Switch location={location} key={location.pathname}>
                    <motion.div
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}>
                      <Route
                        path="/login"
                        // component={}
                      />
                    </motion.div>
                  </Switch>
                </MinimalLayout>
              </Route>
            </Switch>
          )}
        </Suspense>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Routes;
