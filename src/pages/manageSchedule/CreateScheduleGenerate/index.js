import React, { useState, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';

import api from '../../../services/api';
import { dateFormat, hourFormat } from '../../../mixen/reqFormat';

import Background from '../../../components/Background';
import { ContainerFullHorizontal } from '../../../components/Container';
import { Form, Line, TextButton } from '../../../components/Form';

import { Submit, Cancel, Delete } from './styles';

export default function CreateScheduleGenerate() {
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [hoursStart, setHoursStart] = useState(new Date());
  const [hoursEnd, setHoursEnd] = useState(new Date());
  const [timeRange, setTimeRange] = useState('60');

  const route = useRoute();
  const navigation = useNavigation();

  const { schedule } = route.params;

  useEffect(() => {
    if (schedule) {
      setDateStart(dateFormat(schedule.date_start, false, true));
      setDateEnd(dateFormat(schedule.date_end, false, true));
      setHoursStart(hourFormat(schedule.hoursStart, false, true));
      setHoursEnd(hourFormat(schedule.hoursEnd, false, true));
      setTimeRange(schedule.timeRange.toString());
    }
  }, [schedule]);

  async function handleSubmit() {
    const data = {
      date_start: dateFormat(dateStart),
      date_end: dateFormat(dateEnd),
      hours_start: hourFormat(hoursStart),
      hours_end: hourFormat(hoursEnd),
      time_range: timeRange,
    };

    let resSchedule;
    if (schedule) {
      data.id = schedule.id;
      resSchedule = await api.put(`schedules/${data.id}/`, data);
    } else resSchedule = await api.post('schedules/', data);

    switch (resSchedule.status) {
      case 200:
      case 201:
        navigation.goBack();
        break;
      case 202:
        alert(resSchedule.data.msg);
        break;
      default:
        alert('Erro', resSchedule.data.msg);
    }
  }

  async function handleCancel() {
    navigation.goBack();
  }

  return (
    <Background>
      <ContainerFullHorizontal>
        <Form>
          <Line
            icon="date-range"
            date
            calendar
            value1={dateStart}
            value2={dateEnd}
            setValue1={setDateStart}
            setValue2={setDateEnd}
          />

          <Line
            icon="list"
            date
            calendar={false}
            value1={hoursStart}
            value2={hoursEnd}
            setValue1={setHoursStart}
            setValue2={setHoursEnd}
          />

          <Line
            icon="schedule"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setTimeRange}
            keyboardType="number-pad"
            value={timeRange}
          />

          <Submit onPress={() => handleSubmit()}>
            <TextButton>Salvar</TextButton>
          </Submit>

          <Cancel onPress={() => handleCancel()}>
            <TextButton>Cancelar</TextButton>
          </Cancel>

          {schedule && (
            <Delete onPress={() => alert('delete')}>
              <TextButton>Excluir</TextButton>
            </Delete>
          )}
        </Form>
      </ContainerFullHorizontal>
    </Background>
  );
}
