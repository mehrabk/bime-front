import { ThemeProvider } from '@material-ui/styles';
import Login from 'Containers/Auth/Login/index';
import { AnimatePresence, motion } from 'framer-motion';
import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
// Layout Blueprints
import { LeftSidebar } from '../../layout-blueprints';
import MuiTheme from '../../theme';
import MyAppRouter from './components/MyAppRouter';

const Routes = ({ loading }) => {
  console.log('Routes');
  const location = useLocation();
  const user = useSelector((state) => state.auth);

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
          {!loading && user.isSignedIn && user.username && (
            <Switch>
              <Redirect exact from="/" to="/app/customer/list" />
              <Route path={['/app']}>
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
              </Route>
            </Switch>
          )}
          {!user.isSignedIn && <Login />}
        </Suspense>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Routes;
