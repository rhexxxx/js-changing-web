// DATA BANGUN RUANG
const shapes = [
    {
        id: "cube",
        label: "Kubus",
        description: "Semua sisinya berbentuk persegi dan sama panjang.",
        example: "Contohnya dadu!",
        color: "#ed8fac",
        fields: [
            { key: "side", label: "Panjang sisi (s)", placeholder: "Isi panjang sisi" }
        ]
    },
    {
        id: "sphere",
        label: "Bola",
        description: "Permukaannya melengkung dan semua titiknya sama jauh dari pusat.",
        example: "Contohnya bola basket!",
        color: "#8bd5ed",
        fields: [
            { key: "radius", label: "Jari-jari (r)", placeholder: "Isi jari-jari" }
        ]
    },
    {
        id: "cone",
        label: "Kerucut",
        description: "Memiliki alas berbentuk lingkaran dan satu titik puncak.",
        example: "Contohnya topi ulang tahun!",
        color: "#ffc76d",
        fields: [
            { key: "radius", label: "Jari-jari (r)", placeholder: "Isi jari-jari" },
            { key: "height", label: "Tinggi (t)", placeholder: "Isi tinggi" }
        ]
    },
    {
        id: "cylinder",
        label: "Tabung",
        description: "Memiliki dua alas lingkaran yang sama besar dan sejajar.",
        example: "Contohnya kaleng susu!",
        color: "#92dda0",
        fields: [
            { key: "radius", label: "Jari-jari (r)", placeholder: "Isi jari-jari" },
            { key: "height", label: "Tinggi (t)", placeholder: "Isi tinggi" }
        ]
    }
];

// DATA IKON SVG
const icons = {
    cube: `
        <path d="M18 27 40 15l22 12-22 13Z" fill="#fff"/>
        <path d="M18 27v26l22 13V40Z" fill="#f2a0b8"/>
        <path d="M62 27v26L40 66V40Z" fill="#df789c"/>
    `,
    sphere: `
        <circle cx="40" cy="40" r="25" fill="#91d8ef"/>
        <path d="M17 40c9-7 37-7 46 0M17 40c9 7 37 7 46 0"
            fill="none" stroke-dasharray="3 4"/>
    `,
    cone: `
        <path d="M40 12 19 58c7 8 35 8 42 0Z" fill="#ffc66c"/>
        <path d="M19 58c8 8 34 8 42 0" fill="none"/>
    `,
    cylinder: `
        <path d="M22 23v35c0 8 36 8 36 0V23" fill="#91dfa1"/>
        <ellipse cx="40" cy="23" rx="18" ry="7" fill="#b9efbf"/>
        <path d="M22 58c0 8 36 8 36 0" fill="none"/>
    `
};

// ELEMEN HTML
const $ = selector => document.querySelector(selector);

const tabsContainer = $("#shape-tabs");
const form = $("#calculator-form");
const numberFields = $("#number-fields");
const selectGrid = $("#select-grid");
const piField = $("#pi-field");
const result = $("#result");

let activeId = "cube";

// MENCARI DATA BANGUN RUANG AKTIF
function getActiveShape() {
    return shapes.find(shape => shape.id === activeId);
}

// MEMBUAT IKON SVG
function shapeIcon(type, size = 72) {
    return `
        <svg width="${size}" height="${size}" viewBox="0 0 80 80"
            aria-hidden="true" stroke="#252c46" stroke-width="3"
            stroke-linecap="round" stroke-linejoin="round">
            ${icons[type]}
        </svg>
    `;
}

// MENYEMBUNYIKAN HASIL
function hideResult() {
    result.hidden = true;
}

// MENAMPILKAN TOMBOL BANGUN RUANG
function renderTabs() {
    tabsContainer.innerHTML = shapes.map(shape => `
        <button type="button"
            class="shape-tab${shape.id === activeId ? " active" : ""}"
            data-shape="${shape.id}"
            style="--shape-color: ${shape.color}"
            aria-pressed="${shape.id === activeId}">
            ${shapeIcon(shape.id, 58)}
            <span>${shape.label}</span>
        </button>
    `).join("");
}

// MEMBUAT INPUT SESUAI BANGUN RUANG
function renderFields(shape) {
    numberFields.className = shape.fields.length > 1 ? "field-grid" : "";

    numberFields.innerHTML = shape.fields.map(field => `
        <label class="field">
            <span>${field.label}</span>
            <input id="${field.key}" name="${field.key}" type="number"
                inputmode="decimal" min="0" step="any" required
                placeholder="${field.placeholder}">
        </label>
    `).join("");
}

// MENAMPILKAN INFORMASI BANGUN RUANG
function renderShape() {
    const shape = getActiveShape();

    $("#shape-title").textContent = shape.label;
    $("#shape-description").textContent = shape.description;
    $("#shape-example").textContent = shape.example;

    const iconDisc = $("#icon-disc");
    iconDisc.style.background = shape.color;
    iconDisc.innerHTML = shapeIcon(shape.id, 96);

    renderFields(shape);

    const isCube = shape.id === "cube";
    piField.hidden = isCube;
    selectGrid.classList.toggle("single", isCube);

    hideResult();
}

// RUMUS PERHITUNGAN VOLUME
const volumeCalculations = {
    cube: ({ side }) => side ** 3,
    sphere: ({ radius }, pi) => (4 / 3) * pi * radius ** 3,
    cone: ({ radius, height }, pi) => (1 / 3) * pi * radius ** 2 * height,
    cylinder: ({ radius, height }, pi) => pi * radius ** 2 * height
};

// MENGAMBIL NILAI INPUT
function getInputValues(shape) {
    const values = {};

    shape.fields.forEach(field => {
        values[field.key] = Number($(`#${field.key}`).value);
    });

    return values;
}

// MEMERIKSA INPUT
function isValidInput(shape, values) {
    return shape.fields.every(field =>
        Number.isFinite(values[field.key]) && values[field.key] > 0
    );
}

// MENAMPILKAN HASIL PERHITUNGAN
function showResult(shape, volume) {
    const unit = $("#unit").value;

    const formattedVolume = new Intl.NumberFormat("id-ID", {
        maximumFractionDigits: 2
    }).format(volume);

    $("#result-label").textContent = `Volume ${shape.label}`;
    $("#result-value").innerHTML = `${formattedVolume} ${unit}<sup>3</sup>`;

    result.hidden = false;
}

// EVENT: MEMILIH BANGUN RUANG
tabsContainer.addEventListener("click", event => {
    const button = event.target.closest("[data-shape]");

    if (!button || button.dataset.shape === activeId) return;

    activeId = button.dataset.shape;

    renderTabs();
    renderShape();
});

// EVENT: MENYEMBUNYIKAN HASIL SAAT INPUT BERUBAH
form.addEventListener("input", hideResult);
form.addEventListener("change", hideResult);

// EVENT: MENGHITUNG VOLUME
form.addEventListener("submit", event => {
    event.preventDefault();

    const shape = getActiveShape();
    const values = getInputValues(shape);

    if (!isValidInput(shape, values)) return;

    const pi = $("#pi-mode").value === "22/7" ? 22 / 7 : Math.PI;

    const volume = volumeCalculations[shape.id](values, pi);

    showResult(shape, volume);
});

// MENJALANKAN TAMPILAN AWAL
renderTabs();
renderShape();