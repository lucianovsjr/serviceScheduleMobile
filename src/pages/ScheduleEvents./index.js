import React, { useState, useEffect } from 'react';

import { useNavigation, useIsFocused, useRoute } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';
import { dateFormat, hourFormat } from '../../mixen/reqFormat';

import Background from '../../components/Background';
import { ContainerFullHorizontal } from '../../components/Container';
import List, { Line, LineText, LineCol, LineButton } from '../../components/List';

import { AddSchedule } from './styles';

export default function ScheduleEvents() {
  const [events, setEvents] = useState([]);

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();

  const params = route.params;

  useEffect(() => {
    async function loadingEvents() {
      const response = await api.get(`events/${params.scheduleId}/`);

      if (response.status === 200) {
        setEvents(response.data.map(
          (data) => {

            return {
              ...data,
              weekFormat: data.week_days.reduce((accumlator, currentValor, index) => {
                let dayStr = '';

                if(!!currentValor)
                  switch(index) {
                    case 0: dayStr = 'Dom'; break;
                    case 1: dayStr = 'Seg'; break;
                    case 2: dayStr = 'Ter'; break;
                    case 3: dayStr = 'Qua'; break;
                    case 4: dayStr = 'Qui'; break;
                    case 5: dayStr = 'Sex'; break;
                    case 6: dayStr = 'Sab'; break;
                  }

                if (accumlator && dayStr) return `${accumlator}, ${dayStr}`;
                if (dayStr) return dayStr;

                return accumlator;
              }, ''),
              dateFormat: data.date ? dateFormat(data.date) : '',
              hoursStartFormat: data.hours_start ? hourFormat(data.hours_start, false) : '',
              hoursEndFormat: data.hours_end ? hourFormat(data.hours_end, false) : '',
              scheduleId: data.schedule,
              allDay: data.all_day,
            }
          }
        ));
      }
    }

    if (isFocused) loadingEvents();
  }, [isFocused]);

  return (
    <Background>
      <ContainerFullHorizontal>
        <List
          data={events}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <Line key={item.id}>
              <LineCol hStart>
                <LineText fontSize={16} bold>
                  {item.name}
                </LineText>
                <LineText fontSize={14}>
                  {item.weekFormat ? item.weekFormat : item.dateFormat}
                </LineText>
                <LineText fontSize={14}>
                  {item.allDay
                    ? 'Dia todo'
                    : `${item.hoursStartFormat} - ${item.hoursEndFormat}`
                  }
                </LineText>
              </LineCol>

              <LineButton
                color="#4da6ff"
                onPress={() => navigation.navigate('CreateScheduleEvents', { event: item, scheduleId: item.scheduleId })}>
                <LineText fontSize={16} marginRight={5} fontColor="#fff">
                  Editar
                </LineText>
                <Icon name="edit" size={25} color="#fff"/>
              </LineButton>
            </Line>
          )}
        />

        <AddSchedule
          onPress={() => navigation.navigate('CreateScheduleEvents', { scheduleId: params.scheduleId })}
        />
      </ContainerFullHorizontal>
    </Background>
  );
}
