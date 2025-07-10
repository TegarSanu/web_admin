export const removeData = (key: string) => {
  return localStorage.removeItem(key);
};

export const setData = (key: string, data: any) => {
  return localStorage.setItem(key, JSON.stringify(data));
};

export const getData = (key: string) => {
  const data: any = localStorage.getItem(key);
  return JSON.parse(data);
};
