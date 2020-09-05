import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { parseISO } from 'date-fns';

import api from '../../services/api';
import { convertWeek } from '../../mixen/week';

import Background from '../../components/Background';
import { ContainerFullHorizontal } from '../../components/Container';
import { Form, Line, TextButton } from '../../components/Form';

import {
  Submit,
  Cancel,
  Delete
} from './styles';

export default function CreateScheduleEvents() {
  const initWeek = [false, false, false, false, false, false, false];

  const [title, setTitle] = useState('');
  const [selectedWeek, setSelectedWeek] = useState(initWeek);
  const [date, setDate] = useState(new Date(0));
  const [hoursStart, setHoursStart] = useState(new Date());
  const [hoursEnd, setHoursEnd] = useState(new Date());
  const [allDay, setAllDay] = useState(false);
  const [isCreate, setIsCreate] = useState(true);

  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params;

  useEffect(() => {
    async function loadingSchedule() {
      if (params && params.eventId) {
        const response = await api.get(`events/edit/${params.eventId}`);

        if (response.status === 200) {
          setTitle(response.data.name);
          setSelectedWeek(convertWeek(response.data.week));
          setDate(parseISO(response.data.date));
          setHoursStart(parseISO(response.data.hoursStart));
          setHoursEnd(parseISO(response.data.hoursEnd));
          setAllDay(response.data.allDay);

          setIsCreate(false);
        }
      }
    }
    loadingSchedule();
  }, []);

  useEffect(() => {
    if (date.getFullYear() !== 1969 && selectedWeek.includes(true)) setSelectedWeek(initWeek);
  }, [date]);

  useEffect(() => {
    if (date.getFullYear() !== 1969 && selectedWeek.includes(true)) setDate(new Date(0));
  }, [selectedWeek]);

  async function handleSubmit() {
    const data = {
      name: title,
      week: selectedWeek,
      date,
      hoursStart,
      hoursEnd,
      allDay
    };

    const response = await (
      isCreate
      ? api.post('events', {...data, scheduleId: params.scheduleId})
      : api.put(`events/edit/${params.eventId}`, data)
    );

    if (response.status === 200) navigation.goBack();
    else alert('Erro');
  }

  function handleCancel() {
    navigation.goBack();
  }

  function handleDelete() {
    Alert.alert(
      'Excluir',
      'Deseja realmente excluir este evento?',
      [
        {
          text: 'Não',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: async () => {
            const response = await api.delete(`events/edit/${params.eventId}`);

            if (response.status === 200) navigation.goBack();
          }
        }
      ],
      { cancelable: false }
    );
  }

  return (
    <Background>
      <ContainerFullHorizontal>
        <Form>
          <Line
            icon="event-busy"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setTitle}
            value={title}
            placeholder="Nome do evento"
          />

          <Line
            icon="date-range"
            week
            selectedWeek={selectedWeek}
            setSelectedWeek={setSelectedWeek}
          />

          <Line
            icon="today"
            oneDate
            calendar={true}
            value={date}
            setValue={setDate}
          />

          <Line
            icon="schedule"
            date
            buttonAllDay
            calendar={false}
            value1={hoursStart}
            setValue1={setHoursStart}
            value2={hoursEnd}
            setValue2={setHoursEnd}
            value3={allDay}
            setValue3={setAllDay}
          />

          <Submit onPress={() => handleSubmit()}>
            <TextButton>Salvar</TextButton>
          </Submit>

          <Cancel onPress={() => handleCancel()}>
            <TextButton>Cancelar</TextButton>
          </Cancel>

          <Delete onPress={() => handleDelete()}>
            <TextButton>Excluir</TextButton>
          </Delete>
        </Form>
      </ContainerFullHorizontal>
    </Background>
  );
}
