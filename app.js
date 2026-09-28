const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Server Express.js berjalan!');
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

app.use(express.json());

let articles = [
  { id: 1, judul: 'Mengenal REST API', isi: 'REST adalah gaya arsitektur ...', penulis: 'Nadia Putri', kategori: 'Teknologi', dipublikasikan: true},
  { id: 2, judul: 'Tragedi Dibalik Asap di Palembang', isi: 'Isi artikel tentang tragedi di Palembang', penulis: 'Aldi Wijaya', kategori: 'Tragedi', dipublikasikan: false },
];
let nextId = 3;

app.get('/articles/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = articles.find((a) => a.id === id);

  if (!data) return res.status(404).json({ message: 'Data tidak ditemukan' });
  res.json(data);
});

// GET /articles -> seluruh data, bisa difilter: /articles?kategori=Teknologi
app.get('/articles', (req, res) => {
  const { kategori } = req.query;

  if (kategori) {
    const hasil = articles.filter((a) => a.kategori === kategori);
    return res.json(hasil);
  }

  res.json(articles);
});

app.post('/articles', (req, res) => {
  const { judul, isi, penulis, kategori, dipublikasikan } = req.body;

  if (!judul || !isi || !penulis || !kategori) {
    return res.status(400).json({ message: 'Semua field wajib diisi' });
  }

  const baru = { id: nextId++, judul, isi, penulis, kategori, dipublikasikan };

  articles.push(baru);
  res.status(201).json(baru);
});