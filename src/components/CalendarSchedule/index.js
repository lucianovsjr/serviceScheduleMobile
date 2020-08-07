import React, { useState, useEffect } from 'react';

import { ContainerHeader, DayButton, DayText, HourList, ButtonCardHour, Title } from './styles';

function CalendarSchedule({
  hours,
}) {
  const [selectDay, setSelectDay] = useState(0);
  const [hoursDay, setHoursDay] = useState([]);

  useEffect(() => {
    setHoursDay(
      hours.filter((hour) => hour.day === selectDay)
    );
  }, [selectDay, hours]);

  return (
    <>
    <ContainerHeader>
      <DayButton onPress={() => setSelectDay(0)}>
        <DayText select={selectDay===0}>Domingo</DayText>
      </DayButton>
      <DayButton onPress={() => setSelectDay(1)}>
        <DayText select={selectDay===1}>Segunda</DayText>
      </DayButton>
      <DayButton onPress={() => setSelectDay(2)}>
        <DayText select={selectDay===2}>Terça</DayText>
      </DayButton>
      <DayButton onPress={() => setSelectDay(3)}>
        <DayText select={selectDay===3}>Quarta</DayText>
      </DayButton>
      <DayButton onPress={() => setSelectDay(4)}>
        <DayText select={selectDay===4}>Quinta</DayText>
      </DayButton>
      <DayButton onPress={() => setSelectDay(5)}>
        <DayText select={selectDay===5}>Sexta</DayText>
      </DayButton>
      <DayButton onPress={() => setSelectDay(6)}>
        <DayText select={selectDay===6}>Sábado</DayText>
      </DayButton>
    </ContainerHeader>

    <HourList
      data={hoursDay}
      keyExtractor={item => item.time}
      renderItem={({item}) => (
        <ButtonCardHour
          enabled={item.available}
          onPress={item.click}
        >
          <Title>{item.time}</Title>
        </ButtonCardHour>
      )}
    />
    </>
  );
}

export default CalendarSchedule;
