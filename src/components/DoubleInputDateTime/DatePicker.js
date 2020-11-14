import React from 'react';

import { Platform } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePicker({ name, show, setShow, date, setDate, calendar }) {
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    currentDate.setSeconds(0);

    setShow(Platform.OS === 'ios');
    if (event.type === 'set') setDate(currentDate);
  };

  return (
    <>
      {show && (
        <DateTimePicker
          key={name}
          value={date}
          mode={calendar ? "date" : "time"}
          is24Hour={true}
          display={calendar ? "calendar" : "clock"}
          onChange={onChange}
        />
      )}
    </>
  );
}
