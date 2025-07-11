import moment from "moment";

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

export const utcDateTime = (date: any) => {
  return moment.utc(date).local().locale("id").format("DD MMMM YYYY, HH:mm:ss");
};

export const utcDate = (date: any) => {
  return moment.utc(date).local().locale("id").format("DD MMMM YYYY");
};

export const formatRupiah = (value: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};
