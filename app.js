document.getElementById('designForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    let style = document.getElementById('style').value;
    let color = document.getElementById('color').value;
    let file = document.getElementById('imageUpload').files[0];

    let formData = new FormData();
    formData.append('style', style);
    formData.append('color', color);
    formData.append('image', file);

    const response = await fetch('/generate-design', {
        method: 'POST',
        body: formData
    });

    const data = await response.json();

    if (data.success) {
        document.getElementById('designResult').innerHTML = `<img src="${data.imageUrl}" alt="AI Дизайн">`;
    } else {
        alert('Помилка генерації дизайну');
    }
});
