import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import { useNavigation, useIsFocused } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../../services/api';
import { dateFormat, hourFormat } from '../../../mixen/reqFormat';
import { PrimaryColor } from '../../../styleGuide';

import Background from '../../../components/Background';
import { ContainerFullHorizontal } from '../../../components/Container';
import List, {
  Line,
  LineText,
  LineCol,
  LineButton,
  LineIconTwoText,
  LineIconText,
} from '../../../components/List';
import ButtonAdd from '../../../components/ButtonAdd';

export default function CreateSchedule() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const LINE_HEIGHT = 160;

  useEffect(() => {
    async function loadingSchedules() {
      const response = await api.get('schedules/');

      if (response.status === 200) {
        const resSchedules = response.data.map((schedule) => ({
          id: schedule.id.toString(),
          date_start: schedule.date_start,
          date_end: schedule.date_end,
          dateStart: dateFormat(schedule.date_start, false),
          dateEnd: dateFormat(schedule.date_end, false),
          hoursStart: hourFormat(schedule.hours_start, false),
          hoursEnd: hourFormat(schedule.hours_end, false),
          timeRange: schedule.time_range,
        }));
        setSchedules(resSchedules);
      }
      setLoading(false);
    }

    if (isFocused) loadingSchedules();
    else setLoading(true);
  }, [isFocused]);

  return (
    <Background>
      <ContainerFullHorizontal topZero>
        {loading && isFocused ? (
          <ActivityIndicator size="large" color={PrimaryColor} />
        ) : (
          <>
            <List
              data={schedules}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Line key={item.id} height={LINE_HEIGHT}>
                  <LineCol
                    height={LINE_HEIGHT}
                    justifyContent="space-around"
                    hStart
                  >
                    <LineIconTwoText
                      iconName="date-range"
                      text1={item.dateStart}
                      text2={item.dateEnd}
                    />
                    <LineIconTwoText
                      iconName="list"
                      text1={item.hoursStart}
                      text2={item.hoursEnd}
                    />
                    <LineIconText
                      iconName="schedule"
                      text={item.timeRange.toString().concat(' minutos')}
                    />
                  </LineCol>

                  <LineCol height={LINE_HEIGHT}>
                    <LineButton
                      color="#4da6ff"
                      marginBottom={10}
                      onPress={() =>
                        navigation.navigate('CreateScheduleGenerate', {
                          schedule: item,
                        })
                      }
                    >
                      <LineText fontSize={16} marginRight={5} fontColor="#fff">
                        Editar
                      </LineText>
                      <Icon name="edit" size={25} color="#fff" />
                    </LineButton>
                    {/* #4da6ff */}
                    <LineButton
                      color="#ff8c1a"
                      onPress={() =>
                        navigation.navigate('ScheduleEvents', {
                          scheduleId: item.id,
                        })
                      }
                    >
                      <LineText fontSize={16} marginRight={5} fontColor="#fff">
                        Eventos
                      </LineText>
                      <Icon name="event-busy" size={25} color="#fff" />
                    </LineButton>
                  </LineCol>
                </Line>
              )}
            />
            <ButtonAdd route="CreateScheduleGenerate" />
          </>
        )}
      </ContainerFullHorizontal>
    </Background>
  );
}
