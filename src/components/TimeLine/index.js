import React, { useState, useMemo } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import Separator from '../../components/Separator';

import { Line, Card, CardHour, TextHour, TimeLine, LineIcon, CardMonth, TextMonth, DateMonth } from './styles';

export function TitleMonth({ title, dateFormat }) {
  return (
    <CardMonth>
      <TextMonth>{title}</TextMonth>
      <DateMonth>{dateFormat}</DateMonth>
      <Separator />
    </CardMonth>
  );
}

export function RowMonth({id, hour, status, isEnd=false}) {
  const [iconStatus, setIconStatus] = useState(status);

  const iconProperties = useMemo(() => {
    if (iconStatus === 'marked') return {name: 'done', backColorIcon: '#2e8b57', size: 45};
    if (iconStatus === 'canceled') return {name: 'close', backColorIcon: '#B22222', size: 45};
    if (iconStatus === 'unavailable') return {name: 'person', backColorIcon: '#708090', size: 42};
    if (iconStatus === 'available') return {name: 'add', backColorIcon: '#4682B4', size: 45};
  }, [iconStatus]);

  function handleClick() {
    if (iconStatus === 'marked') {
      Alert.alert(
        'Confirmação',
        'Deseja cancelar o horário?',
        [
          {
            text: 'Sim',
            onPress: async () => {
              const response = await api.put('select-appointments-month', { id, newStatus: 'canceled' });

              if (response.status === 200)
                setIconStatus('canceled');
            }
          },
          {
            text: 'Não',
            onPress: () => {}
          }
        ]
      );
    }

    if (iconStatus === 'available') Alert.alert(
      'Confirmação',
      'Deseja agendar o horário?',
      [
        {
          text: 'Sim',
          onPress: async () => {
            const response = await api.put('select-appointments-month', { id, newStatus: 'marked' });

            if (response.status === 200)
              setIconStatus('marked');
          }
        },
        {
          text: 'Não',
          onPress: () => {}
        }
      ]
    );
  }

  return (
    <Card>
      <CardHour>
        <TextHour>{hour}</TextHour>
      </CardHour>

      <TimeLine>
        <LineIcon backColorIcon={iconProperties.backColorIcon} onPress={() => handleClick()}>
          <Icon name={iconProperties.name} size={iconProperties.size} color="#eee"/>
        </LineIcon>
        {!isEnd && <Line /> }
      </TimeLine>
    </Card>
  );
}
