async function uploadImage() {
    const fileInput = document.getElementById("fileInput").files[0];
    let formData = new FormData();
    formData.append("image", fileInput);

    await fetch("/upload", {
        method: "POST",
        body: formData
    });
    alert("Зображення завантажено!");
}

async function generateDesign() {
    const roomType = document.getElementById("roomType").value;
    const style = document.getElementById("style").value;

    const response = await fetch("/generate-design", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ roomType, style })
    });

    const data = await response.json();
    document.getElementById("designsContainer").innerHTML = `<img src="${data.imageUrl}" />`;
}
