import React from 'react';

import { ContainerHeader, DayButton, DayText, HourList, ButtonCardHour, Title } from './styles';

function CalendarSchedule({
  dateStart,
  dateEnd,
  serviceTime,
  loadingCalendar,
  setLoadingCalendar,
  hours,
  setHours
}) {

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
        <ButtonCardHour enabled={item.available}>
          <Title>{item.time}</Title>
        </ButtonCardHour>
      )}
    />
    </>
  );
}

export default CalendarSchedule;
