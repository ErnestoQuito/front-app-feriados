import "./App.css";
import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import Footer from "./components/Footer";
import HolidayTable from "./components/HolidayTable";
import NextHoliday from "./components/NextHoliday";

// --- SERVER API
const API_URL = import.meta.env.VITE_API_URL;

// -- TIPOS DE TYPESCRIPT (Interfaces)
interface Country {
  id: number;
  country_code: string;
  country_name: string;
}

interface Holiday {
  id: number;
  holiday_date: string;
  holiday_name: string;
  holiday_description: string;
  holiday_type: string;
  holiday_is_substitutable: boolean;
  holiday_is_mandatory: boolean;
  holiday_law_reference: string;
}

function App() {
  // --- ESTADOS DE FILTROS
  const [countrySelected, setCountrySelected] = useState<string>("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // -- Emojis para la UI
  const getFlagEmoji = (countryCode: string): string => {
    if (!countryCode) return "";
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  // 1. EFECTO 1. Cargar la lista de países y detectar la IP del usuario al iniciar.
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Hacemos las dos peticiones en paralelo para ahorrar tiempo
        const [resCountries, resIP] = await Promise.all([
          fetch(`${API_URL}/countries`),
          fetch("https://ipapi.co/json/").catch(() => null), // API DE UBICACION
        ]);

        if (!resCountries.ok)
          throw new Error("No se pudo cargar la lista de países");

        const listCountries: Country[] = await resCountries.json();
        setCountries(listCountries); // Guardamos los países en el estado.

        // Intentamos obtener el código de IP.
        let codeCountryDetected = "1"; // Por defecto si algo falla

        if (resIP && resIP.ok) {
          const dataIP = await resIP.json();
          // CORRECCION: Buscamos el objeto país real, no un boolean.
          const foundCountry = listCountries.find(
            (c) => c.country_code === dataIP.country_code,
          );

          if (foundCountry) {
            codeCountryDetected = String(foundCountry.id);
          } else if (listCountries.length > 0) {
            // Si no encuentra su IP, usa el primero de tu lista
            codeCountryDetected = String(listCountries[0].id);
          }
        } else if (listCountries.length > 0) {
          codeCountryDetected = String(listCountries[0].id);
        }

        // establecemos el pais inicial del select
        setCountrySelected(codeCountryDetected);
      } catch (err) {
        // validamos si err es realmente una instancia del objeto Error nativo
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocurrió un error inesperado.");
        }
        setLoading(false);
      }
    };
    initializeApp();
  }, []); // SOLO CORRE AL INICIO.

  // 2 EFECTO: CARGAR LOS FERIADOS CUANDO CAMBIE EL PAÏS O EL AÑO.
  useEffect(() => {
    // Si aún no tenemos un país seleccionado (porque la APIs del paso 1 están cargando), esperamos.
    if (!countrySelected) return;

    const getHolidays = async () => {
      setLoading(true);
      try {
        // Pasamos también el año a la API si tu backend lo soporta, o filtramos por ruta
        const responses = await fetch(`${API_URL}/holidays/${countrySelected}`);
        if (!responses.ok)
          throw new Error("Error al obtener los feriados de ese país");

        const data: Holiday[] = await responses.json();
        setHolidays(data);
        setError(null);
      } catch (err) {
        // validamos si err es realmente una instancia del objeto Error nativo
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocurrió un error inesperado.");
        }
      } finally {
        setLoading(false);
      }
    };

    getHolidays();
  }, [countrySelected]); // SOLO CORRE CUANDO CAMBIA EL PAIS O EL AÑO.

  return (
    <>
      <header className="header-container">
        <div className="holiday-title">
          <h1 className="holiday-title-main">
            Feriados <span className="holiday-title-hub">Hub</span>
          </h1>
          <p className="holiday-subtitle">
            Planifica tus días libres con precisión y anticipación.
          </p>
        </div>
      </header>
      <section className="filter-container">
        {/*<div className="select-filter">
          <select>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
        </div>*/}
        <div className="select-filter">
          <select
            value={countrySelected}
            onChange={(e) => setCountrySelected(e.target.value)}
          >
            {countries.length === 0 && (
              <option value="">Cargando países ... 🌎 </option>
            )}

            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {getFlagEmoji(country.country_code)} {country.country_name}
              </option>
            ))}
          </select>
        </div>
      </section>
      {!loading && !error && <NextHoliday holidays={holidays} />}
      <main>
        <HolidayTable holidays={holidays} loading={loading} error={error} />
      </main>
      <Footer />
      <Analytics />
    </>
  );
}

export default App;
