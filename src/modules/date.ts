import dayjs from "dayjs";

dayjs.locale("ja");

type Format = "YYYY/MM/DD";

export const format = (date: Date, format?: Format): string =>
  dayjs(date).format(format);
