import dayjs from "dayjs";
import "dayjs/locale/ja";

dayjs.locale("ja");

type Format = "YYYY/MM/DD";

export const format = (date: Date, format?: Format): string =>
  dayjs(date).format(format);
