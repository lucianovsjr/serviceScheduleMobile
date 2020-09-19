import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { parseISO, differenceInMinutes, set } from 'date-fns';
import { useSelector } from 'react-redux';

import api from '../../services/api';
import { hourFormat } from '../../mixen/reqFormat';

import Background from '../../components/Background';
import { ContainerFullHorizontal } from '../../components/Container';
import { Form, Line, TextButton } from '../../components/Form';

import { Submit, Cancel } from './styles';

export default function MyCalendarAppointment() {
  const [looseClient, setLooseClient] = useState('');
  const [date, setDate] = useState(new Date(0));
  const [hoursStart, setHoursStart] = useState(new Date());
  const [hoursEnd, setHoursEnd] = useState(new Date);
  const [schedule, setSchedule] = useState(0);
  const [provider, setProvider] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    async function loadingAppointment(id) {
      const response = await api.get(`appointment/${id}/`);

      if (response.status === 200) {
        const {
          date_time: date,
          hours_start: hoursStart,
          hours_end: hoursEnd,
          user_name: userName,
          loose_client: looseClient,
          schedule,
          provider
        } = response.data;

        // setLooseClient(userName ? userName : looseClient)
        setLooseClient('');
        setDate(parseISO(date));
        setHoursStart(hourFormat(hoursStart, false, true));
        setHoursEnd(hourFormat(hoursEnd, false, true));
        setProvider(provider);
        setSchedule(schedule);
      }
    }

    const { idAppointment } = route.params;

    if (idAppointment) {
      setIsUpdate(true);
      loadingAppointment(idAppointment);
    }
  }, []);

  async function handleSubmit() {
    const { idAppointment } = route.params;

    const timeRange = differenceInMinutes(hoursEnd, hoursStart);
    const dateAdjusted = set(date, {
      hours: hoursStart.getHours(),
      minutes: hoursStart.getMinutes(),
      seconds: hoursStart.getSeconds()
    });

    const data = {
      loose_client: looseClient,
      date_time: dateAdjusted,
      time_range: timeRange,
      provider,
      schedule
    };

    if (idAppointment) {
      data.id = idAppointment;
      const response = await api.put(`appointment/${idAppointment}/`, data);

      if (response.status === 200) {
        alert('Salvo com sucesso');
        navigation.goBack();
      }
    } else {
      data.provider = user.id;
      data.schedule = null;
      const response = await api.post('appointment/', data);

      if (response.status === 201) {
        alert('Agendamento criado com sucesso');
        navigation.goBack();
      } else {
        alert(response.data.msg);
      }
    }
  }

  function handleCancel() {
    navigation.goBack();
  }

  return (
    <Background>
      <ContainerFullHorizontal>
      <Form>
          <Line
            icon="face"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setLooseClient}
            value={looseClient}
            placeholder="Cliente avulso"
          />

          <Line
            icon="today"
            notEditable={isUpdate}
            oneDate
            calendar={true}
            value={date}
            setValue={setDate}
          />

          <Line
            icon="schedule"
            notEditable={isUpdate}
            date
            calendar={false}
            value1={hoursStart}
            setValue1={setHoursStart}
            value2={hoursEnd}
            setValue2={setHoursEnd}
          />

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
};
