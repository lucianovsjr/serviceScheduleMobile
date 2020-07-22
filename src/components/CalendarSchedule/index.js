import React, { useState, useEffect } from 'react';

import { format, isBefore, addMinutes } from 'date-fns';

import { ContainerHeader, DayButton, DayText, HourList, CardHour, Title } from './styles';

function CalendarSchedule({ dateStart, dateEnd, serviceTime, loadingCalendar, setLoadingCalendar }) {
  const [hours, setHours] = useState([]);

  useEffect(() => {
    if (loadingCalendar) {
      handleLoading();
      setLoadingCalendar(false);
    }
  }, [loadingCalendar])

  function handleLoading() {
    let datasHours = [];
    let dateCard = dateStart;
    const timeMinutes = parseInt(serviceTime);

    while (isBefore(dateCard, dateEnd)) {
      datasHours.push({
        time: format(dateCard, 'HH:mm'),
        available: true,
        value: ''
      });

      dateCard = addMinutes(dateCard, timeMinutes);
    }

    setHours(datasHours);
  }

  return (
    <>
    <ContainerHeader>
      <DayButton onPress={() => {}}>
        <DayText>Domingo</DayText>
      </DayButton>
      <DayButton onPress={() => {}}>
        <DayText>Segunda</DayText>
      </DayButton>
      <DayButton onPress={() => {}}>
        <DayText select>Terça</DayText>
      </DayButton>
      <DayButton onPress={() => {}}>
        <DayText>Quarta</DayText>
      </DayButton>
      <DayButton onPress={() => {}}>
        <DayText>Quinta</DayText>
      </DayButton>
      <DayButton onPress={() => {}}>
        <DayText>Sexta</DayText>
      </DayButton>
      <DayButton onPress={() => {}}>
        <DayText>Sábado</DayText>
      </DayButton>
    </ContainerHeader>

    <HourList
      data={hours}
      keyExtractor={item => item.time}
      renderItem={({item}) => (
        <CardHour enabled={item.available} onPress={() => {}}>
          <Title>{item.time}</Title>
        </CardHour>
      )}
    />
    </>
  );
}

export default CalendarSchedule;
