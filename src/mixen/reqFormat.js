import { parseISO, format, set } from 'date-fns';

export const dateFormat = (date, req=true) => {
    let returnDate = date;

    if (typeof date === 'string')
        returnDate = parseISO(date);

    if (req)
      return format(returnDate, "yyyy-MM-dd");
    else
      return format(returnDate, 'dd/MM/yyyy');
}

export const hourFormat = (hour, req=true) => {
    let returnHour = hour;

    if (typeof hour === 'string') {
      returnHour = set(new Date(), {
        hours: hour.substring(0, 2),
        minutes: hour.substring(3, 5)
      });
    }

    if (req)
      return format(returnHour, "HH:mm:ss");
    else
      return format(returnHour, 'HH:mm')
}
