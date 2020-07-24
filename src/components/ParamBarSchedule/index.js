import React, { useState, useMemo } from 'react';
import { Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, isBefore, addMinutes } from 'date-fns';

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
  dateStart,
  setDateStart,
  dateEnd,
  setDateEnd,
  serviceTime,
  setServiceTime,
  setLoadingCalendar,
  hours,
  setHours,
  isTemplate
}) {
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const dateStartFormat = useMemo(() => format(dateStart, 'HH:mm'));
  const dateEndFormat = useMemo(() => format(dateEnd, 'HH:mm'));

  function handleLoading() {
    let datasHours = [];
    let dateCard = dateStart;
    const timeMinutes = parseInt(serviceTime);

    setLoadingCalendar(true);

    while (isBefore(dateCard, dateEnd)) {
      datasHours.push({
        date: dateCard,
        time: format(dateCard, 'HH:mm'),
        available: true
      });

      dateCard = addMinutes(dateCard, timeMinutes);
    }

    setHours(datasHours);
    setLoadingCalendar(false);
  }

  async function handlePublished() {
    const datasHours = hours.map(hour => ({ date: hour.date }));

    const responseTemplate = await api.post('/templates', { serviceTime, dateStart, dateEnd });
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
          <Text>{dateStartFormat}</Text>
        </Hours>
        <TimePicker
          name="dateStart"
          show={showStart}
          setShow={setShowStart}
          date={dateStart}
          setDate={setDateStart}
        />

        <Hours onPress={() => !isTemplate && setShowEnd(!showEnd)}>
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
