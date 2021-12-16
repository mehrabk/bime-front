import {
  CardContent,
  Table,
  TableContainer,
  Typography
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';

import React from 'react';
import { history } from 'shared/helpers/APIUtils';

const tableHeadCells = [
  { id: 'userName', label: 'نام' },
  { id: 'lastName', label: 'نام خانوادگی' },
  { id: 'address', label: 'آدرس' },
  { id: 'phoneNumber', label: 'شماره موبایل' },
  { id: 'identityCode', label: 'شماره ملی' },
  { id: 'actions', label: 'ویرایش/حذف' },
  { id: 'contracts', label: 'تعداد قرارداد' },
  { id: 'contractsActions', label: 'عملیات قراردادها' }
];

export default function CustomerListTable(props) {
  const {
    customerPagedList,
    onEditCustomer,
    onDeleteCustomer,
    onPageChange
  } = props;
  return (
    <>
      <CardContent>
        <div className="table-responsive-md">
          <TableContainer>
            <Table className="table table-borderless table-hover text-nowrap mb-0">
              <thead>
                <tr>
                  {tableHeadCells.map((headCell) => (
                    <th key={headCell.id}>{headCell.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customerPagedList?.content?.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.userName}</td>
                    <td>{customer.lastName}</td>
                    <td>{customer.address}</td>
                    <td>{customer.phoneNumber}</td>
                    <td>{customer.identityCode}</td>
                    <td>
                      <IconButton
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => onEditCustomer(customer.id)}>
                        <EditTwoToneIcon />
                      </IconButton>
                      <IconButton
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => onDeleteCustomer(customer)}>
                        <DeleteForeverTwoToneIcon />
                      </IconButton>
                    </td>
                    <td>
                      <Typography color="secondary">
                        {customer.bimeCount}
                      </Typography>
                    </td>
                    <td>
                      <IconButton
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => {
                          history.push(`/app/bime/${customer.id}/list`);
                        }}>
                        <EditTwoToneIcon variant="primary" />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </div>
      </CardContent>
    </>
  );
}
