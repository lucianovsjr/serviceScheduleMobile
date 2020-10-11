import React, { useState, useEffect, useMemo } from 'react';
import { Alert } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';
import { dateFormat, hourFormat, dayWeekFormat, nameMonthFormat } from '../../mixen/reqFormat';

import Background from '../../components/Background';
import { ContainerFullHorizontal } from '../../components/Container';
import List, { ListHorizontal, Line, LineCol, LineRow, LineText, LineButton } from '../../components/List';
import { CardColumn } from '../../components/Card';

import {
  ContainerHeader,
  ContainerList,
  ButtonCardMonth,
  TextMonth,
  TitleVacancies,
  TextVacancies,
  AddSchedule
} from './styles';

export default function MyCalendar() {
  const INIT_SELECTED_MONTH = '0'

  const [myAppointments, setMyAppointments] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(INIT_SELECTED_MONTH);

  const listBackgroundColor = useMemo(() =>
    appointments.length > 0 ? '#fff' : '#eee'
  , [appointments]);

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    async function loading() {
      const response = await api.get(`providers/months/${user.id}/`);

      if (response.status === 200) {
        setMyAppointments(response.data.map((data) => ({
            ...data,
            year: data.date.substring(0, 4),
            month: data.date.substring(4, 7),
            dateFormat: nameMonthFormat(data.date),
            idDate: format(new Date(
              data.date.substring(0, 4),
              data.date.substring(4, 7),
              1
            ), 'yyyyMM')

          })
        ));
      }
    }

    if (isFocused){
      loading();
      if (selectedMonth !== INIT_SELECTED_MONTH)
        loadingAppointments(
          parseInt(selectedMonth.substring(0, 4)),
          parseInt(selectedMonth.substring(4))-1,
          0,
          true
        );
    }
  }, [isFocused]);

  async function loadingAppointments(year, month, idDate, refresh=false) {

    if (selectedMonth !== idDate || refresh === true) {
      const response = await api.get('appointments/months/', { params: { providerId: user.id, year, month } });

      if (response.status === 200) {
        setAppointments(response.data.map((data) => ({
          ...data,
          hourFormat: hourFormat(data.time, req=false),
          dateFormat: dateFormat(data.date, req=false),
          dayWeek: dayWeekFormat(data.date)
        })))
        if (!refresh)
          setSelectedMonth(idDate);
      }
    } else {
      setAppointments([]);
      setSelectedMonth(INIT_SELECTED_MONTH);
    }
  }

  function handleCancel(id) {
    Alert.alert(
      'Agendamento',
      'Deseja cancelar esse agendamento?',
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
                  status: appointment.id === id ? 'available' : appointment.status
                }
              }));
          }
        }
      ],
      { cancelable: false }
    );
  }

  function navigateAppointment(idAppointment) {
    navigation.navigate('MyCalendarAppointment', { idAppointment })
  }

  return (
    <Background>
      <ContainerFullHorizontal topZero>
        <ContainerHeader>
          <ListHorizontal
            data={myAppointments}
            keyExtractor={item => item.date}
            renderItem={({item}) => (
              <ButtonCardMonth
                key={item.date}
                onPress={() => loadingAppointments(item.year, item.month, item.idDate)}
                selected={selectedMonth===item.idDate}
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
        </ContainerHeader>

        <ContainerList>
          <List
            data={appointments}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <Line>
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
                <LineText fontSize={16} marginLeft={15} fontColor="#000">
                    {item.looseClient}
                  </LineText>
                {item.status === 'available' || item.status === 'canceled'
                  ? <>
                      <LineButton
                      color="#00cc66"
                        onPress={() => navigateAppointment(item.id)}>
                        <LineText fontSize={16} marginRight={5} fontColor="#fff">
                          Agendar
                        </LineText>
                        <Icon name="done" size={25} color="#fff"/>
                      </LineButton>
                    </>
                  : <>
                      <LineButton color="#ff4d4d" onPress={() => handleCancel(item.id)}>
                        <LineText fontSize={16} marginRight={5} fontColor="#fff">
                          Cancelar
                        </LineText>
                        <Icon name="clear" size={25} color="#fff"/>
                      </LineButton>
                    </>
                }
              </Line>
            )}
            style={{flex: 1, backgroundColor: listBackgroundColor}}
          />

          {selectedMonth === INIT_SELECTED_MONTH
            &&  <AddSchedule onPress={() => navigateAppointment()}/>}
        </ContainerList>

      </ContainerFullHorizontal>
    </Background>
  )
}
