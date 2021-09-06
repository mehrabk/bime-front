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
  { id: 'bimeNumber', label: 'شماره بیمه' },
  { id: 'yektaCode', label: 'کد یکتا' },
  { id: 'type', label: 'نوع قرارداد' },
  // {id: "createdAt", label: "تاریخ عقد قرارداد"},
  // {id: "updatedAt", label: "تاریخ ویرایش قرارداد"},
  { id: 'pishPardakht', label: 'پیش پرداخت' },
  { id: 'note', label: 'توضیحات' },
  { id: 'actions', label: 'ویرایش/حذف' },
  { id: 'ghestCount', label: 'تعداد قسط' },
  { id: 'installment', label: 'اقساط' }
];

export default function BimeListTable(props) {
  const { bimeList, customerId, onEditBime, onDeleteBime } = props;
  console.log(bimeList);
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
                {bimeList &&
                  bimeList.length > 0 &&
                  bimeList.map((bime) => (
                    <tr key={bime.id}>
                      <td>{bime.bimeNumber}</td>
                      <td>{bime.yektaCode}</td>
                      <td>{bime.type && bime.type.label}</td>
                      <td>{bime.pishPardakht}</td>
                      <td>{bime.note}</td>
                      <td>
                        <IconButton
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => onEditBime(bime)}>
                          <EditTwoToneIcon />
                        </IconButton>
                        <IconButton
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => onDeleteBime(bime)}>
                          <DeleteForeverTwoToneIcon />
                        </IconButton>
                      </td>
                      <td>
                        <Typography color="secondary">
                          {bime.ghestCount}
                        </Typography>
                      </td>
                      <td>
                        <IconButton 
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => {
                            history.push(`/app/ghest/${bime.id}/list`);
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
