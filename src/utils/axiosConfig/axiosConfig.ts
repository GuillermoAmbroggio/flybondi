import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;
axios.defaults.withCredentials = true;
axios.interceptors.request.use((config) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  config.headers['X-Api-Key'] = import.meta.env.VITE_APP_API_KEY;

  return config;
});
