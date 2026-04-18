let lista = [
    { id: 1, gyarto: "HP", tipus: "COMPAQ 615", kijelzo: 15.6, memoria: 1024, ar: 95120 },
    { id: 2, gyarto: "ASUS", tipus: "K51AC", kijelzo: 15.6, memoria: 2048, ar: 101200 },
    { id: 3, gyarto: "HP", tipus: "Pavilion DV6", kijelzo: 15.6, memoria: 3072, ar: 167920 }
];

let kovId = 4;

function frissit() {
    let t = document.getElementById("tabla");
    t.innerHTML = "";

    for (let n of lista) {
        let sor = "<tr>";
        sor += "<td>" + n.id + "</td>";
        sor += "<td>" + n.gyarto + "</td>";
        sor += "<td>" + n.tipus + "</td>";
        sor += "<td>" + n.kijelzo + "</td>";
        sor += "<td>" + n.memoria + "</td>";
        sor += "<td>" + n.ar + "</td>";
        sor += "<td><button onclick='szerkeszt(" + n.id + ")'>Szerk</button> ";
        sor += "<button onclick='torol(" + n.id + ")'>Töröl</button></td>";
        sor += "</tr>";

        t.innerHTML += sor;
    }
}

function mentes() {
    let id = document.getElementById("editId").value;

    let uj = {
        gyarto: gyarto.value,
        tipus: tipus.value,
        kijelzo: Number(kijelzo.value),
        memoria: Number(memoria.value),
        ar: Number(ar.value)
    };

    if (id != "") {
        let i = lista.findIndex(x => x.id == id);
        uj.id = Number(id);
        lista[i] = uj;
    } else {
        uj.id = kovId++;
        lista.push(uj);
    }

    formReset();
    frissit();
}

function szerkeszt(id) {
    let n = lista.find(x => x.id == id);

    editId.value = n.id;
    gyarto.value = n.gyarto;
    tipus.value = n.tipus;
    kijelzo.value = n.kijelzo;
    memoria.value = n.memoria;
    ar.value = n.ar;

    formCim.innerText = "Notebook szerkesztése";
    megse.style.display = "inline-block";
}

function torol(id) {
    if (confirm("Biztos törlöd?")) {
        lista = lista.filter(x => x.id != id);
        frissit();
    }
}

function formReset() {
    editId.value = "";
    gyarto.value = "";
    tipus.value = "";
    kijelzo.value = "";
    memoria.value = "";
    ar.value = "";

    formCim.innerText = "Új notebook";
    megse.style.display = "none";
}

frissit();
