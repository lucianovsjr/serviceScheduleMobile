import React, { useState, useEffect, useMemo } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api, { BASE_URL } from '../../services/api';
import { hourFormat, dateFormat, dayWeekFormat, nameMonthFormat } from '../../mixen/reqFormat';
import { PrimaryColor } from '../../styleGuide';

import Background from '../../components/Background';
import { ContainerFullHorizontal } from '../../components/Container';
import List, { ListHorizontal, Line, LineCol, LineRow, LineText, LineButton } from '../../components/List';
import { CardColumn, CardText1 } from '../../components/Card';

import {
  ContainerHeader,
  ContainerList,
  ButtonCardMonth,
  Avatar,
  AvatarName,
  TextMonth,
  TextVacancies,
  TitleVacancies
} from './styles';

export default function SelectProviderMonth({ navigation, route }) {
  const [appointmentsMonth, setAppointmentsMonth] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('0');
  const [loadingTop, setLoadingTop] = useState(true);
  const [loadingBottom, setLoadingBottom] = useState(false);

  const listBackgroundColor = useMemo(() =>
    appointments.length > 0 ? '#fff' : '#eee'
  , [appointments]);

  const isFocused = useIsFocused();

  const { providerId, name, imageName } = route.params;

  useEffect(() => {
    async function loadingProviders() {
      const response = await api.get(`providers/months/${providerId}/`);

      if (response.status === 200) {
        setAppointmentsMonth(response.data.map((data) => ({
          ...data,
          year: data.date.substring(0, 4),
          month: data.date.substring(4, 7),
          dateFormat: nameMonthFormat(data.date),
        })));
      }
      setLoadingTop(false);
    }

    if (isFocused) {
      loadingProviders();
    } else setLoadingTop(true);
  }, [isFocused])

  async function loadingAppointments(year, month, idDate) {
    setLoadingBottom(true);
    const response = await api.get('appointments/months/', { params: { providerId, year, month } });

    if (response.status === 200) {
      setAppointments(response.data.map((data) => ({
        ...data,
        hourFormat: hourFormat(data.time, req=false),
        dateFormat: dateFormat(data.date, req=false),
        dayWeek: dayWeekFormat(data.date)
      })))
      setSelectedMonth(idDate);
    }
    setLoadingBottom(false);
  }

  function handleScheduling(id) {
    Alert.alert(
      'Agendamento',
      'Deseja agendar esse horário?',
      [
        {
          text: 'Não',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: async () => {
            const response = await api.put(`appointments/status/${id}/`);

            if (response.status === 200)
              setAppointments(appointments.map((appointment) => {
                return {
                  ...appointment,
                  status: appointment.id === id ? 'busy' : appointment.status
                }
              }));
          }
        }
      ],
      { cancelable: false }
    );
  }

  return (
    <Background>
      <ContainerFullHorizontal topZero>
        <ContainerHeader>
          <Avatar source={{uri: imageName}}/>
          <AvatarName>{name}</AvatarName>

          {
            loadingTop && isFocused ?
              <ActivityIndicator size="large" color={PrimaryColor} />
            :
              <ListHorizontal
                data={appointmentsMonth}
                keyExtractor={item => item.date}
                renderItem={({item}) => (
                  <ButtonCardMonth
                    key={item.date}
                    onPress={() => loadingAppointments(item.year, item.month, item.date)}
                    selected={selectedMonth===item.date}
                  >
                    <TextMonth>{item.dateFormat}</TextMonth>
                    <CardColumn>
                      <TitleVacancies>Vagas</TitleVacancies>
                      <TextVacancies>{item.vacancies_morning} Manhã</TextVacancies>
                      <TextVacancies>{item.vacancies_afternoon} Tarde</TextVacancies>
                      <TextVacancies>{item.vacancies_night} Noite</TextVacancies>
                    </CardColumn>
                  </ButtonCardMonth>
                )}
                height={'100'}
              />
          }
        </ContainerHeader>

        <ContainerList>
          {
            loadingBottom && isFocused ?
              <ActivityIndicator size="large" color={PrimaryColor} />
            :
              <List
                data={appointments}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <Line>
                    {item.status === 'schedule'
                      ? <>
                          <LineCol>
                            <LineText fontSize={16} marginLeft={15} fontColor="#000">
                              {item.hourFormat}
                            </LineText>
                            <LineText fontSize={14} marginLeft={15} fontColor="#000">
                              {item.dayWeek}
                            </LineText>
                            <LineText fontSize={10} marginLeft={15} fontColor="#000">
                              {item.dateFormat}
                            </LineText>
                          </LineCol>
                          <LineButton
                            color="#00cc66"
                            onPress={() => handleScheduling(item.id)}
                          >
                            <LineText fontSize={16} marginRight={5} fontColor="#fff">
                              Agendar
                            </LineText>
                            <Icon name="done" size={25} color="#fff"/>
                          </LineButton>
                        </>
                      : <>
                          <LineCol>
                            <LineText fontSize={16} marginLeft={15} fontColor="#A9A9A9">
                              {item.hourFormat}
                            </LineText>
                            <LineText fontSize={14} marginLeft={15} fontColor="#A9A9A9">
                              {item.dayWeek}
                            </LineText>
                            <LineText fontSize={10} marginLeft={15} fontColor="#A9A9A9">
                              {item.dateFormat}
                            </LineText>
                          </LineCol>
                          <LineRow>
                            <LineText fontSize={16} marginRight={5} fontColor="#A9A9A9">
                              Ocupado
                            </LineText>
                            <Icon name="work" size={25} color="#A9A9A9"/>
                          </LineRow>
                        </>
                    }
                  </Line>
                )}
                style={{flex:1, backgroundColor: listBackgroundColor}}
              />
          }
        </ContainerList>
      </ContainerFullHorizontal>
    </Background>
  );
}
