import { useState } from "react";

function Mezo({ ertek, kattintas }) {
  return (
    <button
      onClick={kattintas}
      style={{
        width: "60px",
        height: "60px",
        fontSize: "24px",
        margin: "5px"
      }}
    >
      {ertek}
    </button>
  );
}

export default function App() {
  const [tabla, setTabla] = useState(Array(9).fill(null));
  const [xKovetkezik, setXKovetkezik] = useState(true);

  const kezeles = (index) => {
    if (tabla[index] || gyoztes(tabla)) return;

    const ujTabla = [...tabla];
    ujTabla[index] = xKovetkezik ? "X" : "O";
    setTabla(ujTabla);
    setXKovetkezik(!xKovetkezik);
  };

  const ujJatek = () => {
    setTabla(Array(9).fill(null));
    setXKovetkezik(true);
  };

  const gyoz = gyoztes(tabla);

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Tic‑Tac‑Toe</h2>
      <p>{gyoz ? `Győztes: ${gyoz}` : `Következő: ${xKovetkezik ? "X" : "O"}`}</p>

      <div style={{ display: "inline-block" }}>
        <div>
          <Mezo ertek={tabla[0]} kattintas={() => kezeles(0)} />
          <Mezo ertek={tabla[1]} kattintas={() => kezeles(1)} />
          <Mezo ertek={tabla[2]} kattintas={() => kezeles(2)} />
        </div>
        <div>
          <Mezo ertek={tabla[3]} kattintas={() => kezeles(3)} />
          <Mezo ertek={tabla[4]} kattintas={() => kezeles(4)} />
          <Mezo ertek={tabla[5]} kattintas={() => kezeles(5)} />
        </div>
        <div>
          <Mezo ertek={tabla[6]} kattintas={() => kezeles(6)} />
          <Mezo ertek={tabla[7]} kattintas={() => kezeles(7)} />
          <Mezo ertek={tabla[8]} kattintas={() => kezeles(8)} />
        </div>
      </div>

      <br />
      <button onClick={ujJatek} style={{ marginTop: "20px" }}>
        Új játék
      </button>
    </div>
  );
}

function gyoztes(tabla) {
  const nyeroVonalak = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (let [a, b, c] of nyeroVonalak) {
    if (tabla[a] && tabla[a] === tabla[b] && tabla[a] === tabla[c]) {
      return tabla[a];
    }
  }
  return null;
}
