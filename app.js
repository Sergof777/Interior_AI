const apiKey = 'YOUR_API_KEY';  // Замініть на ваш API ключ для доступу до штучного інтелекту

// Початок створення дизайну
function startDesign(roomType) {
    document.getElementById('room-selection').style.display = 'none';
    document.getElementById('design-form').style.display = 'block';
}

// Генерація дизайну за допомогою AI
async function generateDesign() {
    const roomType = document.querySelector('button[style="display: inline-block;"]').innerText.toLowerCase();
    const style = document.getElementById('style').value;
    const colorScheme = document.getElementById('colorScheme').value;

    const response = await fetch('https://api.example.com/generate-design', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            roomType: roomType,
            style: style,
            colorScheme: colorScheme
        })
    });

    const data = await response.json();

    // Виведення результатів на сторінку
    document.getElementById('design-results').innerHTML = `
        <img src="${data.imageUrl}" alt="Generated Design" />
        <p>${data.description}</p>
    `;
    document.getElementById('suggestions').style.display = 'block';
}
