// DATA BANGUN RUANG
// Array untuk menyimpan data empat bangun ruang.
// Setiap bangun ruang disimpan dalam bentuk object.
const shapes = [
    {
        id: "cube", // Identitas bangun ruang
        label: "Kubus", // Nama yang ditampilkan
        description: "Semua sisinya berbentuk persegi dan sama panjang.",
        example: "Contohnya dadu!",
        color: "#ed8fac", // Warna bangun ruang

        // Input yang diperlukan untuk menghitung volume kubus
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

        // Bola hanya membutuhkan input jari-jari
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

        // Kerucut membutuhkan jari-jari dan tinggi
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

        // Tabung membutuhkan jari-jari dan tinggi
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


// VARIABEL BANGUN RUANG AKTIF
// Menentukan bangun ruang yang pertama kali dipilih.
// Nilainya dapat berubah ketika pengguna memilih bangun lain.
let activeId = "cube";


// MENGAMBIL ELEMEN HTML (DOM)
// Mengambil elemen HTML berdasarkan ID menggunakan querySelector().
const app = document.querySelector("#app");
const tabsContainer = document.querySelector("#shape-tabs");
const form = document.querySelector("#calculator-form");
const numberFields = document.querySelector("#number-fields");
const selectGrid = document.querySelector("#select-grid");
const piField = document.querySelector("#pi-field");
const result = document.querySelector("#result");


// FUNGSI MEMBUAT IKON BANGUN RUANG
// Membuat gambar bangun ruang menggunakan SVG.
// Parameter type menentukan jenis bangun ruang.
// Parameter size menentukan ukuran gambar, default 72.
function shapeIcon(type, size = 72) {

    // Object untuk menyimpan kode SVG setiap bangun ruang.
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

    // Mengembalikan kode SVG sesuai jenis dan ukuran yang dipilih.
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


// FUNGSI MENYEMBUNYIKAN HASIL
// Menyembunyikan hasil perhitungan dari halaman.
function hideResult() {
    result.hidden = true;
}


// FUNGSI MEMBUAT TOMBOL BANGUN RUANG
// Membuat tombol pilihan bangun ruang secara otomatis.
function renderTabs() {

    // map() digunakan untuk membaca setiap data bangun ruang.
    // Hasilnya dibuat menjadi tombol HTML.
    tabsContainer.innerHTML = shapes.map(shape => `
        <button
            type="button"

            // Menambahkan class active jika tombol sedang dipilih.
            class="shape-tab${shape.id === activeId ? " active" : ""}"

            // Menyimpan ID bangun ruang pada tombol.
            data-shape="${shape.id}"

            // Mengatur warna tombol sesuai data bangun ruang.
            style="--shape-color: ${shape.color}"

            // Menandai tombol yang sedang aktif.
            aria-pressed="${shape.id === activeId}"
        >
            ${shapeIcon(shape.id, 58)}
            <span>${shape.label}</span>
        </button>
    `).join(""); // Menggabungkan seluruh hasil menjadi satu HTML.
}


// FUNGSI MENAMPILKAN INFORMASI BANGUN RUANG
function renderShape() {

    // Mencari data bangun ruang berdasarkan ID yang sedang aktif.
    const shape = shapes.find(item => item.id === activeId);

    // Mengubah judul, deskripsi, dan contoh pada halaman HTML.
    document.querySelector("#shape-title").textContent = shape.label;
    document.querySelector("#shape-description").textContent = shape.description;
    document.querySelector("#shape-example").textContent = shape.example;

    // Mengambil tempat untuk menampilkan ikon bangun ruang.
    const iconDisc = document.querySelector("#icon-disc");

    // Mengubah warna latar belakang ikon.
    iconDisc.style.background = shape.color;

    // Menampilkan gambar bangun ruang sesuai pilihan.
    iconDisc.innerHTML = shapeIcon(shape.id, 96);

    // Mengatur tampilan input.
    // Jika input lebih dari satu, menggunakan tampilan grid.
    numberFields.className = shape.fields.length > 1 ? "field-grid" : "";

    // Membuat input secara otomatis berdasarkan data fields.
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

    // Memeriksa apakah bangun ruang yang dipilih adalah kubus.
    const isCube = activeId === "cube";

    // Menyembunyikan pilihan nilai pi jika memilih kubus.
    piField.hidden = isCube;

    // Mengatur pilihan satuan menjadi satu kolom jika kubus dipilih.
    selectGrid.classList.toggle("single", isCube);

    // Menyembunyikan hasil perhitungan sebelumnya.
    hideResult();
}


// EVENT LISTENER UNTUK PILIHAN BANGUN RUANG
// Mendeteksi ketika pengguna mengklik pilihan bangun ruang.
tabsContainer.addEventListener("click", event => {

    // Mencari tombol terdekat yang memiliki atribut data-shape.
    const button = event.target.closest("[data-shape]");

    // Jika tombol tidak ditemukan atau tombol yang sama dipilih,
    // maka proses dihentikan.
    if (!button || button.dataset.shape === activeId) {
        return;
    }

    // Mengubah bangun ruang aktif sesuai tombol yang diklik.
    activeId = button.dataset.shape;

    // Memperbarui tombol pilihan dan informasi bangun ruang.
    renderTabs();
    renderShape();
});


// EVENT LISTENER UNTUK PERUBAHAN INPUT
// Menyembunyikan hasil ketika pengguna mengetik atau mengubah input.
form.addEventListener("input", hideResult);

// Menyembunyikan hasil ketika pengguna mengubah pilihan pada form.
form.addEventListener("change", hideResult);


// EVENT LISTENER UNTUK PROSES PERHITUNGAN
// Menjalankan perhitungan ketika form dikirim melalui tombol submit.
form.addEventListener("submit", event => {

    // Mencegah halaman melakukan reload ketika form dikirim.
    event.preventDefault();

    // Mengambil data bangun ruang yang sedang dipilih.
    const shape = shapes.find(item => item.id === activeId);

    // Membuat object kosong untuk menyimpan nilai input.
    const values = {};

    // Mengambil seluruh nilai input berdasarkan data fields.
    shape.fields.forEach(field => {

        // Mengambil nilai input HTML dan mengubahnya menjadi angka.
        values[field.key] = Number(
            document.querySelector(`#${field.key}`).value
        );
    });

    // Memeriksa apakah input berupa angka valid dan lebih dari nol.
    // some() mengecek apakah ada input yang memenuhi kondisi.
    if (shape.fields.some(field =>
        !Number.isFinite(values[field.key]) ||
        values[field.key] <= 0
    )) {

        // Menghentikan perhitungan jika input tidak valid.
        return;
    }

    // Mengambil pilihan nilai pi dari pengguna.
    // Jika memilih 22/7, gunakan pembagian 22 dengan 7.
    // Jika tidak, gunakan nilai Math.PI.
    const pi = document.querySelector("#pi-mode").value === "22/7"
        ? 22 / 7
        : Math.PI;

    // Menyiapkan variabel untuk menyimpan hasil volume.
    let volume = 0;

    // Menentukan rumus berdasarkan bangun ruang yang dipilih.

    // Rumus volume kubus: sisi pangkat tiga.
    if (activeId === "cube") {
        volume = values.side ** 3;

    // Rumus volume bola: 4/3 dikali pi dikali jari-jari pangkat tiga.
    } else if (activeId === "sphere") {
        volume = (4 / 3) * pi * values.radius ** 3;

    // Rumus volume kerucut: 1/3 dikali pi dikali jari-jari kuadrat dikali tinggi.
    } else if (activeId === "cone") {
        volume = (1 / 3) * pi * values.radius ** 2 * values.height;

    // Rumus volume tabung: pi dikali jari-jari kuadrat dikali tinggi.
    } else if (activeId === "cylinder") {
        volume = pi * values.radius ** 2 * values.height;
    }

    // Mengambil satuan panjang yang dipilih pengguna.
    const unit = document.querySelector("#unit").value;

    // Menampilkan nama bangun ruang pada bagian hasil.
    document.querySelector("#result-label").textContent =
        `Volume ${shape.label}`;

    // Menampilkan hasil volume dengan format angka Indonesia.
    // Maksimal dua angka di belakang koma.
    // unit digunakan untuk menampilkan satuan panjang.
    // sup digunakan untuk membuat angka 3 menjadi pangkat.
    document.querySelector("#result-value").innerHTML =
        `${new Intl.NumberFormat("id-ID", {
            maximumFractionDigits: 2
        }).format(volume)} ${unit}<sup>3</sup>`;

    // Menampilkan hasil perhitungan pada halaman.
    result.hidden = false;
});


// MENJALANKAN PROGRAM PERTAMA KALI
// Membuat tombol pilihan bangun ruang ketika halaman dibuka.
renderTabs();

// Menampilkan informasi dan input bangun ruang pertama, yaitu kubus.
renderShape();
