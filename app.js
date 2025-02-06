const apiKey = 'YOUR_API_KEY';  // Замініть на реальний API ключ

function startDesign(roomType) {
    document.getElementById('start').style.display = 'none';
    document.getElementById('design-form').style.display = 'block';
}

async function generateDesign() {
    const style = document.getElementById('style').value;
    const colorScheme = document.getElementById('colorScheme').value;
    const fileInput = document.getElementById('upload').files[0];

    const formData = new FormData();
    formData.append("style", style);
    formData.append("colorScheme", colorScheme);
    if (fileInput) {
        formData.append("image", fileInput);
    }

    const response = await fetch('https://api.example.com/generate-design', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`
        },
        body: formData
    });

    const data = await response.json();
    document.getElementById('design-output').innerHTML = `
        <img src="${data.imageUrl}" alt="Генерований дизайн">
        <p>${data.description}</p>
    `;
    document.getElementById('results').style.display = 'block';
}
