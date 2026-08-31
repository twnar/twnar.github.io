# Tunar Ahmadzada — Portfolyo Sitesi

Bu site tamamen statik (HTML/CSS/JS) dosyalardan oluşuyor, hiçbir sunucu veya build adımı gerekmiyor. Tüm içerik **`data.json`** dosyasından okunuyor — yani kod bilmeden, sadece o dosyayı düzenleyerek projeleri, deneyimleri, ödülleri güncelleyebilirsin.

## 1. GitHub'a yükleme

1. [github.com](https://github.com) üzerinde yeni bir repo oluştur.
   - İsmi önemli: eğer repo adını `kullaniciadin.github.io` yaparsan site direkt `https://kullaniciadin.github.io` adresinde yayınlanır.
   - Farklı bir isim verirsen (ör. `portfolio`), site `https://kullaniciadin.github.io/portfolio` adresinde yayınlanır. İkisi de çalışır.
2. Bu klasördeki tüm dosyaları (`index.html`, `style.css`, `script.js`, `data.json`, `assets/` klasörü, bu `README.md`) o reponun içine yükle.
   - En kolay yol: GitHub repo sayfasında **"Add file" → "Upload files"** butonunu kullanıp klasördeki dosyaları sürükle-bırak yapmak.
3. Repo ayarlarına git: **Settings → Pages**.
4. **"Build and deployment"** altında **Source** olarak **"Deploy from a branch"** seç.
5. **Branch** olarak `main` (veya `master`) ve klasör olarak `/ (root)` seç, **Save** tıkla.
6. Birkaç dakika içinde site yayına girer; aynı Pages ayarları sayfasında linkini göreceksin.

## 2. İçeriği düzenleme (`data.json`)

Yeni bir başarı, proje veya deneyim eklemek/kaldırmak istediğinde tek yapman gereken `data.json` dosyasını düzenlemek. GitHub'da dosyanın üzerine tıklayıp sağ üstteki kalem (✏️) ikonuna basarak tarayıcı üzerinden bile düzenleyebilirsin — kod indirmene gerek yok.

### Yeni bir proje eklemek
`"projects"` listesine şu formatta yeni bir blok ekle:

```json
{
  "title": "Proje Adı",
  "tag": "Yarışma / Kategori",
  "year": "2027",
  "description": "Kısa açıklama.",
  "link": "https://proje-linki.com",
  "linkLabel": "Projeyi görüntüle"
}
```
- `link` boş bırakılırsa (`""`), buton görünmez.
- Bir bloğu silmek için o `{ ... }` kısmını komple kaldır (virgülleri de düzgün bırakmayı unutma).

### Yeni bir deneyim eklemek
`"experience"` listesine:

```json
{
  "role": "Görev Adı",
  "org": "Kurum / Yer",
  "period": "2027 – Present",
  "points": [
    "Birinci madde.",
    "İkinci madde."
  ]
}
```

### Yeni bir ödül eklemek
`"awards"` listesine:

```json
{ "title": "Ödül Adı", "detail": "Detay / kategori", "year": "2027" }
```

### CV'yi güncellemek
1. Yeni CV PDF'ini `assets/` klasörüne yükle (aynı isimle üzerine yazabilir ya da farklı isim verip `data.json`'daki `"cvFile"` alanını güncelleyebilirsin).
2. `data.json` içindeki:
   ```json
   "cvFile": "assets/Tunar_Ahmadzada_CV.pdf"
   ```
   satırını yeni dosya adına göre güncelle.

### İletişim linkleri (GitHub, LinkedIn vb.)
`data.json`'ın en altındaki `"links"` bölümünü doldur:

```json
"links": {
  "email": "mailto:twnarx@gmail.com",
  "github": "https://github.com/kullaniciadin",
  "linkedin": "https://linkedin.com/in/kullaniciadin"
}
```
Boş bırakılan (`""`) linkler sitede gösterilmez.

## 3. JSON düzenlerken dikkat edilecekler

- Her `{ }` bloğundan sonra bir sonraki blok geliyorsa virgül (`,`) koy, listenin son elemanından sonra virgül **koyma**.
- Tüm metinler çift tırnak (`"`) içinde olmalı.
- Değişiklik yaptıktan sonra JSON'un bozuk olup olmadığını kontrol etmek istersen [jsonlint.com](https://jsonlint.com) gibi bir siteye yapıştırıp doğrulayabilirsin.
- GitHub Pages değişiklikleri genelde 30 saniye - 2 dakika içinde yayına yansır; görmüyorsan tarayıcıda sert yenileme (Ctrl+Shift+R) yap.

## Dosya yapısı

```
├── index.html      → sayfa iskeleti (genelde dokunmana gerek yok)
├── style.css        → görsel tasarım (genelde dokunmana gerek yok)
├── script.js         → data.json'ı okuyup sayfaya basan kod (genelde dokunmana gerek yok)
├── data.json         → SENİN DÜZENLEYECEĞİN DOSYA — tüm içerik burada
├── assets/
│   └── Tunar_Ahmadzada_CV.pdf   → CV dosyası, "Download CV" butonuna bağlı
└── README.md         → bu dosya
```
