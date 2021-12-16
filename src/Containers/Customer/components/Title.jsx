import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Tooltip } from '@material-ui/core';

const Title = (props) => {
  const { titleIcone, titleHeading, titleDescription, onAddCustomer } = props;
  return (
    <>
      <div className="app-page-title app-page-title--shadow">
        <div>
          <div className="app-page-title--first">
            <div className="app-page-title--iconbox d-70">
              <div className="d-70 d-flex align-items-center justify-content-center display-1">
                {titleIcone}
              </div>
            </div>
            <div className="app-page-title--heading">
              <h1>{titleHeading}</h1>
              <div className="app-page-title--description">
                {titleDescription}
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <Tooltip title="Add new entry">
            <Button
              variant="contained"
              size="small"
              className="d-40 btn-success"
              onClick={onAddCustomer}>
              <span className="btn-wrapper--icon">
                <FontAwesomeIcon icon={['fas', 'plus']} className="opacity-8" />
              </span>
            </Button>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default Title;
