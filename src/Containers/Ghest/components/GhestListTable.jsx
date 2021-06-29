import { CardContent, Table, TableContainer } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import moment from 'moment-jalaali';
import React from 'react';
import ImageSlider from 'shared/components/imageSilder/ImageSlider';

const tableHeadCells = [
  { id: 'ghestNumber', label: 'شماره قسط' },
  { id: 'ghestDate', label: 'تاریخ قسط' },
  { id: 'ghestPrice', label: 'مبلغ قسط' },
  { id: 'imageUrl', label: 'مستندات' },
  { id: 'smsStatus', label: 'وضعیت پیامک' },
  { id: 'note', label: 'یادداشت' },
  { id: 'contractsActions', label: 'حذف / ویرایش' }
];
export default function GhestListTable(props) {
  const { ghestList, onEditeGhest, onDeleteGhest } = props;
  return (
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
              {ghestList &&
                ghestList.length > 0 &&
                ghestList.map((ghest) => (
                  <tr key={ghest.id}>
                    <td>{ghest.ghestNumber}</td>
                    <td>{moment(ghest.ghestDate).format('jYYYY/jMM/jDD')}</td>
                    <td>{ghest.ghestPrice}</td>
                    <td>
                      <ImageSlider
                        slides={ghest.imageUrl && JSON.parse(ghest.imageUrl)}
                      />
                    </td>
                    <td>{ghest.smsStatus ? ghest.smsStatus : ''}</td>
                    <td>{ghest.note}</td>
                    <td>
                      <IconButton
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => onEditeGhest(ghest.id)}>
                        <EditTwoToneIcon />
                      </IconButton>
                      <IconButton
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => onDeleteGhest(ghest)}>
                        <DeleteForeverTwoToneIcon />
                      </IconButton>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </TableContainer>
      </div>
    </CardContent>
  );
}
