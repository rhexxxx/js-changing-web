let Shape = '';

window.onload = function(){
    let Kubus = document.getElementById("cardKubus");
    selectShape("kubus", Kubus);
};

function selectShape(shape, element){
    Shape = shape;
    let cards = document.querySelectorAll(".card");
    cards.forEach(card => card.classList.remove('active'));
    element.classList.add('active');

    let container = document.getElementById("input");
    let dynamicInput = document.getElementById("dynamicinput");
    let title = document.getElementById("title");
    let desc = document.getElementById("desc");
    const img = document.getElementById("img");
    
    document.getElementById('resultDisplay').style.display = "none";
    container.style.display = "block";

    title.innerText = Shape.charAt(0).toUpperCase() + shape.slice(1);
    
    if(Shape == 'kubus'){
        img.src = "img/cube.png";
        desc.innerHTML = "Semua Sisi berbentuk persegi dan sama panjang <br> contohnya dadu";
        dynamicInput.innerHTML = '<div class="input-group"><label>Sisi(s)</label><input type="number" id="sisi" placeholder="Masukan sisi"></div>';
    } else if(Shape == 'bola'){
        img.src = "img/ball.png";
        desc.innerHTML = "bulat sempurna <br> contohnya bola";
        dynamicInput.innerHTML = '<div class="input-group"><label>Jari-jari(r)</label><input type="number" id="jari" placeholder="Masukan jari jari"></div>';
    } else if(Shape == 'tabung'){
        img.src = "img/tube.png";
        desc.innerHTML = "Dua lingkaran, dibungkus dengan kulit <br> contohnya pipa";
        dynamicInput.innerHTML = '<div class="input-group"><label>Jari - jari (r)</label> <input type="number" id="jari" placeholder="Masukan jari jari"></div><div class="input-group"><label>Tinggi (t)</label><input type="number" id="tinggi" placeholder="masukan tinggi"></div>';
    }
}

function Hitung(){
    let resultDisplay = document.getElementById("resultDisplay");
    let satuan = document.getElementById('satuan').value;
    let volume = 0;
    let luas = 0;

    if(Shape == 'kubus'){
        let s = parseFloat(document.getElementById('sisi').value);
        if(isNaN(s) || s<=0) return alert("Masukan nilai yang sesuai!!!");
        luas = 6 * (s*s);
        volume = s*s*s;
    } else if(Shape == 'bola'){ 
        let r = parseFloat(document.getElementById('jari').value);
        if(isNaN(r) || r<=0) return alert("Masukan nilai yang sesuai!!!");
        luas = 4 * Math.PI * (r*r);
        volume = (4/3) * Math.PI * (r*r*r);
    } else if(Shape == 'tabung'){
        let r = parseFloat(document.getElementById('jari').value);
        let t = parseFloat(document.getElementById('tinggi').value);
        if(isNaN(r) || r<=0 || isNaN(t) || t<=0) return alert("Masukan nilai yang sesuai!!!");
        luas = 2 * Math.PI * r * (r+t);
        volume = Math.PI * (r * r) * t;
    }

    resultDisplay.innerHTML = 'Luas Permukaan : ' + luas.toFixed(2) + ' ' + satuan + '² <br> Volume: ' + volume.toFixed(2) + ' ' + satuan + '³';
    resultDisplay.style.display = "block";
}