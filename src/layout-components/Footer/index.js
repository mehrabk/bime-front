import React from 'react';

import clsx from 'clsx';

import { List, ListItem } from '@material-ui/core';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Footer = (props) => {
  const { footerShadow, footerBgTransparent } = props;
  return (
    <>
      <div
        className={clsx('app-footer text-black-50', {
          'app-footer--shadow': footerShadow,
          'app-footer--opacity-bg': footerBgTransparent
        })}>
        {/* <div className="app-footer--first">
          <List
            component="div"
            className="nav-neutral-primary d-flex align-items-center">
            <ListItem
              className="rounded-sm"
              button
              component={NavLink}
              to="/DashboardAnalytics">
              <span>Analytics</span>
            </ListItem>
            <ListItem
              className="rounded-sm"
              button
              component={NavLink}
              to="/DashboardStatistics">
              <span>Statistics</span>
            </ListItem>
            <ListItem
              className="rounded-sm"
              button
              component={NavLink}
              to="/Overview">
              <span>Overview</span>
            </ListItem>
          </List>
        </div> */}
        <div className="app-footer--second">
          by{' '}
          <a
            href="https://turkmenio.ir"
            target="_blank"
            title="turkmenio.ir"
            rel="noopener noreferrer">
            turkmenio.ir
          </a>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  footerShadow: state.ThemeOptions.footerShadow,
  footerBgTransparent: state.ThemeOptions.footerBgTransparent
});

export default connect(mapStateToProps)(Footer);
