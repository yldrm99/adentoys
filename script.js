const products = [
    { id: 1, ad: "Telefon", fiyat: 10000 },
    { id: 2, ad: "Kulaklık", fiyat: 2000 },
    { id: 3, ad: "Bilgisayar", fiyat: 25000 }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

function sepeteEkle(urunAdi, fiyat) {
    const urun = cart.find(item => item.urunAdi === urunAdi);

    if (urun) {
        urun.adet++;
    } else {
        cart.push({ urunAdi, fiyat, adet: 1 });
    }

    kaydet();
    toplamHesapla();
    sepetiGuncelle();
}

function adetAzalt(index) {
    cart[index].adet--;
    if (cart[index].adet === 0) {
        cart.splice(index, 1);
    }

    kaydet();
    toplamHesapla();
    sepetiGuncelle();
}

function sepetiTemizle() {
    cart = [];
    kaydet();
    toplamHesapla();
    sepetiGuncelle();
}

function toplamHesapla() {
    total = 0;
    cart.forEach(item => {
        total += item.fiyat * item.adet;
    });
}

function kaydet() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function sepetiGuncelle() {
    const cartList = document.getElementById("cart");
    const emptyMessage = document.getElementById("emptyMessage");

    cartList.innerHTML = "";

    if (cart.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.urunAdi} - ${item.fiyat} TL (Adet: ${item.adet})
            <button onclick="sepeteEkle('${item.urunAdi}', ${item.fiyat})">+</button>
            <button onclick="adetAzalt(${index})">-</button>
        `;
        cartList.appendChild(li);
    });

    document.getElementById("total").textContent =
        "Toplam: " + total + " TL";
}

function urunleriGoster() {
    const alan = document.getElementById("productList");
    alan.innerHTML = "";

    products.forEach(urun => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
            <h3>${urun.ad}</h3>
            <p>${urun.fiyat} TL</p>
            <button onclick="sepeteEkle('${urun.ad}', ${urun.fiyat})">
                Sepete Ekle
            </button>
        `;
        alan.appendChild(div);
    });
}

toplamHesapla();
sepetiGuncelle();
urunleriGoster();
