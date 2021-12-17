import React, { useEffect, useState } from 'react';

import { request } from 'shared/helpers/APIUtils';

export default function useReport() {
  const [report, setReport] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const response = await request().get('/report/');
        setReport(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return [report];
}
