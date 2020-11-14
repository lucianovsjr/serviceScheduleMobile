import React, { useState, useMemo } from 'react';
import { Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, isBefore, addMinutes, startOfWeek, endOfWeek, set, addDays, getDay } from 'date-fns';

import api from '../../services/api';

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

function ParamBarSchedule({
  hourStart,
  sethourStart,
  hourEnd,
  sethourEnd,
  serviceTime,
  setServiceTime,
  setLoadingCalendar,
  hours,
  setHours,
  isTemplate
}) {
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const hourStartFormat = useMemo(() => format(hourStart, 'HH:mm'));
  const hourEndFormat = useMemo(() => format(hourEnd, 'HH:mm'));

  function handleLoading() {
    const timeMinutes = parseInt(serviceTime);
    const dateStart = startOfWeek(hourStart);
    const dateEnd = endOfWeek(hourStart);

    let datasHours = [];
    let hourStartDayCard = set(
      dateStart,
      {
        hours: hourStart.getHours(),
        minutes: hourStart.getMinutes(),
        seconds: 0,
        milliseconds: 0,
      }
    );
    let hourEndDayCard = set(
      dateStart,
      {
        hours: hourEnd.getHours(),
        minutes: hourEnd.getMinutes(),
        seconds: 0,
        milliseconds: 1,
      }
    );
    let hourCard = hourStartDayCard;

    setLoadingCalendar(true);

    while (isBefore(hourStartDayCard, dateEnd)) {
      while (isBefore(hourCard, hourEndDayCard)) {
        datasHours.push({
          date: hourCard,
          time: format(hourCard, 'HH:mm'),
          available: true,
          click: () => {},
          day: getDay(hourCard),
        });

        hourCard = addMinutes(hourCard, timeMinutes);
      }

      hourStartDayCard = addDays(hourStartDayCard, 1);
      hourEndDayCard = addDays(hourEndDayCard, 1);
      hourCard = hourStartDayCard;
    }

    setHours(datasHours);
    setLoadingCalendar(false);
  }

  async function handlePublished() {
    const datasHours = hours.map(hour => ({ date: hour.date }));

    const responseTemplate = await api.post('/templates', { serviceTime, hourStart, hourEnd });
    const { id: templateId } = responseTemplate.data;

    const responseHours = await api.post('/appointments', { datasHours, templateId });

    if (responseTemplate.status === 200 && responseHours.status === 200) {
      alert('Publicado com sucesso');
    } else {
      alert('Erro na publicação');
    }
  }

  return (
    <Container>
      <Content>
        <Text>Horário: </Text>
        <Hours onPress={() => !isTemplate && setShowStart(!showStart)}>
          <Text>{hourStartFormat}</Text>
        </Hours>
        <TimePicker
          name="hourStart"
          show={showStart}
          setShow={setShowStart}
          date={hourStart}
          setDate={sethourStart}
        />

        <Hours onPress={() => !isTemplate && setShowEnd(!showEnd)}>
          <Text>{hourEndFormat}</Text>
        </Hours>
        <TimePicker
          name="hourEnd"
          show={showEnd}
          setShow={setShowEnd}
          date={hourEnd}
          setDate={sethourEnd}
        />

        <ServiceTimeText>Tempo: </ServiceTimeText>
        <ServiceTimeButton
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setServiceTime}
          keyboardType="number-pad"
          value={serviceTime}
          editable={!isTemplate}
        />
      </Content>

      <Content>
        <ParamBarButton onPress={() => !isTemplate && handleLoading()}>
          <TextButton>Carregar</TextButton>
        </ParamBarButton>
        <ParamBarButton onPress={() => !isTemplate && handlePublished()}>
          <TextButton>Publicar</TextButton>
        </ParamBarButton>
      </Content>
    </Container>
  );
}

export default ParamBarSchedule;
