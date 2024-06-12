import React, { useState, useEffect } from 'react';
import { obtenerHorariosUsuario } from '@/services/TimesServices';
import { schedulePushNotification } from '@/components/dayTimer/DayTimer'; // Importa la función de enviar notificación
import * as Notifications from 'expo-notifications';

export const AlarmServices = () => {
  const [horarios, setHorarios] = useState([]);

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const horariosUsuario = await obtenerHorariosUsuario();
        setHorarios(horariosUsuario);
        scheduleNotificationsDuringSchedule(horariosUsuario); // Llama a la función para programar notificaciones durante los horarios
      } catch (error) {
        console.error('Error al obtener los horarios del usuario:', error);
      }
    };
    fetchHorarios();
  }, []);

  const scheduleNotificationsDuringSchedule = (horarios) => {
    horarios.forEach((horario) => {
      const { dias, inicio, final } = horario;
      const now = new Date();
      const start = new Date(now);
      start.setHours(parseInt(inicio.split(':')[0], 10));
      start.setMinutes(parseInt(inicio.split(':')[1], 10));
      const end = new Date(now);
      end.setHours(parseInt(final.split(':')[0], 10));
      end.setMinutes(parseInt(final.split(':')[1], 10));

      if (now >= start && now <= end && dias.includes(getDayOfWeek(now))) {
        // Si la fecha actual está dentro del rango de horario y es uno de los días especificados
        startInterval();
      }
    });
  };

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Paréntesis',
        body: '¡Es hora de realizar un Paréntesis! 🏃‍♂️ Estírate y energiza tu día. 🌟',
        data: { data: 'goes here' },
        priority: 'high',
      },
      trigger: null, // No establecer un trigger para que la notificación no se muestre inmediatamente
    });
  }

  const getDayOfWeek = (date) => {
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    return days[date.getDay()];
  };

  const startInterval = () => {
    setInterval(() => {
      // schedulePushNotification(); // Enviar notificación cada minuto
      console.log('bolas')
      schedulePushNotification()
    }, 600000); // 60000 milisegundos = 1 minuto
  };

  return null; // Este componente no renderiza nada en la interfaz
};
