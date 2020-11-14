import React, { useState, useEffect } from 'react';

import { format, parseISO, getDay } from 'date-fns';

import api from '../../services/api';

import Background from '../../components/Background';
import ParamBarSchedule from '../../components/ParamBarSchedule';
import Separator from '../../components/Separator';
import CalendarSchedule from '../../components/CalendarSchedule';
import { Container } from './styles';

function CreateSchedule({ route }) {
  const [hourStart, sethourStart] = useState(new Date());
  const [hourEnd, sethourEnd] = useState(new Date());
  const [serviceTime, setServiceTime] = useState('60');
  const [loadingCalendar, setLoadingCalendar] = useState(false);

  const [hours, setHours] = useState([]);
  const [isTemplate, setIsTemplate] = useState(false);

  const { template } = route.params;

  useEffect(() => {
    iniTemplateIsCreate();
  }, []);

  async function iniTemplateIsCreate() {
    if (template) {
      setIsTemplate(!!template.id);
      sethourStart(parseISO(template.office_hours_start));
      sethourEnd(parseISO(template.office_hours_end));
      setServiceTime(template.time);

      const responseHours = await api.get('/appointments', { params: { templateId: template.id } });

      if (responseHours.status === 200) {
        setHours(responseHours.data.map(
          (hour) => ({
            id: hour.id,
            date: parseISO(hour.date),
            time: format(parseISO(hour.date), 'HH:mm'),
            available: true,
            click: () => {},
            day: getDay(parseISO(hour.date)),
          })
        ));
      }
    }
  }

  return (
    <Background>
      <Container>
        <ParamBarSchedule
          hourStart={hourStart}
          sethourStart={sethourStart}
          hourEnd={hourEnd}
          sethourEnd={sethourEnd}
          serviceTime={serviceTime}
          setServiceTime={setServiceTime}
          setLoadingCalendar={setLoadingCalendar}
          hours={hours}
          setHours={setHours}
          isTemplate={isTemplate}
        />
        <Separator />
        <CalendarSchedule
          hours={hours}
        />
      </Container>
    </Background>
  );
};

export default CreateSchedule;
