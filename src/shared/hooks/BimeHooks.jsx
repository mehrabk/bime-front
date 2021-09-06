import React, { useState, useEffect } from 'react';
import { request } from 'shared/helpers/APIUtils';

export const useBime = (customerId) => {
  const [bimeList, setBimeList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await request().get(`/bime/${customerId}/list`);
        setBimeList(response.data.content);
      } catch (error) {
        console.log(error);
        setErrorMsg('خطا در دریافت اطلاعات لیست بیمه ها');
      }
      setIsLoading(false);
    };
    fetchData();
  }, [customerId]);

  const onUpdateBime = (bime) => {
    if (bimeList.some((b) => b.id === bime.id)) {
      const mapped = bimeList.map((b) => (b.id !== bime.id ? b : bime));
      setBimeList(mapped);
    } else {
      setBimeList([bime, ...bimeList]);
    }
  };

  const onDeleteBime = (bime) => {
    const deleteBime = async () => {
      setIsLoading(true);
      setErrorMsg('');
      try {
        console.log('bime id => ', bime.id);
        const response = await request().delete(`/bime/delete?id=${bime.id}`);
        if (response.data > 0 && bimeList.some((b) => b.id === bime.id)) {
          const newBimeList = bimeList.filter((b) => b.id !== bime.id);
          setBimeList(newBimeList);
        }
      } catch (error) {
        console.log(error);
        setErrorMsg('خطا در حذف بیمه.');
      }
      setIsLoading(false);
    };
    deleteBime();
  };

  return [bimeList, onUpdateBime, onDeleteBime, { errorMsg, isLoading }];
};

export const useBimeItem = (bimeId) => {
  const [bimeItem, setBimeItem] = useState();
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (bimeId > 0) {
        try {
          const response = await request().get(`/bime/info?id=${bimeId}`);
          setBimeItem(response.data);
          console.log(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setErrorMsg('خطا در دریافت اطلاعات بیمه.');
          setBimeItem();
        }
      } else {
        setBimeItem();
      }
      //   setIsLoading(false);
    };
    fetchData();
  }, [bimeId]);

  return [bimeItem, { errorMsg, isLoading }];
};
