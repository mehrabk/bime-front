import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, CardContent } from '@material-ui/core';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import DriveEtaTwoToneIcon from '@material-ui/icons/DriveEtaTwoTone';
import EmojiPeopleTwoToneIcon from '@material-ui/icons/EmojiPeopleTwoTone';
import DoneAllTwoToneIcon from '@material-ui/icons/DoneAllTwoTone';

import useReport from 'shared/hooks/ReportHook';

const Report = () => {
  const [report] = useReport();
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xl={3} md={3} xs={6}>
          <Card className="mb-5 card-box card-box-border-bottom border-success">
            <CardContent>
              <div className="text-center">
                <div className="mt-1">
                  <PeopleAltTwoToneIcon />
                </div>
                <div className="mt-3 line-height-sm">
                  <b className="font-size-lg pr-1">{report?.customers}</b>{' '}
                  <span className="text-black-50"> بیمه شده</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xl={3} md={3} xs={6}>
          <Card className="mb-5 card-box card-box-border-bottom border-danger">
            <CardContent>
              <div className="text-center">
                <div className="mt-1">
                  <DriveEtaTwoToneIcon />
                </div>
                <div className="mt-3 line-height-sm">
                  <b className="font-size-lg pr-1">{report?.bimeBadane}</b>{' '}
                  <span className="text-black-50">بیمه بدنه</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xl={3} md={3} xs={6}>
          <Card className="mb-5 card-box card-box-border-bottom border-warning">
            <CardContent>
              <div className="text-center">
                <div className="mt-1">
                  <EmojiPeopleTwoToneIcon />
                </div>
                <div className="mt-3 line-height-sm">
                  <b className="font-size-lg pr-1">{report?.bimeSales}</b>{' '}
                  <span className="text-black-50">بیمه شخص ثالث</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xl={3} md={3} xs={6}>
          <Card className="mb-5 card-box card-box-border-bottom border-info">
            <CardContent>
              <div className="text-center">
                <div className="mt-1">
                  <DoneAllTwoToneIcon />
                </div>
                <div className="mt-3 line-height-sm">
                  <b className="font-size-lg pr-1">{report?.both}</b>{' '}
                  <span className="text-black-50">بیمه شده بدنه و ثالث</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Report;
