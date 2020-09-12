import React, { useState } from 'react';

import api from '../../services/api';
import { dateFormat, hourFormat } from '../../mixen/reqFormat';

import Background from '../../components/Background';
import { ContainerFullHorizontal } from '../../components/Container';
import { Form, Line, TextButton } from '../../components/Form';

import { Submit, Cancel } from './styles';

export default function CreateScheduleGenerate({ navigation }) {
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [hoursStart, setHoursStart] = useState(new Date());
  const [hoursEnd, setHoursEnd] = useState(new Date());
  const [timeRange, setTimeRange] = useState('60');

  async function handleSubmit() {
    const resSchedule = await api.post('schedules/', {
      date_start: dateFormat(dateStart),
      date_end: dateFormat(dateEnd),
      hours_start: hourFormat(hoursStart),
      hours_end: hourFormat(hoursEnd),
      time_range: timeRange
    });

    switch(resSchedule.status) {
      case 200: case 201:
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
    <Background >
      <ContainerFullHorizontal>
        <Form>
          <Line
            icon="date-range"
            date
            calendar
            value1={dateStart}
            value2={dateEnd}
            setValue1={setDateStart}
            setValue2={setDateEnd}>
          </Line>

          <Line
            icon="list"
            date
            calendar={false}
            value1={hoursStart}
            value2={hoursEnd}
            setValue1={setHoursStart}
            setValue2={setHoursEnd}>
          </Line>

          <Line
            icon="schedule"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setTimeRange}
            keyboardType="number-pad"
            value={timeRange}>
          </Line>

          <Submit onPress={() => handleSubmit()}>
            <TextButton>Salvar</TextButton>
          </Submit>

          <Cancel onPress={() => handleCancel()}>
            <TextButton>Cancelar</TextButton>
          </Cancel>
        </Form>
      </ContainerFullHorizontal>
    </Background>
  );
}
