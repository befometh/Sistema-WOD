const mainIdentity = document.querySelector("#mainIdentity"); //Listener HTML de la sección: Identidad
const mainAttr = document.querySelector("#mainAttr"); //Listener HTML de la sección: Atributos
const mainHabs = document.querySelector("#mainHabs"); //Listener HTML de la sección: Habilidades
const mainAdv = document.querySelector("#mainAdv"); // Listener HTML de la sección: Ventajas 1
const mainAdv2 = document.querySelector("#mainAdv2"); // Listener HTML de la sección: Ventajas 2

//Inicializador de la lista de clanes
var clanList = [];
var healthActive;
var healthState = [0, 0, 0, 0, 0, 0, 0];

//Campos de identidad en español
const vampIdentityEsp = [
  "Nombre",
  "Naturaleza",
  "Clan",
  "Jugador",
  "Conducta",
  "Generación",
  "Crónica",
  "Concepto",
  "Sire",
];

//Campos de Identidad en inglés
const vampIdentityEng = [
  "name",
  "nat",
  "clan",
  "play",
  "dem",
  "gen",
  "chr",
  "con",
  "sire",
];

//Atributos de vampiro en español
const attributeEsp = [
  "Fuerza",
  "Carisma",
  "Percepción",
  "Destreza",
  "Manipulación",
  "Inteligencia",
  "Resistencia",
  "Apariencia",
  "Astucia",
];

// Habilidades de vampiro en español
const vampHabEsp = [
  "Alerta",
  "Armas C.C.",
  "Academicismo",
  "Atletismo",
  "Armas de Fuego",
  "Ciencia",
  "Callejeo",
  "Conducir",
  "Finanzas",
  "Consciencia",
  "Etiqueta",
  "Informática",
  "Empatía",
  "Latrocinio",
  "Investigación",
  "Expresión",
  "Interpretación",
  "Leyes",
  "Intimidación",
  "Pericias",
  "Medicina",
  "Liderazgo",
  "Sigilo",
  "Ocultismo",
  "Pelea",
  "Supervivencia",
  "Política",
  "Subterfugio",
  "Trato con Animales",
  "Tecnología",
];

//Atributos de vampiro en inglés
const attributeEng = [
  "str",
  "cha",
  "per",
  "dex",
  "man",
  "int",
  "sta",
  "app",
  "wit",
];

// Habilidades de vampiro en inglés
const vampHabEng = [
  "alertness",
  "melee",
  "academics",
  "atletism",
  "firearms",
  "science",
  "streetwise",
  "drive",
  "finance",
  "awareness",
  "etiquette",
  "computer",
  "empathy",
  "larceny",
  "investigation",
  "expression",
  "performance",
  "law",
  "intimidation",
  "crafts",
  "medicine",
  "leadership",
  "stealth",
  "occult",
  "brawl",
  "survive",
  "politics",
  "subterfuge",
  "animalKen",
  "technology",
];

// Clase de cada uno de los clanes de Vampiro
class Clan {
  constructor(nameClan, desc, weak, primal_disc) {
    this.nameClan = nameClan;
    this.desc = desc;
    this.weak = weak;
    this.primal_disc = primal_disc;
  }
}

class HP {
  constructor(contundent, lethal, aggravated) {
    this.contundent = contundent;
    this.lethal = lethal;
    this.aggravated = aggravated;
  }
}

// Clase constructora del personaje base
class Character {
  constructor() {
    this.identity = {
      //empty until PC is created
      name: "",
      play: "",
    };
    this.attributes = {
      // strength, charisma, perception
      str: { id: 0, num: 1, spec: false },
      cha: { id: 1, num: 1, spec: false },
      per: { id: 2, num: 1, spec: false },
      // dexterity, manipulate, intelligence
      dex: { id: 3, num: 1, spec: false },
      man: { id: 4, num: 1, spec: false },
      int: { id: 5, num: 1, spec: false },
      // stamina, appearence, witness
      sta: { id: 6, num: 1, spec: false },
      app: { id: 7, num: 1, spec: false },
      wit: { id: 8, num: 1, spec: false },
    };
    this.habilities = {
      //empty until PC is created
      tal: {},
      tech: {},
      know: {},
    };
    this.backgrounds = {
      //empty until PC is created
    };

    this.willpower = {
      perm: 0,
      temp: 0,
    };
      this.health = new HP(0, 0, 0);
  }
  getAttrByID = (id) => {
    let attr = Object.getOwnPropertyNames(this.attributes); // crea un array con el nombre de todas las propiedades
    for (let i = 0; i < attr.length; i++) {
      let elem = Object.getOwnPropertyDescriptor(
        this.attributes,
        attr[i]
      ).value; //extrae los valores de cada propiedad para sacar sus correspondientes componentes
      if (elem.id == id) {
        return [attr[i], elem];
      }
    }
  };
  getHabByID = (id) => {
    let hab = Object.getOwnPropertyNames(this.habilities); // crea un array con el nombre de todas las propiedades
    for (let i = 0; i < attr.length; i++) {
      let elem = Object.getOwnPropertyDescriptor(this.habilities, hab[i]).value; //extrae los valores de cada propiedad para sacar sus correspondientes componentes
      if (elem.id == id) {
        return [hab[i], elem];
      }
    }
  };
}

//clase constructora del personaje vampiro
class Vampire extends Character {
  constructor() {
    super();
    this.identity.nat = "";
    this.identity.dem = "";
    this.identity.con = "";
    this.identity.clan = {};
    this.identity.gen = 13;
    this.identity.sire = "";
    this.virtues = {
      vir_1: {
        type: "",
        num: 0,
      },
      vir_2: {
        type: "",
        num: 0,
      },
      vir_3: {
        type: "",
        num: 0,
      },
    };
    this.path = {
      type: "",
      num: 0,
    };
    this.merits = [];
    this.flaws = [];
    this.blood = [];
  }
}

class OneStat {
  constructor(code, firstSel, isHorizontal, namEng, namEsp, max, withSpec) {
    this.namEng = namEng;
    this.namEsp = namEsp;
    this.isHorizontal = isHorizontal;
    this.firstSel = firstSel;
    this.code = code;
    this.max = max;
    this.withSpec = withSpec;
  }
}

var vamp1 = new Vampire(); //vampiro de prueba, (prototipo, borrar al terminar)

//Lista de clanes según el libro, el constructor rellena la lista @clanList[]
function clansBuilder() {
  let assamita = new Clan("Assamita", "", "No puede cometer diablerie", "");
  let brujah = new Clan("Brujah", "", "Propensión al Frenesí", "");
  let gangrel = new Clan(
    "Gangrel",
    "",
    "Ganan partes Animales al perder el control",
    ""
  );
  let lasombra = new Clan("Lasombra", "", "Recibe más daño del fuego, no tiene reflejo", "");
  let malkavian = new Clan("Malkavian", "", "Locos al ser abrazados", "");
  let nosferatu = new Clan("Nosferatu", "", "Deformes al ser abrazados", "");
  let ravnos = new Clan("Ravnos", "", "Tienen un vicio incontrolable", "");
  let seguidor_de_Set = new Clan(
    "Seguidores de Set",
    "",
    "Recibe más daño del sol",
    ""
  );
  let toreador = new Clan(
    "Toreador",
    "",
    "Facilidad para quedar embelesados",
    ""
  );
  let tremere = new Clan(
    "Tremere",
    "",
    "Despreciados, Vínculo Nv.1 a un antiguo",
    ""
  );
  let tzimice = new Clan(
    "Tzimice",
    "",
    "Se debilitan si se alejan de tierra de algún lugar especial para ellos",
    ""
  );
  let ventrue = new Clan("Ventrue", "", "Presa selectiva", "");

  clanList = [
    assamita,
    brujah,
    gangrel,
    lasombra,
    malkavian,
    nosferatu,
    ravnos,
    seguidor_de_Set,
    toreador,
    tremere,
    tzimice,
    ventrue,
  ];
}

/**
 * Constructor principal de la hoja de personaje en HTML
 */
var isNotCreated = true; //variable que indica si la página ya fue inicializada por primera vez o no
function initializeSheet() {
  if (isNotCreated) {
    mainIdentity.innerHTML = createVampIdentity();
    isNotCreated = false;
  }
  mainAttr.innerHTML = createStats(vamp1, 1);
  mainHabs.innerHTML = createStats(vamp1, 2);
  mainAdv.innerHTML = createVampAdv(vamp1);
  mainAdv2.innerHTML = createVampAdv2(vamp1);
}

/**
 * Función constructora de la sección: Identidad
 * @returns Sección ya construida
 */
function createVampIdentity() {
  clansBuilder();
  let writer = "";
  count = 0;
  for (let i = 0; i < 3; i++) {
    writer += `<div class="row justify-content-center align-items-center g-2">`;
    for (let j = 0; j < 3; j++) {
      writer += `<div class="col">
                <small class="form-text text-muted">${vampIdentityEsp[count]}</small>`;
      switch (count) {
        case 2:
          writer += `<select class="form-control" id="mainClan" onchange="changeClan(vamp1)"><option value="0">Escoge...</option>`;
          for (let k = 0; k < clanList.length; k++) {
            writer += `<option value="${k + 1}">${
              clanList[k].nameClan
            }</option>`;
          }
          writer += `</select>`;
          break;
        case 5:
          writer += `<input type="number" class="form-control" name="${vampIdentityEng[count]}" id="${vampIdentityEng[count]}" onclick="updateGen()" value="13">
                    </div>`;
          break;
        default:
          writer += `<input type="text" class="form-control" name="${vampIdentityEng[count]}" id="${vampIdentityEng[count]}">`;
          break;
      }
      writer += `</div>`;
      count++;
    }
    writer += `</div>`;
  }
  return writer;
}

/**
 * Actualiza la generación a medida se va cambiando el número que aparece en el clan, en caso de ser inválido, reinicia el contador a "13"
 */
function updateGen() {
  let generation = gen.value;
  if (generation > 0) {
    vamp1.identity.gen = generation;
    initializeSheet();
  } else {
    alert("Número de generación no válido");
    gen.value = 13;
    updateGen();
  }
}

/**
 * Constructor HTML para realizar la construcción de la lista que permite visualizar cada sección
 * @param {Recibe el objeto Character que en este caso sería el personaje del usuario (con estadísticas incluidas)} char
 * @returns entrega el texto ya construido
 */
function createStats(char, section) {
  let writer = "";
  let max = vampGenCalculator(char.identity.gen);
  //Extrae la generación del vampiro, entre más baja mayor sus capacidades y puede albergar estadísticas más altas
  writer += listStats(max, section);
  return writer;
}

/**
 * Función constructora de las secciones Atributos y Habilidades
 * @param {el máximo que la generacion permite, definido por Vampire.identity.gen} max
 * @param {Sección a construir, un número que puede ser 1 o 2} section
 * @returns
 */
function listStats(max, section) {
  let writer = "";
  let count = 0;
  let arr;
  let name;
  switch (section) {
    case 1:
      arr = attributeEsp;
      name = attributeEng;
      break;
    case 2:
      arr = vampHabEsp;
      name = vampHabEng;
      break;
  }
  for (let i = 0; i < arr.length / 3; i++) {
    writer += "<div class='row justify-content-center align-items-center g-2'>";
    for (let j = 0; j < 3; j++) {
      //writer += `<div class="col-4">${arr[count]}<div class="d-inline">(_____)</div>`;
      writer += `<div class="col-4">${arr[count]}<input type="text" class="fs-6 w-25 border-0 bg-light">`;
      for (let k = 0; k < max; k++) {
        writer += `<input 
        class="stat d-inline"
        type="checkbox" 
        id="${name[count]}${k + 1}" 
        name="${name[count]}_dot" 
        value="${k + 1}" 
        onclick="levelSelect('${name[count]}_dot',${k})"`;
        if (k == 0 && section == 1) {
          writer += `checked>`;
        } else {
          writer += `>`;
        }
      }
      writer += `</div>`;
      count++;
    }
    writer += `</div>`;
  }
  return writer;
}

/**
 * Función que se encarga de definir el máximo que permite la generación del vampiro para tener en estadísticas, siguiendo la siguiente tabla
 * ------------------------------------------------------------------------------------------
 * Generación         |Máximo de rangos   |Reserva Máx. de Sangre   |Puntos de sangre*turno |
 * ------------------------------------------------------------------------------------------
 * Tercera o -        |10                 |Ilimitado                |Ilimitado              |
 * Cuarta             |9                  |50                       |10                     |
 * Novena             |5                  |14                       |2                      |
 * Quinta             |8                  |40                       |8                      |
 * Sexta              |7                  |30                       |6                      |
 * Séptima            |6                  |20                       |4                      |
 * Octava             |5                  |15                       |3                      |
 * Décima             |5                  |13                       |1                      |
 * Undécima           |5                  |12                       |1                      |
 * Duodecima          |5                  |10                       |1                      |
 * Decimotercera o +  |5                  |10 o 0                   |1 o 0                  |
 * ------------------------------------------------------------------------------------------
 * @param {valor de la generación, viene de @Vampire.identity.gen} gen
 * @param {Depende del valor que se va a tratar} type
 * @returns el valor máximo de estadística que puede llevar el personaje
 */
function vampGenCalculator(gen, type) {
  switch (type) {
    // CASO 2: Reserva de sangre y gasto de sangre
    case 2:
      let blood = new Object();
      // Para 1ra - 3ra generación
      if (gen < 4) {
        blood.total = 0;
        blood.spend = 99;
      }
      // Para 4ta - 7ma generación
      else if (gen < 8) {
        blood.total = 90 - 10 * gen;
        blood.spend = 18 - 2 * gen;
      }
      // Para 8va - 12da generación o superior
      else if (gen < 14) {
        blood.total = 23 - gen;
        blood.spend = 11 - gen;
        if (blood.total < 10) {
          blood.total = 10;
        }
        if (blood.spend < 1) {
          blood.spend = 1;
        }
      }
      // Para 13ra - 15ta generación
      else if (gen < 16) {
        blood.total = 5;
        blood.spend = 1;
      }
      // De 16ta en adelante, no usan puntos de sangre.
      else {
        blood.total = 0;
        blood.spend = 0;
      }
      return blood;
    // CASO 1 y por defecto: Nivel máximo de atributos
    default:
      // Para 1ra - 3ra generación:
      if (gen < 4) {
        return 10;
        // Para 4ta - 7ma genración:
      } else if (gen < 8) {
        let max = 13 - gen;
        return max;
        // Para 8va generación en adelante
      } else {
        return 5;
      }
  }
}

/**
 *
 * @param {Recibe el input según el nombre de etiqueta, que es común en todos los puntos de cada estadística. Por Ej.: str_dot} name
 * @param {Posición del número del checkbox seleccionado en su propia lista} pos
 */
function levelSelect(name, pos) {
  let elem = document.getElementsByName(name);
  let value;
  if (pos == 0) {
    value = firstPosition(name);
  } else {
    if (elem[pos].checked) {
      for (let i = 0; i <= pos; i++) {
        elem[i].checked = true;
      }
      if (pos < elem.length - 1) {
        for (let i = pos + 1; i < elem.length; i++) {
          elem[i].checked = false;
        }
      }
    } else {
      elem[pos].checked = true;
      levelSelect(name, pos);
    }
    value = parseInt(elem[pos].value);
  }
}

/**
 * Listener que escucha la primera posición de cada una de las estadísticas, si su posición siguiente se encuentra activa, vaciará todas las que sigan después de la inicial, si está solo, se desactivará y activará
 * @param {Nombre de etiquetas en común entre cada estadística} name
 *
 */
function firstPosition(name) {
  let elem = document.getElementsByName(name);
  if (elem[0].checked == false && elem[1].checked) {
    elem[0].checked = true;
    for (let i = 1; i < elem.length; i++) {
      elem[i].checked = false;
    }
  } else if (elem[0].checked == false) {
    return 0;
  }
  return 1;
}

function createOneStat(stat) {
  let inline;
  if (stat.isHorizontal) {
    inline = "col";
  } else {
    inline = "container-fluid text-center";
  }
  let writer = `<div class="row align-items-center">`;
  writer += `<div class="${inline}">
  <small id="${stat.namEng}" class="form-text text-muted mx-0">${stat.code}</small>
    </div>`;
  if (stat.withSpec) {
    writer += `<div class="${inline}"><input type="text" class="fs-6 border-0 bg-light"></div>`;
  }
  writer += `<div class="${inline} align-items-start">`;
  for (let i = 0; i < stat.max; i++) {
    writer += `
      <input
      class="stat d-inline align-self-start"
      type="checkbox" 
      id="${stat.namEng}${i + 1}"
      name="${stat.namEng}_dot"
      value="${i + 1}" 
      onclick="levelSelect('${stat.namEng}_dot',${i})"`;
    if (i == 0 && stat.firstSel) {
      writer += `checked`;
    }
    writer += `>`;
  }
  writer += `</div></div>`;
  return writer;
}

/**
 * Función que se encarga de la tercera parte de la hoja, donde se encuentran las disciplinas, trasfondo y virtudes. (Parte 1)
 * @param {Personaje, en este caso Vampiro} char
 * @returns texto ya construido
 */
function createVampAdv(char) {
  //
  let disc = [];
  let bg = [];
  let virt = [];
  let virtNames = [
    ["Conciencia", "Convicción"],
    ["Autocontrol", "Instinto"],
    ["Coraje"],
  ];

  let writer = `<textfield class="h2 text-center">Ventajas
    <div class="row justify-content-center align-items-center g-2">
    <div class="col">
    `;
  // Columna izquierda: Disciplinas
  writer += `<div class="fs-6 text-center fw-bold mb-3">Disciplinas</div>`;
  for (let i = 0; i < 6; i++) {
    disc.push(
      new OneStat(
        `<input type=text class="fs-6 text-end border-0 bg-light" id="discName${
          i + 1
        }">`,
        false,
        true,
        `disc_${i + 1}`,
        `disc_${i + 1}`,
        vampGenCalculator(char.identity.gen),
        false
      )
    );
    writer += createOneStat(disc[i]);
  }
  writer += `</div>
    <div class="col">`; //fin columna izquierda

  // Columna central
  writer += `<div class="fs-6 text-center fw-bold mb-3">Trasfondos</div>`;
  for (let i = 0; i < 6; i++) {
    bg.push(
      new OneStat(
        `<input type=text class="fs-6 text-end border-0 bg-light" id="backName${
          i + 1
        }">`,
        false,
        true,
        "background",
        `Trasfondo_${i + 1}`,
        vampGenCalculator(char.identity.gen),
        false
      )
    );
    writer += createOneStat(bg[i]);
  }

  writer += `</div>
    <div class="col align-top">`; // fin trasfondos
  // Columna derecha
  writer += `<div class="fs-6 text-center fw-bold mb-4">Virtudes</div><div class="py-5">`;
  for (let i = 0; i < 3; i++) {
    let options = "";
    if (virtNames[i].length > 1) {
      options += `<select class="fs-6 border-0 bg-light">`;
      for (let j = 0; j < virtNames[i].length; j++) {
        options += `<option value"${j + 1}">${virtNames[i][j]}</option>`;
      }
      options += `</select>`;
    } else {
      options += `<p class="fs-6 text-dark mt-3">${virtNames[i][0]}</p>`;
    }
    virt[i] = new OneStat(
      options,
      false,
      true,
      `virt_${i + 1}`,
      `virt_${i + 1}`,
      5,
      false
    );
    writer += createOneStat(virt[i]);
  }
  return writer + `</div></div></div></textfield>`;
}

function createVampAdv2(char) {
  let will = [];
  let blood = vampGenCalculator(char.identity.gen, 2);
  let willWriter = [
    [
      `<p class="fs-6 text-center fw-bold mt-4">Fuerza de Voluntad</p>`,
      "P",
      "Perm",
    ],
    ["", "T", "Temporal"],
  ];
  healthActive = { contundent: true, lethal: true, aggravated: true };
  let bloodObject;
  let writer = "";
  // Columna 1, Méritos y Defectos:
  writer += `<div class="row justify-content-center align-items-center g-2">
  <div class="col"><div class="fs-6 text-center fw-bold">Méritos</div>`;
  for (let i = 0; i < 5; i++) {
    writer += `<div class="d-block row"><input type=text class="col-8 fs-6 text-end border-0 bg-light" id="merit${
      i + 1
    }"><input type=number class="col-3 m-1 fs-6 text-end border-0 bg-light" id="meritCost${
      i + 1
    }"></div>`;
  }
  writer += `<div class="fs-6 text-center fw-bold">Defectos</div>`;
  for (let i = 0; i < 5; i++) {
    writer += `<div class="d-block row"><input type=text class="col-8 fs-6 text-end border-0 bg-light" id="flaw${
      i + 1
    }"><input type=number class="col-3 m-1 fs-6 text-end border-0 bg-light" id="flawCost${
      i + 1
    }"></div>`;
  }

  // Columna 2, Senda, Fuerza de voluntad y reserva de sangre
  //Senda:
  writer += `</div><div class="col">`;
  let senda = new OneStat(
    `<p class="fs-6 text-center fw-bold">Senda</p><input type=text class="col-8 d-block mx-auto fs-6 text-center border-0 bg-light" id="pathName" placeholder="Humanidad"
    >`,
    false,
    false,
    "path",
    "Senda",
    10,
    false
  );
  writer += createOneStat(senda);

  //Fuerza de Voluntad
  for (let i = 0; i < 2; i++) {
    will.push(
      new OneStat(
        willWriter[i][0],
        false,
        false,
        `will${willWriter[i][1]}`,
        `fdv${willWriter[i][2]}`,
        10,
        false
      )
    );
    writer += createOneStat(will[i]);
  }

  //Reserva de Sangre

  bloodObject = new OneStat(
    `<div class="fs-6 text-center fw-bold mt-4">Reserva de Sangre</div>`,
    false,
    false,
    "blood",
    "reservaDeSangre",
    blood.total,
    false
  );
  writer += createOneStat(bloodObject);
  writer += `<div class="fs-6 text-center fw-bold mt-4">Sangre por Turno<input type=number class="col-1 d-block w-25 mx-auto fs-6 text-center d-inline border-1 bg-light" disabled value="${blood.spend}"></div>`;
  writer += `</div><div class="col">`;

  // Columna 3, Puntos de vida, Debilidad y Experiencia
  writer += `<div class="fs-6 text-center fw-bold">Salud</div><div>`;
  writer += healthBuilder();
  writer += `</div>
  <div class="fs-6 text-center fw-bold">Debilidad</div>
    <div class="justify-content-center align-items-center">
      <textarea id="weak" rows=3 cols=40 max=400></textarea>
    </div>
  <div class="fs-6 text-center fw-bold">Experiencia</div><div>
    <textarea id="exp" rows=3 cols=40 max=400></textarea>
    `;
  return (
    writer +
    `</div></div><hr><div class="text-center">
  <small class="form-text fw-bold text-danger">Atributos: 7/5/3 • Habilidades: 13/9/5 • Disciplinas: 3 • Trasfondos: 5 • Virtudes: 7 • Puntos Gratuitos: 15 (7/5/2/1)</small>
</div>`
  );
}

function healthBuilder() {
  let healthLevel = [
    "Magullado",
    "Lastimado",
    "Lesionado",
    "Herido",
    "Malherido",
    "Tullido",
    "Incapacitado",
  ];
  let healthPoint = [0, -1, -1, -2, -2, -5, 0];
  writer = "";
  for (let i = 0; i < 7; i++) {
    writer += `<div class="row justify-content-center align-items-center g-2">
      <div class="col">
        <small class="form-text text-muted mx-0">${healthLevel[i]}</small>
      </div>
      <div class="col text-center">`;
    if (healthPoint[i] < 0) {
      writer += `<small class="form-text text-muted mx-0">${healthPoint[i]}</small>`;
    } else {
      writer += `<small class="">   </small>`;
    }
    writer += `</div><div class="col justify-content-center align-items-center">`;
    writer += `<canvas id="HP${
      i + 1
    }" class="d-block mx-auto" name="HP_Dot" width=10 height=10 style="border: solid 1px black;" onclick="healthEngine(vamp1,${i})"></canvas>`;
    writer += `</div></div>`;
  }
  return writer;
}

function healthEngine(char, elem) {
  let obj = document.querySelector(`#HP${elem + 1}`);
  let brush = obj.getContext("2d");
  let type = ["contundent", "lethal", "aggravated"];
  if (healthState[elem] == 0) {
    brush.strokeStyle = "black";
    brush.beginPath();
    brush.moveTo(10, 0);
    brush.lineTo(0, 10);
    brush.stroke();
    char.health.contundent++;
    healthState[elem] = 1;
  } else if (healthState[elem] == 1) {
    brush.strokeStyle = "black";
    brush.moveTo(0, 0);
    brush.lineTo(10, 10);
    brush.stroke();
    char.health.contundent--;
    char.health.lethal++;
    healthState[elem] = 2;
  } else if (healthState[elem] == 2) {
    brush.strokeStyle = "black";
    brush.moveTo(0, 5);
    brush.lineTo(10, 5);
    brush.moveTo(5, 0);
    brush.lineTo(5, 10);
    brush.stroke();
    char.health.lethal--;
    char.health.aggravated++;
    healthState[elem] = 3;
  } else {
    brush.clearRect(0,0,10,10);
    char.health.aggravated--;
    healthState[elem] = 0;
  }
  console.log(vamp1.health)
}

function changeClan(char){
  clansBuilder();
  let text;
  let clan = parseInt(document.querySelector("#mainClan").value);
  if(clan == 0){
    text = "";
  }else{
    char.identity.clan = clanList[clan-1];
    text = char.identity.clan.weak;
  }
  document.querySelector("#weak").value = text;
}
