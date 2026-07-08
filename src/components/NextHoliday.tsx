import type { Holiday } from "../types";

interface NextHolidayProps {
  holidays: Holiday[];
}

export default function NextHoliday({ holidays }: NextHolidayProps) {
  if (holidays.length === 0) return null;

  // 1. Obtener la fecha de hoy limpia (sin hora) en la zona horaria local
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 2. Encontrar el primer feriado de la lista que sea igual o posterior a hoy
  const nextHoliday = holidays.find((holiday) => {
    const dateHoliday = new Date(`${holiday.holiday_date}T00:00:00`);
    return dateHoliday >= today;
  });

  // Si no hay más feriados en el año, no mostramos nada
  if (!nextHoliday) return null;

  // 3. Calcular la diferencia de días
  const dateHoliday = new Date(`${nextHoliday.holiday_date}T00:00:00`);
  const difTime = dateHoliday.getTime() - today.getTime();
  const difDays = Math.ceil(difTime / (1000 * 60 * 60 * 24));

  // 4. Determinar el mensaje dunámico de UX
  let messageDays = "";
  if (difDays === 0) {
    messageDays = "🎉 ¡HOY ES FERIADO! Disfruta tu descanso.";
  } else if (difDays === 1) {
    messageDays = "⏳ ¡Mañana es feriado! Falta muy poco.";
  } else {
    messageDays = `🎯 Próximo feriado: en ${difDays} días.`;
  }

  return (
    <div className="next-holiday-card">
      <div>
        <span className="next-holiday-tag">PRÓXIMO DESCANSO</span>
        <h2 className="next-holiday-name">{nextHoliday.holiday_name}</h2>
        <p className="next-holiday-countdown">{messageDays}</p>
      </div>
    </div>
  );
}
