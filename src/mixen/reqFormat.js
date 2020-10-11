import { parseISO, format, set } from 'date-fns';
import pt from 'date-fns/locale/pt';

export const dateFormat = (date, req=true) => {
    let returnDate = date;

    if (typeof date === 'string')
        returnDate = parseISO(date);

    if (returnDate.getFullYear() === 1969)
      return null;

    if (req)
      return format(returnDate, "yyyy-MM-dd");
    else
      return format(returnDate, 'dd/MM/yyyy');
}

export const hourFormat = (hour, req=true, reqDate=false) => {
    let returnHour = hour;

    if (typeof hour === 'string') {
      returnHour = set(new Date(), {
        hours: hour.substring(0, 2),
        minutes: hour.substring(3, 5),
        seconds: 0
      });
    }

    if (reqDate)
      return returnHour;

    if (req)
      return format(returnHour, "HH:mm:ss");
    else
      return format(returnHour, 'HH:mm')
}

export const dayWeekFormat = (date) => {
  return format(parseISO(date), 'EEEE', { locale: pt })
}

export const nameMonthFormat = (date) => {
  const year = date.substring(0, 4);
  const month = (parseInt(date.substring(4, 7)) - 1).toString();

  return format(
    new Date(year, month, 1),
    'MMM/yyyy',
    { locale: pt }
  );
}
