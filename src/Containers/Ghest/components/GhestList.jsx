import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Tooltip } from '@material-ui/core';
import React, { useState } from 'react';
import TableOptions from 'shared/components/table/TableOptions';
import GhestListTable from './GhestListTable';

export default function GhestList(props) {
  const {
    ghestList,
    customerId,
    onAddGhest,
    onEditeGhest,
    onDeleteGhest,
    onPageChange,
    onSizeChange,
    onOrderChange,
    order
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
          <div className="card-header--title">لیست اقساط</div>
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
        <GhestListTable
          ghestList={ghestList}
          onEditeGhest={onEditeGhest}
          onDeleteGhest={onDeleteGhest}
        />
      </Card>

      <TableOptions
        anchorEl={anchorEl}
        handleClose={handleClose}
        itemPagedList={ghestList}
        onSizeChange={onSizeChange}
        onOrderChange={onOrderChange}
      />
    </>
  );
}
