// Sayfa yüklendiğinde çalışacak ana fonksiyon
document.addEventListener('DOMContentLoaded', () => {
    tasarimlariGetir();
});

// JSON dosyasından verileri çeken fonksiyon
function tasarimlariGetir() {
    // fetch komutu ile data.json dosyasını okuyoruz
    fetch('data.json')
        .then(cevap => cevap.json()) // Gelen veriyi JSON formatına çevir
        .then(veriler => {
            tasarimlariEkranaCiz(veriler);
        })
        .catch(hata => console.error("Veri çekilirken hata oluştu:", hata));
}

// Verileri alıp HTML'e yerleştiren fonksiyon
function tasarimlariEkranaCiz(tasarimlar) {
    // Vitrinimizi (HTML'deki main etiketini) seçiyoruz
    const vitrin = document.getElementById('portfolyo-alani');

    // Her bir tasarım için döngü oluşturuyoruz
   tasarimlar.forEach(tasarim => {
        
        // 1. YENİLİK: Renk yuvarlaklarını oluşturacağımız boş bir metin kutusu açıyoruz
        let renkYuvarlaklari = '';
        
        // 2. YENİLİK: JSON'daki renk listesinin içinde dönüyoruz
        tasarim.renk.forEach(tekilRenk => {
            // Her bir renk için HTML kodunu oluşturup metin kutumuza ekliyoruz
            renkYuvarlaklari += `<span class="renk-kutusu" style="background-color: ${tekilRenk};" title="${tekilRenk}"></span>`;
        });

        // Yeni bir div (kart) oluşturuyoruz
        const kart = document.createElement('div');
        kart.classList.add('tasarim-karti'); 

        // Kartın içindeki HTML yapısını oluşturuyoruz
        kart.innerHTML = `
            <img src="${tasarim.resim}" alt="${tasarim.isim}">
            <div class="tasarim-bilgi">
                <h3>${tasarim.isim}</h3>
                <p>${tasarim.aciklama}</p>
                <div class="renkler-alani">
                    ${renkYuvarlaklari}
                </div>
            </div>
        `;

        // Oluşturduğumuz kartı HTML'deki vitrinimize ekliyoruz
        vitrin.appendChild(kart);
    });
}