import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { parseISO, differenceInMinutes, set } from 'date-fns';

import api from '../../services/api';

import Background from '../../components/Background';
import { ContainerFullHorizontal } from '../../components/Container';
import { Form, Line, TextButton } from '../../components/Form';

import { Submit, Cancel } from './styles';

export default function MyCalendarAppointment() {
  const [looseClient, setLooseClient] = useState('');
  const [date, setDate] = useState(new Date(0));
  const [hoursStart, setHoursStart] = useState(new Date());
  const [hoursEnd, setHoursEnd] = useState(new Date);
  const [isUpdate, setIsUpdate] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    async function loadingAppointment(id) {
      const response = await api.get('my-appointments-months-show', { params: { id } });

      if (response.status === 200) {
        const {
          date: resDate,
          hoursStart: resHoursStart,
          hoursEnd: resHoursEnd,
          userName: resUserName,
          looseClient: resLooseClient
        } = response.data;

        setLooseClient(resUserName ? resUserName : resLooseClient)
        setDate(parseISO(resDate));
        setHoursStart(parseISO(resHoursStart));
        setHoursEnd(parseISO(resHoursEnd));
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
      looseClient,
      dateAdjusted,
      timeRange
    };

    if (idAppointment) {
      data.id = idAppointment;
      const response = await api.put('my-appointments-months', data);

      if (response.status === 200) {
        alert('Salvo com sucesso');
        navigation.goBack();
      }
    } else {
      const response = await api.post('my-appointments-months', data);

      if (response.status === 200) {
        alert('Agendamento criado com sucesso');
        navigation.goBack();
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
