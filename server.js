const express = require('express');
const multer = require('multer');
const path = require('path');
const axios = require('axios');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Налаштування збереження завантажених файлів
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Підключення статичних файлів
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ендпоінт для завантаження файлу та генерації дизайну
app.post('/generate-design', upload.single('image'), async (req, res) => {
    try {
        const imageFilePath = path.join(__dirname, 'uploads', req.file.filename);
        const aiApiKey = 'YOUR_API_KEY'; // Замініть на свій API-ключ

        // Надсилання запиту до API AI
        const aiResponse = await axios.post('https://api.example.com/generate-design', {
            image: fs.readFileSync(imageFilePath, { encoding: 'base64' }),
            style: req.body.style,
            color: req.body.color
        }, {
            headers: { 'Authorization': `Bearer ${aiApiKey}` }
        });

        const outputFilePath = path.join(__dirname, 'designs', `design-${Date.now()}.jpg`);
        fs.writeFileSync(outputFilePath, Buffer.from(aiResponse.data.image, 'base64'));

        res.json({ success: true, imageUrl: `/designs/${path.basename(outputFilePath)}` });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Помилка обробки AI' });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер працює на порту ${PORT}`);
});
