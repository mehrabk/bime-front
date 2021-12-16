import { Divider, List, ListItem, Menu } from '@material-ui/core';
import ArrowDownwardTwoToneIcon from '@material-ui/icons/ArrowDownwardTwoTone';
import ArrowUpwardTwoToneIcon from '@material-ui/icons/ArrowUpwardTwoTone';
import RadioButtonCheckedTwoToneIcon from '@material-ui/icons/RadioButtonCheckedTwoTone';
import RadioButtonUncheckedTwoToneIcon from '@material-ui/icons/RadioButtonUncheckedTwoTone';
import React from 'react';
export default function TableOptions(props) {
  const {
    anchorEl,
    handleClose,
    itemPagedList,
    onSizeChange,
    onOrderChange
  } = props;
  return (
    <>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorEl)}
        classes={{ list: 'p-0' }}
        onClose={handleClose}>
        <div style={{ right: '5px', position: 'absolute' }}>تعداد نتایج</div>
        <List component="div">
          <ListItem
            style={{ marginTop: '20px' }}
            component="a"
            button
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              onSizeChange(10);
            }}>
            <div>
              {itemPagedList?.size === 10 && <RadioButtonCheckedTwoToneIcon />}
              {(!itemPagedList || itemPagedList?.size !== 10) && (
                <RadioButtonUncheckedTwoToneIcon />
              )}
              <span className="font-size-md">
                <b>۱۰</b> تعداد در هر صفحه
              </span>
            </div>
          </ListItem>
          <ListItem
            component="a"
            button
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              onSizeChange(20);
            }}>
            <div>
              {itemPagedList?.size === 20 && <RadioButtonCheckedTwoToneIcon />}
              {(!itemPagedList || itemPagedList?.size !== 20) && (
                <RadioButtonUncheckedTwoToneIcon />
              )}
              <span className="font-size-md">
                <b>۲۰</b> تعداد در هر صفحه
              </span>
            </div>
          </ListItem>
          <Divider />
          <div style={{ right: '5px', position: 'absolute' }}>مرتب سازی</div>
        </List>
        <List component="div">
          <ListItem
            style={{ marginTop: '10px' }}
            component="a"
            button
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              onOrderChange('asc');
            }}>
            <div>
              <ArrowUpwardTwoToneIcon />
            </div>
            <span>صعودی</span>
          </ListItem>
          <ListItem
            component="a"
            button
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              onOrderChange('desc');
            }}>
            <div>
              <ArrowDownwardTwoToneIcon />
            </div>
            <span>نزولی</span>
          </ListItem>
        </List>
      </Menu>
    </>
  );
}
