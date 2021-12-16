import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid } from '@material-ui/core';
import React from 'react';
export default function LoginIntroduction() {
  return (
    <>
      <Grid
        item
        lg={6}
        className="d-flex align-items-center justify-content-center flex-column bg-secondary">
        <div className="p-3">
          <div className="p-4">
            <div className="d-block d-xl-flex">
              <div className="mt-0 mt-xl-1 mb-md-2 mb-lg-0">
                <FontAwesomeIcon
                  icon={['far', 'heart']}
                  className="font-size-xl text-first"
                />
              </div>
              <div className="pl-0 pl-xl-3">
                <div className="text-black font-weight-bold font-size-lg mb-1">
                  Widgets
                </div>
                <p className="mb-0 text-black-50">
                  You can build unlimited layout styles using any of the 500+
                  included components and elements. Powerful, unique template
                  built for React and Material-UI.
                </p>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="d-block d-xl-flex">
              <div className="mt-0 mt-xl-1 mb-md-2 mb-lg-0">
                <FontAwesomeIcon
                  icon={['far', 'lightbulb']}
                  className="font-size-xl text-first"
                />
              </div>
              <div className="pl-0 pl-xl-3">
                <div className="text-black font-weight-bold font-size-lg mb-1">
                  Components
                </div>
                <p className="mb-0 text-black-50">
                  View any of the 5+ live previews we&#39;ve set up to learn why
                  this dashboard template is the last one you&#39;ll ever need!
                </p>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="d-block d-xl-flex">
              <div className="mt-0 mt-xl-1 mb-md-2 mb-lg-0">
                <FontAwesomeIcon
                  icon={['far', 'user']}
                  className="font-size-xl text-first"
                />
              </div>
              <div className="pl-0 pl-xl-3">
                <div className="text-black font-weight-bold font-size-lg mb-1">
                  Elements
                </div>
                <p className="mb-0 text-black-50">
                  You can build unlimited layout styles using any of the 500+
                  included components and elements. Powerful, unique template
                  built for React and Material-UI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Grid>
    </>
  );
}
