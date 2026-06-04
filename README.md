# 🔐 SecureGen - Advanced Password Generator

Aplikasi web responsif untuk menghasilkan kata sandi acak dengan standar keamanan tinggi. Proyek ini mendemonstrasikan manipulasi DOM tingkat lanjut, implementasi algoritma pengacakan yang aman, dan kalkulasi kekuatan kata sandi secara *real-time*.

## ✨ Fitur Utama

* **Cryptographically Secure RNG:** Menggunakan `Web Crypto API` (`crypto.getRandomValues()`) dan *Fisher-Yates shuffle* untuk memastikan pengacakan karakter yang benar-benar acak dan aman.
* **Real-time Entropy Calculation:** Menghitung kekuatan kata sandi dalam satuan *bits of entropy* secara dinamis, lengkap dengan indikator visual (Weak, Fair, Good, Excellent).
* **Kustomisasi Presisi:** * Panjang kata sandi fleksibel (8–64 karakter).
  * Pemilihan *pool* karakter (Huruf Kecil, Huruf Besar, Angka, dan Simbol).
* **UI/UX Modern:** Dilengkapi fitur *toggle visibility* (sembunyikan/tampilkan kata sandi) dan *toast notification* yang mulus saat menyalin ke *clipboard*.

## 🛠️ Teknologi

* HTML5 (Semantic UI)
* CSS3 (CSS Variables, Flexbox, Grid, Custom Slider)
* Vanilla JavaScript (ES6+, Web Crypto API)

## 📂 Struktur File

```text
password-generator/
├── index.html
├── style.css
├── password_generator.js
└── README.md
```


## 🚀 Cara Menjalankan

1. *Download atau Clone* repository ini:
   ```bash
   git clone [https://github.com/zippynx/securegen.git](https://github.com/zippynx/securegen.git)
   ```
2. Buka folder proyek.
3. Jalankan file index.html menggunakan browser pilihanmu.

## 📌 Deskripsi
Proyek ini dikembangkan untuk memperdalam pemahaman mengenai eksekusi logika keamanan sisi klien (client-side security), pemrosesan event UI interaktif, serta implementasi desain sistem yang clean dan maintainable pada arsitektur web.

## 🌐 Live Demo

```bash
https://zippynx.github.io/password-generator/
```

---