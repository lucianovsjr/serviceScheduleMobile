import React, { useState, useMemo } from 'react';
import { Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

import { Container, Content, Text, Hours, ServiceTimeText, ServiceTimeButton, ParamBarButton, TextButton } from './styles';

function TimePicker({ name, show, setShow, date, setDate, setLoadingCalendar }) {
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  return (
    <>
      {show && (
        <DateTimePicker
          key={name}
          value={date}
          mode="time"
          is24Hour={true}
          display="clock"
          onChange={onChange}
        />
      )}
    </>
  );
}

function ParamBarSchedule({ dateStart, setDateStart, dateEnd, setDateEnd, serviceTime, setServiceTime, setLoadingCalendar }) {
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const dateStartFormat = useMemo(() => format(dateStart, 'HH:mm'));
  const dateEndFormat = useMemo(() => format(dateEnd, 'HH:mm'));

  return (
    <Container>
      <Content>
        <Text>Horário: </Text>
        <Hours onPress={() => setShowStart(!showStart)}>
          <Text>{dateStartFormat}</Text>
        </Hours>
        <TimePicker
          name="dateStart"
          show={showStart}
          setShow={setShowStart}
          date={dateStart}
          setDate={setDateStart}
        />

        <Hours onPress={() => setShowEnd(!showEnd)}>
          <Text>{dateEndFormat}</Text>
        </Hours>
        <TimePicker
          name="dateEnd"
          show={showEnd}
          setShow={setShowEnd}
          date={dateEnd}
          setDate={setDateEnd}
        />

        <ServiceTimeText>Tempo: </ServiceTimeText>
        <ServiceTimeButton
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setServiceTime}
          keyboardType="number-pad"
          value={serviceTime}
        />
      </Content>

      <Content>
        <ParamBarButton onPress={() => setLoadingCalendar(true)}>
          <TextButton>Carregar</TextButton>
        </ParamBarButton>
        <ParamBarButton onPress={() => {}}>
          <TextButton>Publicar</TextButton>
        </ParamBarButton>
      </Content>
    </Container>
  );
}

export default ParamBarSchedule;
