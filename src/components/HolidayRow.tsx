import React, { useState } from "react";
import type { Holiday } from "../types";

interface HolidayRowProps {
  holiday: Holiday;
  isTheNext: boolean;
}

export default function HolidayRow({ holiday, isTheNext }: HolidayRowProps) {
  const [estaExpandido, setEstaExpandido] = useState<boolean>(false);

  // const obtenerConfiguracionBadge = (type: string) => {
  //   const t = type.toLowerCase();

  //   if (t.includes("público") || t.includes("publico")) {
  //     return { clase: "naranja", texto: "Sector Público" };
  //   }
  //   if (t.includes("privado")) {
  //     return { clase: "amarillo", texto: "Sector Privado" };
  //   }

  //   return { clase: "verde", texto: "Nacional" };
  // };

  const isHolidayMandatory = (type: boolean) => {
    if (type) {
      return { clase: "rojo", texto: "Feriado nacional" };
    }

    return { clase: "amarillo", texto: "Feriado sector público" };
  };

  const formatDateUX = (fechaString: string) => {
    if (!fechaString) return "";

    // Agregamos "T00:00:00" para evitar que Javascript reste un día por desfase de
    // zonas horarias
    const date = new Date(`${fechaString}T00:00:00`);

    // Configuramos el formateador nativo en español
    const formatter = new Intl.DateTimeFormat("es-ES", {
      weekday: "short", // jue.
      day: "numeric", // 23
      month: "short", // jul.
    });

    let dateFormatted = formatter.format(date);

    // Opcional: Limpiamos los puntos que pone a veces Javascript
    // (ej: "jue. 23 jul." -> "Jue 23 Jul")
    dateFormatted = dateFormatted.replace(/\./g, "");

    // Capitalizamos la primera letra para que quede "Jue, 23 jul"
    return dateFormatted.charAt(0).toUpperCase() + dateFormatted.slice(1);
  };

  //const badge = obtenerConfiguracionBadge(holiday.holiday_type);
  const isHoliday = isHolidayMandatory(holiday.holiday_is_mandatory);

  return (
    <React.Fragment>
      {/* FILA PRINCIPAL */}
      {/* Añadir la clase 'fila-proxima' si corresponde */}
      <tr
        onClick={() => setEstaExpandido(!estaExpandido)}
        className={`fila-feriado ${estaExpandido ? "activa" : ""} ${isTheNext ? "fila-proxima" : ""}`}
      >
        <td className="td-date">{formatDateUX(holiday.holiday_date)}</td>
        <td className="td-holiday">
          <span className="">{holiday.holiday_name}</span>
          <span className={`flecha-indicador ${estaExpandido ? "rotar" : ""}`}>
            ▼
          </span>
        </td>
        <td>{holiday.holiday_type}</td>
        <td className="td-is-laboral">
          <div className="contenedor-badges">
            <span className={`is-laboral-badge ${isHoliday.clase}`}>
              {isHoliday.texto}
            </span>
            {/*{!holiday.holiday_is_mandatory && (
              <span className="badge-secundario">Opcional Privado</span>
            )}*/}
          </div>
        </td>
      </tr>

      {/* FILA DESPLEGABLE */}
      {estaExpandido && (
        <tr className="fila-detalle">
          <td colSpan={4}>
            <div className="contenido-detalle">
              {holiday.holiday_description && (
                <p>
                  <strong>Detalle: </strong>
                  {holiday.holiday_description}
                </p>
              )}
              {holiday.holiday_law_reference && (
                <p className="texto-ley">📜 {holiday.holiday_law_reference}</p>
              )}
              {!holiday.holiday_description &&
                !holiday.holiday_law_reference && (
                  <p>No hay detalles adicionales para este feriado.</p>
                )}
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
}
