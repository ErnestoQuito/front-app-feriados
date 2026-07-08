import type { Holiday } from "../types";
import HolidayRow from "./HolidayRow";

interface HolidayTableProps {
  holidays: Holiday[];
  loading: boolean;
  error: string | null;
}

export default function HolidayTable({
  holidays,
  loading,
  error,
}: HolidayTableProps) {
  if (loading) return <p>Actualizando información...</p>;
  if (error) return <p>{error}</p>;
  if (holidays.length === 0) return <p>No se encontraron feriados.</p>;

  // LOGICA EN LA TABLA: Encontrar el ID del próximo feriado
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const nextHoliday = holidays.find((holiday) => {
    const dateHoliday = new Date(`${holiday.holiday_date}T00:00:00`);
    return dateHoliday >= today;
  });

  return (
    <div className="table-container">
      <table>
        <tbody>
          {holidays.map((holiday) => (
            <HolidayRow
              key={holiday.id}
              holiday={holiday}
              isTheNext={nextHoliday?.id === holiday.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
