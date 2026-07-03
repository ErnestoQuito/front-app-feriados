import "./App.css";

function App() {
  return (
    <>
      <header className="header-container">
        <div className="holiday-title">
          <h1 className="holiday-title-main">
            Feriados <span className="holiday-title-hub">Hub</span>
          </h1>
          <p className="holiday-subtitle">
            Planifica tus días libres con presición y anticipación.
          </p>
        </div>
      </header>
      <section className="filter-container">
        <div className="select-filter">
          <select>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
        </div>
        <div className="select-filter">
          <select>
            <option value="1"> 🇵🇪 Perú</option>
            <option value="2"> 🇦🇷 Argentina</option>
            <option value="3"> 🇨🇱 Chile</option>
            <option value="4"> 🇨🇴 Colombia</option>
          </select>
        </div>
      </section>
      <main>
        <table className="table-container">
          <tbody>
            <tr>
              <td className="td-date">11/08/2025</td>
              <td className="td-holiday">Feriado por que sí</td>
              <td className="td-is-laboral">
                <span className="is-laboral-badge">No laborable</span>
              </td>
            </tr>
            <tr>
              <td className="td-date">11/08/2025</td>
              <td className="td-holiday">Feriado por que sí</td>
              <td className="td-is-laboral">
                <span className="is-laboral-badge">No laborable</span>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  );
}

export default App;
