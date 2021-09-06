import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Tooltip } from '@material-ui/core';
import React, { useState } from 'react';
import TableOptions from 'shared/components/table/TableOptions';
import CustomerListTable from './CustomerListTable';

export default function CustomerList(props) {
  const {
    onAddCustomer,
    onEditCustomer,
    onDeleteCustomer,
    customerPagedList,
    isLoading,
    onPageChange,
    onSizeChange,
    onOrderChange,
    order,
    onSearch
  } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Card className="card-box mb-spacing-6-x2">
        <div className="card-header pr-2">
          <div className="card-header--title">لیست مشتریان</div>
          <div className="card-header--actions">
            <Tooltip title="Refresh">
              <Button
                onClick={handleClick}
                size="small"
                className="btn-neutral-primary">
                <FontAwesomeIcon icon={['fas', 'cog']} spin />
              </Button>
            </Tooltip>
          </div>
        </div>
        <CustomerListTable
          customerPagedList={customerPagedList}
          onEditCustomer={onEditCustomer}
          onDeleteCustomer={onDeleteCustomer}
          onPageChange={onPageChange}
        />
      </Card>

      <TableOptions
        anchorEl={anchorEl}
        handleClose={handleClose}
        itemPagedList={customerPagedList}
        onSizeChange={onSizeChange}
        onOrderChange={onOrderChange}
      />
    </>
  );
}
