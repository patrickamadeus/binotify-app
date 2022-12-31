# Tubes 2 Epify 
> Halo! Selamat datang di repository Epify!

Repository engine ini dibuat untuk memenuhi **Tugas Besar Mata Kuliah IF3110 Pengembangan Aplikasi Berbasis Web** yang ke-2 pada Semester II Tahun Akademik 2022/2023. 

## Table of Contents
  - [Table of Contents](#table-of-contents)
  - [Author](#author)
  - [Panduan Pengerjaan](#panduan-pengerjaan)

## Deskripsi
Epify adalah sebuah Monolithic PHP & Vanilla Web Application yang diimplementasikan sedemikian rupa sehingga menyerupai salah satu aplikasi musik terpopuler, yakni *Spotify*.
Epify memiliki berbagai fitur andalan yakni play lagu dan menambahkan album baru dengan desain memukau dan fitur responsif terdepan.


## Daftar Requirement
- PHP
- Javascript
- XAMPP

## Cara Instalasi
1. Clone repository ini di dalam folder htdocs di dalam XAMPP
2. Jalakan XAMPP, dan nyalakan server Apache
3. Kemudian, buka localhost/{nama folder tugas} dengan nama folder sesuai penamaan yang di save pada folder htdocs, kemudian tambahkan infix /login.html untuk mengakses page login
4. Apabila terdapat permasalahan database, silahkan konfigurasi pgsql pada file php.ini dengan uncomment extension=pgsql dan comment extension=pdo_pgsql

## Screenshot Tampilan Aplikasi
![image](/readme_img/album.jpg)
![image](/readme_img/albumdetail.jpg)
![image](/readme_img/editalbum.jpg)
![image](/readme_img/editsong.jpg)
![image](/readme_img/sidebar.jpg)
![image](/readme_img/songdetail.jpg)
![image](/readme_img/premiumartist.jpg)

## Pembagian Tugas
|             | <u>Server-side</u> | <u>Client-side</u>
| ----------- | ----------- | ----------- |
| Login | 13520109, 13520088 | 13520142 |
| Register | 13520109, 13520088 | 13520142 |
| Halaman Home | 13520109, 13520142   | 13520088 |
| Halaman Daftar Album | 13520088  | 13520088 |
| Halaman Search, Sort, Filter | 13520109  | 13520142 |
| Halaman Detail Lagu | 13520088, 13520142  | 13520109 |
| Halaman Detail Album |13520088    | 13520142  |
| Halaman Tambah Album/Lagu | 13520109, 13520088   | 13520142 |
| Halaman Daftar User | 13520109  | 13520109 |
