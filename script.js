const shapes = [
    {
        id: "cube",
        label: "Kubus",
        description: "Semua sisinya berbentuk persegi dan sama panjang.",
        example: "Contohnya dadu!",
        color: "#ed8fac",
        fields: [
            {
                key: "side",
                label: "Panjang sisi (s)",
                placeholder: "Isi panjang sisi"
            }
        ]
    },
    {
        id: "sphere",
        label: "Bola",
        description: "Permukaannya melengkung dan semua titiknya sama jauh dari pusat.",
        example: "Contohnya bola basket!",
        color: "#8bd5ed",
        fields: [
            {
                key: "radius",
                label: "Jari-jari (r)",
                placeholder: "Isi jari-jari"
            }
        ]
    },
    {
        id: "cone",
        label: "Kerucut",
        description: "Memiliki alas berbentuk lingkaran dan satu titik puncak.",
        example: "Contohnya topi ulang tahun!",
        color: "#ffc76d",
        fields: [
            {
                key: "radius",
                label: "Jari-jari (r)",
                placeholder: "Isi jari-jari"
            },
            {
                key: "height",
                label: "Tinggi (t)",
                placeholder: "Isi tinggi"
            }
        ]
    },
    {
        id: "cylinder",
        label: "Tabung",
        description: "Memiliki dua alas lingkaran yang sama besar dan sejajar.",
        example: "Contohnya kaleng susu!",
        color: "#92dda0",
        fields: [
            {
                key: "radius",
                label: "Jari-jari (r)",
                placeholder: "Isi jari-jari"
            },
            {
                key: "height",
                label: "Tinggi (t)",
                placeholder: "Isi tinggi"
            }
        ]
    }
];

let activeId = "cube";

const app = document.querySelector("#app");
const tabsContainer = document.querySelector("#shape-tabs");
const form = document.querySelector("#calculator-form");
const numberFields = document.querySelector("#number-fields");
const selectGrid = document.querySelector("#select-grid");
const piField = document.querySelector("#pi-field");
const result = document.querySelector("#result");

function shapeIcon(type, size = 72) {
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

    return `
        <svg
            width="${size}"
            height="${size}"
            viewBox="0 0 80 80"
            aria-hidden="true"
            stroke="#252c46"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            ${icons[type]}
        </svg>
    `;
}

function hideResult() {
    result.hidden = true;
}

function renderTabs() {
    tabsContainer.innerHTML = shapes.map(shape => `
        <button
            type="button"
            class="shape-tab${shape.id === activeId ? " active" : ""}"
            data-shape="${shape.id}"
            style="--shape-color: ${shape.color}"
            aria-pressed="${shape.id === activeId}"
        >
            ${shapeIcon(shape.id, 58)}
            <span>${shape.label}</span>
        </button>
    `).join("");
}

function renderShape() {
    const shape = shapes.find(item => item.id === activeId);

    document.querySelector("#shape-title").textContent = shape.label;
    document.querySelector("#shape-description").textContent = shape.description;
    document.querySelector("#shape-example").textContent = shape.example;

    const iconDisc = document.querySelector("#icon-disc");
    iconDisc.style.background = shape.color;
    iconDisc.innerHTML = shapeIcon(shape.id, 96);

    numberFields.className = shape.fields.length > 1 ? "field-grid" : "";

    numberFields.innerHTML = shape.fields.map(field => `
        <label class="field">
            <span>${field.label}</span>
            <input
                id="${field.key}"
                name="${field.key}"
                type="number"
                inputmode="decimal"
                min="0"
                step="any"
                required
                placeholder="${field.placeholder}"
            >
        </label>
    `).join("");

    const isCube = activeId === "cube";

    piField.hidden = isCube;
    selectGrid.classList.toggle("single", isCube);

    hideResult();
}

tabsContainer.addEventListener("click", event => {
    const button = event.target.closest("[data-shape]");

    if (!button || button.dataset.shape === activeId) {
        return;
    }

    activeId = button.dataset.shape;

    renderTabs();
    renderShape();
});

form.addEventListener("input", hideResult);
form.addEventListener("change", hideResult);

form.addEventListener("submit", event => {
    event.preventDefault();

    const shape = shapes.find(item => item.id === activeId);

    const values = {};

    shape.fields.forEach(field => {
        values[field.key] = Number(
            document.querySelector(`#${field.key}`).value
        );
    });

    if (shape.fields.some(field =>
        !Number.isFinite(values[field.key]) ||
        values[field.key] <= 0
    )) {
        return;
    }

    const pi = document.querySelector("#pi-mode").value === "22/7"
        ? 22 / 7
        : Math.PI;

    let volume = 0;

    if (activeId === "cube") {
        volume = values.side ** 3;
    } else if (activeId === "sphere") {
        volume = (4 / 3) * pi * values.radius ** 3;
    } else if (activeId === "cone") {
        volume = (1 / 3) * pi * values.radius ** 2 * values.height;
    } else if (activeId === "cylinder") {
        volume = pi * values.radius ** 2 * values.height;
    }

    const unit = document.querySelector("#unit").value;

    document.querySelector("#result-label").textContent =
        `Volume ${shape.label}`;

    document.querySelector("#result-value").innerHTML =
        `${new Intl.NumberFormat("id-ID", {
            maximumFractionDigits: 2
        }).format(volume)} ${unit}<sup>3</sup>`;

    result.hidden = false;
});

renderTabs();
renderShape();