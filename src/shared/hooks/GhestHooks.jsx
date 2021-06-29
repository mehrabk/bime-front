import React, { useEffect, useState } from 'react';
import { request } from 'shared/helpers/APIUtils';

export const useGhest = (bimeId, size, page, sort, order) => {
  const [ghestList, setGhestList] = useState();
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  console.log(bimeId);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await request().get(
          `/bime/${bimeId}/getGhestList?page=${page}&size=${size}&sort=${sort},${order}`
        );
        setGhestList(response.data.content);
      } catch (error) {
        console.log(error);
        setErrorMsg('خطا در دریافت اطلاعات اقساط');
      }
      setIsLoading(false);
    };
    fetchData();
  }, [bimeId, size, page, sort, order]);

  const onUpdateGhest = (ghestItem) => {
    if (ghestList.some((gh) => gh.id === ghestItem.id)) {
      const mapped = ghestList.map((gh) =>
        gh.id !== ghestItem.id ? gh : ghestItem
      );
      setGhestList(mapped);
    } else {
      setGhestList([ghestItem, ...ghestList]);
    }
  };

  const onDeleteGhest = (ghestItem) => {
    const deleteGhest = async () => {
      setIsLoading(true);
      setErrorMsg('');
      try {
        const response = await request().delete(
          `/ghest/delete?id=${ghestItem.id}`
        );
        if (
          response.data > 0 &&
          ghestList.some((gh) => gh.id === ghestItem.id)
        ) {
          const newGhestList = ghestList.filter((gh) => gh.id !== ghestItem.id);
          setGhestList(newGhestList);
        }
      } catch (error) {
        console.log(error);
        setErrorMsg('خطا در حذف قسط.');
      }
      setIsLoading(false);
    };
    deleteGhest();
  };

  return [ghestList, onUpdateGhest, onDeleteGhest, { errorMsg, isLoading }];
};

export const useGhestItem = (ghestId) => {
  const [ghestItem, setGhestItem] = useState();
  const [errorMsg, setErrormsg] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (ghestId > 0) {
        setIsLoading(true);
        try {
          const response = await request().get(`/ghest/info?id=${ghestId}`);
          setGhestItem(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setErrormsg('خطا در دریافت اطلاعات قسط');
          setGhestItem();
        }
      } else {
        setGhestItem();
      }
    };
    fetchData();
  }, [ghestId]);

  return [ghestItem, { errorMsg, isLoading }];
};
