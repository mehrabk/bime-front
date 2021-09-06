import axios from 'axios';
import { createBrowserHistory } from 'history';

export const API_ADDRESS = 'http://localhost:8080';
// export const API_ADDRESS = "http://turkmenio.ir:8085";
export const API_BASE_URL = API_ADDRESS + '/api';

export const ACCESS_TOKEN = 'accessToken';
export const PHONE_NUMBER = 'phoneNumber';
export const DEFAULT_PAGE_NUMBER = 0;
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE_SORT = 'id';
export const DEFAULT_PAGINATION_SIZE = 10;
export const DEFAULT_SORT_ORDER = 'asc';

export const PUBLIC_FOLDER_PATH = `${process.env.PUBLIC_URL}/`;

export const history = createBrowserHistory();

export const request = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  const headers = { Authorization: `Bearer ${token}` };
  return axios.create({ baseURL: API_BASE_URL, headers });
};

export const DropzoneRequest = (option) => {
  const body = new FormData();
  body.append('file', option.file);
  return {
    url: `${API_BASE_URL}/upload`,
    body,
    headers: { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` }
  };
};
