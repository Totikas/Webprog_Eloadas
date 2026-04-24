import { useState, useEffect } from "react";

function App() {
  const [ido, setIdo] = useState(0);
  const [futE, setFutE] = useState(false);

  useEffect(() => {
    let idozitoIntervallum;

    if (futE) {
      idozitoIntervallum = setInterval(() => {
        setIdo((elozoIdo) => elozoIdo + 10);
      }, 10);
    } else {
      clearInterval(idozitoIntervallum);
    }

    return () => clearInterval(idozitoIntervallum);
  }, [futE]);

  const formataltIdo = () => {
    const ezred = ("0" + ((ido / 10) % 100)).slice(-2);
    const masodperc = ("0" + Math.floor((ido / 1000) % 60)).slice(-2);
    const perc = ("0" + Math.floor((ido / 60000) % 60)).slice(-2);
    return `${perc}:${masodperc}:${ezred}`;
  };

  return (
    <div style={stilus.kontener}>
      <h1>Stopper</h1>

      <div style={stilus.idoKijelzo}>{formataltIdo()}</div>

      <div style={stilus.gombok}>
        {!futE ? (
          <button onClick={() => setFutE(true)}>Indítás</button>
        ) : (
          <button onClick={() => setFutE(false)}>Megállítás</button>
        )}

        <button
          onClick={() => {
            setIdo(0);
            setFutE(false);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

const stilus = {
  kontener: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "Arial",
  },
  idoKijelzo: {
    fontSize: "48px",
    marginBottom: "20px",
  },
  gombok: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
};

export default App;
