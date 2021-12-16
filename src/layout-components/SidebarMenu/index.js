import React, { useState } from 'react';

import clsx from 'clsx';

import { Collapse } from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';
import { setSidebarToggleMobile } from 'redux/reducers/ThemeOptions';

import SidebarUserbox from '../SidebarUserbox';

import ChevronLeftTwoToneIcon from '@material-ui/icons/ChevronLeftTwoTone';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import DriveEtaTwoToneIcon from '@material-ui/icons/DriveEtaTwoTone';
import EmojiPeopleTwoToneIcon from '@material-ui/icons/EmojiPeopleTwoTone';
import InsertChartTwoToneIcon from '@material-ui/icons/InsertChartTwoTone';
import BusinessCenterTwoToneIcon from '@material-ui/icons/BusinessCenterTwoTone';
import SecurityTwoToneIcon from '@material-ui/icons/SecurityTwoTone';

const SidebarMenu = (props) => {
  const { setSidebarToggleMobile, sidebarUserbox } = props;

  // const toggleSidebarMobile = () => setSidebarToggleMobile(false);

  const [contractOpen, setContractOpen] = useState(false);
  const toggleContract = (event) => {
    setContractOpen(!contractOpen);
    event.preventDefault();
  };

  return (
    <>
      <PerfectScrollbar>
        {sidebarUserbox && <SidebarUserbox />}
        <div className="sidebar-navigation">
          <div className="sidebar-header">
            <span>امکانات</span>
          </div>
          <ul>
            <li>
              <NavLink to="/app/customer/list">
                <span className="sidebar-icon">
                  <PeopleAltTwoToneIcon />
                </span>
                <span className="sidebar-item-label">مشتریان</span>
              </NavLink>
            </li>
          </ul>
          <div className="sidebar-header">
            <span>قراردادها</span>
          </div>
          <ul>
            <li>
              <NavLink to="/app/contract/sales">
                <span className="sidebar-icon">
                  <EmojiPeopleTwoToneIcon />
                </span>
                <span className="sidebar-item-label">بیمه شخص ثالث</span>
              </NavLink>
            </li>
          </ul>
          <ul>
            <li>
              <NavLink to="/app/contract/badane">
                <span className="sidebar-icon">
                  <DriveEtaTwoToneIcon />
                </span>
                <span className="sidebar-item-label">بیمه بدنه</span>
              </NavLink>
            </li>
          </ul>

          <div className="sidebar-header">
            <span>گزارشات</span>
          </div>
          <ul>
            <li>
              <a
                href="#/"
                onClick={toggleContract}
                className={clsx({ active: contractOpen })}>
                <span className="sidebar-icon">
                  <BusinessCenterTwoToneIcon />
                </span>
                <span className="sidebar-item-label">گزارش قرارداد</span>
                <span className="sidebar-icon-indicator">
                  <ChevronLeftTwoToneIcon />
                </span>
              </a>
              <Collapse in={contractOpen}>
                <ul>
                  <li>
                    <NavLink to="/app/report/sales">بیمه شخص ثالث</NavLink>
                  </li>
                  <li>
                    <NavLink to="/app/report/badane">بیمه بدنه</NavLink>
                  </li>
                </ul>
              </Collapse>
            </li>
            <li>
              <NavLink to="/app/report/chart">
                <span className="sidebar-icon">
                  <InsertChartTwoToneIcon />
                </span>
                <span className="sidebar-item-label">نمودار</span>
              </NavLink>
            </li>
          </ul>
          <div className="sidebar-header">
            <span>ورود</span>
          </div>
          <ul>
            <li>
              <NavLink to="/app/login">
                <span className="sidebar-icon">
                  <SecurityTwoToneIcon />
                </span>
                <span className="sidebar-item-label">ورود به سایت</span>
              </NavLink>
            </li>
          </ul>
          <div className="sidebar-menu-box text-center">
            بیمه پارسیان نمایندگی بندرترکمن
          </div>
        </div>
      </PerfectScrollbar>
    </>
  );
};

const mapStateToProps = (state) => ({
  sidebarUserbox: state.ThemeOptions.sidebarUserbox,

  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile
});

const mapDispatchToProps = (dispatch) => ({
  setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenu);
