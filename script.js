// DATA BANGUN RUANG
// Array shapes digunakan untuk menyimpan data dari setiap bangun ruang.
// Setiap bangun ruang memiliki id, nama, deskripsi, contoh, warna, dan input yang dibutuhkan.
const shapes = [
    {
        id: "cube", // Identitas bangun ruang kubus
        label: "Kubus", // Nama yang ditampilkan pada halaman
        description: "Semua sisinya berbentuk persegi dan sama panjang.", // Penjelasan kubus
        example: "Contohnya dadu!", // Contoh benda berbentuk kubus
        color: "#ed8fac", // Warna khusus untuk kubus
        fields: [
            {
                key: "side", // Nama variabel untuk panjang sisi
                label: "Panjang sisi (s)", // Teks label input
                placeholder: "Isi panjang sisi" // Petunjuk pada kolom input
            }
        ]
    },
    {
        id: "sphere", // Identitas bangun ruang bola
        label: "Bola",
        description: "Permukaannya melengkung dan semua titiknya sama jauh dari pusat.",
        example: "Contohnya bola basket!",
        color: "#8bd5ed",
        fields: [
            {
                key: "radius", // Nama variabel untuk jari-jari
                label: "Jari-jari (r)",
                placeholder: "Isi jari-jari"
            }
        ]
    },
    {
        id: "cone", // Identitas bangun ruang kerucut
        label: "Kerucut",
        description: "Memiliki alas berbentuk lingkaran dan satu titik puncak.",
        example: "Contohnya topi ulang tahun!",
        color: "#ffc76d",
        fields: [
            {
                key: "radius", // Input jari-jari alas kerucut
                label: "Jari-jari (r)",
                placeholder: "Isi jari-jari"
            },
            {
                key: "height", // Input tinggi kerucut
                label: "Tinggi (t)",
                placeholder: "Isi tinggi"
            }
        ]
    },
    {
        id: "cylinder", // Identitas bangun ruang tabung
        label: "Tabung",
        description: "Memiliki dua alas lingkaran yang sama besar dan sejajar.",
        example: "Contohnya kaleng susu!",
        color: "#92dda0",
        fields: [
            {
                key: "radius", // Input jari-jari tabung
                label: "Jari-jari (r)",
                placeholder: "Isi jari-jari"
            },
            {
                key: "height", // Input tinggi tabung
                label: "Tinggi (t)",
                placeholder: "Isi tinggi"
            }
        ]
    }
];

// VARIABEL BANGUN RUANG AKTIF
// Menentukan bangun ruang yang pertama kali dipilih saat halaman dibuka.
// Nilai awalnya adalah "cube", yaitu kubus.
let activeId = "cube";

// MENGAMBIL ELEMEN HTML
// document.querySelector digunakan untuk mengambil elemen HTML
// berdasarkan selector atau id yang sudah ditentukan.
const app = document.querySelector("#app");
const tabsContainer = document.querySelector("#shape-tabs");
const form = document.querySelector("#calculator-form");
const numberFields = document.querySelector("#number-fields");
const selectGrid = document.querySelector("#select-grid");
const piField = document.querySelector("#pi-field");
const result = document.querySelector("#result");

// FUNGSI MENAMPILKAN IKON BANGUN RUANG
// Fungsi shapeIcon digunakan untuk membuat gambar SVG
// berdasarkan jenis bangun ruang yang dipilih.
// Parameter type menentukan jenis bangun ruang.
// Parameter size menentukan ukuran ikon, dengan nilai awal 72.
function shapeIcon(type, size = 72) {

    // Object icons menyimpan kode gambar SVG untuk setiap bangun ruang.
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

    // Mengembalikan kode SVG sesuai jenis bangun ruang yang dipilih.
    // Template literal (`) digunakan agar kode HTML dan SVG bisa ditulis dalam beberapa baris.
    // ${size} digunakan untuk memasukkan ukuran ikon.
    // ${icons[type]} digunakan untuk memasukkan gambar sesuai jenis bangun ruang.
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
// Fungsi hideResult digunakan untuk menyembunyikan
// bagian hasil perhitungan dengan mengubah properti hidden menjadi true.
function hideResult() {
    result.hidden = true;
}

// FUNGSI MENAMPILKAN TOMBOL BANGUN RUANG
// Fungsi renderTabs digunakan untuk menampilkan tombol pilihan bangun ruang.
function renderTabs() {

    // map() digunakan untuk mengulang setiap data bangun ruang dalam array shapes.
    // Setiap data dibuat menjadi sebuah tombol HTML.
    // Ternary operator digunakan untuk menentukan apakah tombol sedang aktif.
    // join("") digunakan untuk menggabungkan seluruh tombol menjadi satu string HTML.
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

// FUNGSI MENAMPILKAN DETAIL BANGUN RUANG
// Fungsi renderShape digunakan untuk menampilkan informasi
// dan kolom input sesuai bangun ruang yang sedang dipilih.
function renderShape() {

    // find() digunakan untuk mencari data bangun ruang
    // yang memiliki id sama dengan activeId.
    const shape = shapes.find(item => item.id === activeId);

    // Mengubah judul, deskripsi, dan contoh sesuai bangun ruang yang dipilih.
    document.querySelector("#shape-title").textContent = shape.label;
    document.querySelector("#shape-description").textContent = shape.description;
    document.querySelector("#shape-example").textContent = shape.example;

    // Mengambil elemen tempat ikon bangun ruang ditampilkan.
    const iconDisc = document.querySelector("#icon-disc");

    // Mengubah warna latar ikon sesuai warna bangun ruang.
    iconDisc.style.background = shape.color;

    // Menampilkan ikon bangun ruang ke dalam elemen HTML.
    iconDisc.innerHTML = shapeIcon(shape.id, 96);

    // Mengatur tampilan kolom input.
    // Jika input lebih dari satu, gunakan class field-grid.
    // Jika hanya satu, class dikosongkan.
    numberFields.className = shape.fields.length > 1 ? "field-grid" : "";

    // Membuat kolom input secara otomatis berdasarkan data fields.
    // map() mengulang setiap input yang dibutuhkan.
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

    // Mengecek apakah bangun ruang yang dipilih adalah kubus.
    const isCube = activeId === "cube";

    // Menyembunyikan pilihan nilai phi jika bangun ruang adalah kubus.
    piField.hidden = isCube;

    // Mengatur tampilan pilihan berdasarkan jenis bangun ruang.
    selectGrid.classList.toggle("single", isCube);

    // Menyembunyikan hasil perhitungan sebelumnya.
    hideResult();
}

// EVENT LISTENER UNTUK TOMBOL BANGUN RUANG
// addEventListener("click") digunakan untuk mendeteksi
// ketika pengguna mengklik salah satu tombol bangun ruang.
tabsContainer.addEventListener("click", event => {

    // closest() mencari tombol dengan atribut data-shape
    // dari elemen yang diklik atau elemen induknya.
    const button = event.target.closest("[data-shape]");

    // Jika elemen yang diklik bukan tombol bangun ruang
    // atau tombol yang dipilih sudah aktif, hentikan fungsi.
    if (!button || button.dataset.shape === activeId) {
        return;
    }

    // Mengubah activeId sesuai tombol bangun ruang yang diklik.
    activeId = button.dataset.shape;

    // Memperbarui tampilan tombol pilihan bangun ruang.
    renderTabs();

    // Memperbarui informasi dan kolom input bangun ruang.
    renderShape();
});

// EVENT LISTENER PADA FORM INPUT
// Ketika pengguna mengubah isi input,
// hasil perhitungan sebelumnya akan disembunyikan.
form.addEventListener("input", hideResult);

// Ketika pengguna mengubah pilihan pada form,
// hasil perhitungan sebelumnya juga akan disembunyikan.
form.addEventListener("change", hideResult);

// EVENT LISTENER UNTUK PROSES PERHITUNGAN
// addEventListener("submit") digunakan untuk menjalankan
// proses perhitungan ketika form dikirim atau tombol hitung ditekan.
form.addEventListener("submit", event => {

    // Mencegah halaman melakukan refresh secara otomatis
    // ketika form dikirim.
    event.preventDefault();

    // Mencari data bangun ruang yang sedang dipilih.
    const shape = shapes.find(item => item.id === activeId);

    // Membuat object kosong untuk menyimpan nilai input pengguna.
    const values = {};

    // Mengambil seluruh nilai input sesuai kebutuhan bangun ruang.
    shape.fields.forEach(field => {

        // Number() mengubah nilai input yang awalnya berbentuk teks
        // menjadi tipe data angka agar bisa digunakan dalam perhitungan.
        values[field.key] = Number(
            document.querySelector(`#${field.key}`).value
        );
    });

    // Memeriksa apakah nilai input valid.
    // some() digunakan untuk mengecek apakah ada input yang tidak memenuhi syarat.
    // Number.isFinite() memastikan nilai merupakan angka yang valid.
    // Nilai harus lebih besar dari 0.
    if (shape.fields.some(field =>
        !Number.isFinite(values[field.key]) ||
        values[field.key] <= 0
    )) {
        return;
    }

    // Menentukan nilai phi yang digunakan dalam perhitungan.
    // Jika pengguna memilih 22/7, maka nilai phi adalah 22 dibagi 7.
    // Jika tidak, maka menggunakan nilai Math.PI dari JavaScript.
    const pi = document.querySelector("#pi-mode").value === "22/7"
        ? 22 / 7
        : Math.PI;

    // Membuat variabel volume dengan nilai awal 0.
    // Variabel ini akan menyimpan hasil perhitungan volume.
    let volume = 0;

    // Mengecek jenis bangun ruang dan menjalankan rumus yang sesuai.

    // Rumus volume kubus = sisi × sisi × sisi.
    if (activeId === "cube") {
        volume = values.side ** 3;

    // Rumus volume bola = 4/3 × phi × jari-jari pangkat 3.
    } else if (activeId === "sphere") {
        volume = (4 / 3) * pi * values.radius ** 3;

    // Rumus volume kerucut = 1/3 × phi × jari-jari kuadrat × tinggi.
    } else if (activeId === "cone") {
        volume = (1 / 3) * pi * values.radius ** 2 * values.height;

    // Rumus volume tabung = phi × jari-jari kuadrat × tinggi.
    } else if (activeId === "cylinder") {
        volume = pi * values.radius ** 2 * values.height;
    }

    // Mengambil satuan panjang yang dipilih oleh pengguna.
    const unit = document.querySelector("#unit").value;

    // Menampilkan judul hasil perhitungan sesuai nama bangun ruang.
    document.querySelector("#result-label").textContent =
        `Volume ${shape.label}`;

    // Menampilkan hasil perhitungan volume.
    // Intl.NumberFormat("id-ID") digunakan untuk mengatur format angka Indonesia.
    // maximumFractionDigits: 2 membatasi angka di belakang koma maksimal 2 digit.
    // format(volume) mengubah hasil perhitungan menjadi format angka yang mudah dibaca.
    // <sup>3</sup> digunakan untuk menampilkan angka 3 sebagai pangkat pada satuan volume.
    document.querySelector("#result-value").innerHTML =
        `${new Intl.NumberFormat("id-ID", {
            maximumFractionDigits: 2
        }).format(volume)} ${unit}<sup>3</sup>`;

    // Menampilkan bagian hasil perhitungan setelah proses selesai.
    result.hidden = false;
});

// MENJALANKAN FUNGSI SAAT HALAMAN DIBUKA
// Menampilkan seluruh tombol pilihan bangun ruang saat halaman pertama kali dibuka.
renderTabs();

// Menampilkan informasi dan kolom input bangun ruang yang aktif, yaitu kubus.
renderShape();