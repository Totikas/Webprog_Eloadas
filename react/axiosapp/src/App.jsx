import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://feladatok.beadandink.nhely.hu/axios/";

export default function App() {
  const [gepek, setGepek] = useState([]);
  const [gyarto, setGyarto] = useState("");
  const [tipus, setTipus] = useState("");
  const [ar, setAr] = useState("");
  const [szerkesztettID, setSzerkesztettID] = useState(null);

  // LISTÁZÁS
  const betoltGepeket = () => {
    axios.get(API + "datab.php").then(valasz => setGepek(valasz.data));
  };

  useEffect(() => {
    betoltGepeket();
  }, []);

  // HOZZÁADÁS
  const ujGepHozzaadas = () => {
    axios.post(API + "csinal.php", {
      gyarto,
      tipus,
      ar
    }).then(() => {
      setGyarto("");
      setTipus("");
      setAr("");
      betoltGepeket();
    });
  };

  // TÖRLÉS
  const gepTorles = (id) => {
    axios.post(API + "torles.php", { id }).then(() => betoltGepeket());
  };

  // MÓDOSÍTÁS
  const gepModositas = () => {
    axios.post(API + "frissit.php", {
      id: szerkesztettID,
      gyarto,
      tipus,
      ar
    }).then(() => {
      setGyarto("");
      setTipus("");
      setAr("");
      setSzerkesztettID(null);
      betoltGepeket();
    });
  };

  // Szerkesztés indítása
  const szerkesztesInditasa = (gep) => {
    setSzerkesztettID(gep.id);
    setGyarto(gep.gyarto);
    setTipus(gep.tipus);
    setAr(gep.ar);
  };


  return (
  <div style={stilus.oldal}>
    <h2>Axios CRUD – Gép adatbázis</h2>

    <div style={stilus.inputok}>
      <input placeholder="Gyártó" value={gyarto} onChange={e => setGyarto(e.target.value)} />
      <input placeholder="Típus" value={tipus} onChange={e => setTipus(e.target.value)} />
      <input placeholder="Ár" value={ar} onChange={e => setAr(e.target.value)} />

      {szerkesztettID === null ? (
        <button onClick={ujGepHozzaadas}>Hozzáadás</button>
      ) : (
        <button onClick={gepModositas}>Módosítás</button>
      )}
    </div>

    <table style={stilus.tabla}>
      <thead style={stilus.fejlec}>
        <tr>
          <th style={stilus.cella}>ID</th>
          <th style={stilus.cella}>Gyártó</th>
          <th style={stilus.cella}>Típus</th>
          <th style={stilus.cella}>Ár</th>
          <th style={stilus.cella}>Művelet</th>
        </tr>
      </thead>
      <tbody>
        {gepek.map(gep => (
          <tr key={gep.id}>
            <td style={stilus.cella}>{gep.id}</td>
            <td style={stilus.cella}>{gep.gyarto}</td>
            <td style={stilus.cella}>{gep.tipus}</td>
            <td style={stilus.cella}>{gep.ar}</td>
            <td style={stilus.cella}>
              <button onClick={() => szerkesztesInditasa(gep)}>✏️</button>
              <button onClick={() => gepTorles(gep.id)}>🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}
