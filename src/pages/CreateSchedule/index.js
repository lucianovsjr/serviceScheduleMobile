import React, { useState, useEffect } from 'react';

import { useNavigation, useIsFocused } from '@react-navigation/native';

import { parseISO, format } from 'date-fns';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import Background from '../../components/Background';
import { ContainerFullHorizontal } from '../../components/Container';
import List, { Line, LineText, LineCol, LineButton } from '../../components/List';

import { AddSchedule } from './styles';

export default function CreateSchedule() {
  const [schedules, setSchedules] = useState([]);

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadingSchedules() {
      const response = await api.get('schedules');

      if (response.status === 200) {
        const resSchedules = response.data.map(
          (schedule) => ({
              id: schedule.id.toString(),
              dateStart: parseISO(schedule.date_start).getFullYear() > 2000
                ? format(parseISO(schedule.date_start), 'dd/MM/yyyy')
                : '',
              dateEnd: format(parseISO(schedule.date_end), 'dd/MM/yyyy'),
              hoursStart: format(parseISO(schedule.hours_start), 'HH:mm'),
              hoursEnd: format(parseISO(schedule.hours_end), 'HH:mm'),
              timeRange: schedule.time_range,
            })
        );
        setSchedules(resSchedules);
      }
    }

    if(isFocused) loadingSchedules();
  }, [isFocused]);

  return (
    <Background>
      <ContainerFullHorizontal>
        <List
          data={schedules}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Line key={item.id}>
              <LineCol>
                <LineText fontSize={16} bold>
                  {item.dateStart} - {item.dateEnd}
                </LineText>
                <LineText fontSize={14}>
                  {item.hoursStart} - {item.hoursEnd}
                </LineText>
                <LineText fontSize={14}>
                  {item.timeRange}m
                </LineText>
              </LineCol>

              {/* #4da6ff */}
              <LineButton
                color="#ff8c1a"
                onPress={() => navigation.navigate('ScheduleEvents', { scheduleId: item.id })}>
                <LineText fontSize={16} marginRight={5} fontColor="#fff">
                  Eventos
                </LineText>
                <Icon name="event-busy" size={25} color="#fff"/>
              </LineButton>
            </Line>
          )}
        />

        <AddSchedule
          onPress={() => navigation.navigate('CreateScheduleGenerate')}
        />
      </ContainerFullHorizontal>
    </Background>
  );
}
