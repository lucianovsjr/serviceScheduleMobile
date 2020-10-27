import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import { useNavigation, useIsFocused } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';
import { dateFormat, hourFormat } from '../../mixen/reqFormat';
import { PrimaryColor } from '../../styleGuide';

import Background from '../../components/Background';
import { ContainerFullHorizontal } from '../../components/Container';
import List, { Line, LineText, LineCol, LineButton } from '../../components/List';
import ButtonAdd from '../../components/ButtonAdd';

export default function CreateSchedule() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadingSchedules() {
      const response = await api.get('schedules/');

      if (response.status === 200) {
        const resSchedules = response.data.map(
          (schedule) => ({
              id: schedule.id.toString(),
              dateStart: dateFormat(schedule.date_start, false),
              dateEnd: dateFormat(schedule.date_end, false),
              hoursStart: hourFormat(schedule.hours_start, false),
              hoursEnd: hourFormat(schedule.hours_end, false),
              timeRange: schedule.time_range,
            })
        );
        setSchedules(resSchedules);
      }
      setLoading(false);
    }

    if(isFocused) loadingSchedules();
    else setLoading(true);
  }, [isFocused]);

  return (
    <Background>
      <ContainerFullHorizontal>
        {
          loading && isFocused ?
            <ActivityIndicator size="large" color={PrimaryColor} />
          :
            <>
              <List
                data={schedules}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <Line key={item.id}>
                    <LineCol hStart>
                      <LineText fontSize={16} bold>
                        {item.dateStart} - {item.dateEnd}
                      </LineText>
                      <LineText fontSize={14} marginLeft={20}>
                        {item.hoursStart} - {item.hoursEnd}
                      </LineText>
                      <LineText fontSize={14} marginLeft={40}>
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
              <ButtonAdd route="CreateScheduleGenerate" />
            </>
        }

      </ContainerFullHorizontal>
    </Background>
  );
}
