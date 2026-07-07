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

  return (
    <table className="table-container">
      <tbody>
        {holidays.map((holiday) => (
          <HolidayRow key={holiday.id} holiday={holiday} />
        ))}
      </tbody>
    </table>
  );
}
