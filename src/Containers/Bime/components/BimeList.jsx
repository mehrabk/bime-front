import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  CardContent,
  LinearProgress,
  makeStyles,
  Table,
  CardHeader,
  Tooltip
} from '@material-ui/core';
import TableOptions from 'shared/components/table/TableOptions';
import { useState } from 'react';
import BimeListTable from './BimeListTable';
export default function BimeList(props) {
  const { bimeList, customerId, onAddBime, onEditBime, onDeleteBime } = props;

  return (
    <>
      <Card className="card-box mb-spacing-6-x2">
        <div className="card-header pr-2">
          <div className="card-header--title">لیست قراردادها</div>
        </div>
        <BimeListTable
          bimeList={bimeList}
          customerId={customerId}
          onEditBime={onEditBime}
          onDeleteBime={onDeleteBime}
        />
      </Card>
    </>
  );
}
