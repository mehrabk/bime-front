import { useEffect, useState } from 'react';
import { request } from 'shared/helpers/APIUtils';

export const useCustomer = (page, size, query, order, sort) => {
  const [customerPagedList, setCustomerPagedList] = useState();
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true);
      try {
        const response = await request().get(
          `/customer/list?query=${query}&page=${page}&size=${size}&orderBy=${sort}&order=${order}`
        );
        setCustomerPagedList(response.data);
        console.log(response.data);
      } catch (error) {
        setErrorMsg('خطا در دریافت اطلاعات مشتری ها');
      }
      setIsLoading(false);
    };
    fetchCustomers();
  }, [page, size, query, order, sort]);

  const onUpdateCustomer = (customerItem) => {
    if (customerPagedList.content.some((c) => c.id === customerItem.id)) {
      const mapped = customerPagedList.content.map((c) =>
        c.id !== customerItem.id ? c : customerItem
      );
      setCustomerPagedList({ ...customerPagedList, content: mapped });
    } else {
      setCustomerPagedList({
        ...customerPagedList,
        content: [customerItem, ...customerPagedList.content]
      });
    }
  };

  const onDeleteCustomer = (customerItem) => {
    const deleteCustomer = async () => {
      setIsLoading(true);
      setErrorMsg('');
      try {
        const response = await request().delete(
          `/customer/delete?id=${customerItem.id}`
        );
        if (
          response.data > 0 &&
          customerPagedList.content.some((c) => c.id === customerItem.id)
        ) {
          const newCustomers = customerPagedList.content.filter(
            (c) => c.id !== customerItem.id
          );
          console.log(customerItem);
          setCustomerPagedList({ ...customerPagedList, content: newCustomers });
        }
      } catch (error) {
        setErrorMsg('خطا در حذف مشتری');
      }
      setIsLoading(false);
    };
    deleteCustomer();
  };

  return [
    customerPagedList,
    onUpdateCustomer,
    onDeleteCustomer,
    { errorMsg, isLoading }
  ];
};

export const useCustomerItem = (customerId) => {
  const [customerItem, setCustomerItem] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      setIsLoading(true);
      if (customerId > 0) {
        try {
          const response = await request().get(
            `/customer/info?id=${customerId}`
          );
          setCustomerItem(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setErrorMsg('خطا در دریافت اطلاعات مشتری');
          setCustomerItem();
        }
      } else {
        setCustomerItem();
      }
    };
    fetchCustomer();
  }, [customerId]);

  return [customerItem, { errorMsg, isLoading }];
};
