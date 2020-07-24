import React, { useState, useEffect } from 'react';

import { format, parseISO } from 'date-fns';

import api from '../../services/api';

import Background from '../../components/Background';
import ParamBarSchedule from '../../components/ParamBarSchedule';
import Separator from '../../components/Separator';
import CalendarSchedule from '../../components/CalendarSchedule';
import { Container } from './styles';

function CreateSchedule() {
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [serviceTime, setServiceTime] = useState('60');
  const [loadingCalendar, setLoadingCalendar] = useState(false);

  const [hours, setHours] = useState([]);
  const [templateId, setTemplateId] = useState(0);
  const [isTemplate, setIsTemplate] = useState(false);

  useEffect(() => {
    iniTemplateIsCreate();
  }, []);

  async function iniTemplateIsCreate() {
    const response = await api.get('/templates');

    const { id, office_hours_start, office_hours_end, service_time } = response.data;

    if (id) {
      setTemplateId(id);
      setIsTemplate(true);

      setDateStart(parseISO(office_hours_start));
      setDateEnd(parseISO(office_hours_end));
      setServiceTime(service_time.toString());

      const responseHours = await api.get('/appointments', { params: { templateId: id } });

      setHours(responseHours.data.map(
        (hour) => ({
          date: parseISO(hour.date),
          time: format(parseISO(hour.date), 'HH:mm'),
          available: true
        })
      ));
    }
  }

  return (
    <Background>
      <Container>
        <ParamBarSchedule
          dateStart={dateStart}
          setDateStart={setDateStart}
          dateEnd={dateEnd}
          setDateEnd={setDateEnd}
          serviceTime={serviceTime}
          setServiceTime={setServiceTime}
          setLoadingCalendar={setLoadingCalendar}
          hours={hours}
          setHours={setHours}
          isTemplate={isTemplate}
        />
        <Separator />
        <CalendarSchedule
          dateStart={dateStart}
          dateEnd={dateEnd}
          serviceTime={serviceTime}
          loadingCalendar={loadingCalendar}
          setLoadingCalendar={setLoadingCalendar}
          hours={hours}
          setHours={setHours}
        />
      </Container>
    </Background>
  );
};

export default CreateSchedule;