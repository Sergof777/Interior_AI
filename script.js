let model;

async function createModel() {
    model = tf.sequential();
    model.add(tf.layers.dense({inputShape: [1], units: 8, activation: 'relu'}));
    model.add(tf.layers.dense({units: 1}));
    model.compile({
        optimizer: tf.train.sgd(0.1),
        loss: 'meanSquaredError'
    });

    // Перевіряємо, чи є збережена модель
    try {
        const loadedModel = await tf.loadLayersModel('localstorage://my-model');
        model = loadedModel;
        console.log("Модель завантажена з пам'яті!");
    } catch (error) {
        console.log("Немає збереженої моделі, створюємо нову.");
    }
}

async function trainModel() {
    const inputX = parseFloat(document.getElementById("inputX").value);
    const inputY = parseFloat(document.getElementById("inputY").value);

    if (isNaN(inputX) || isNaN(inputY)) {
        alert("Введіть коректні числа!");
        return;
    }

    const xs = tf.tensor2d([inputX], [1, 1]);
    const ys = tf.tensor2d([inputY], [1, 1]);

    await model.fit(xs, ys, {epochs: 10});

    // Зберігаємо модель у браузері
    await model.save('localstorage://my-model');

    alert("Навчання завершене!");
}

async function predict() {
    const predictX = parseFloat(document.getElementById("predictX").value);

    if (isNaN(predictX)) {
        alert("Введіть число!");
        return;
    }

    const input = tf.tensor2d([predictX], [1, 1]);
    const output = model.predict(input);
    output.data().then(prediction => {
        document.getElementById("result").innerText = `Прогноз: ${prediction[0].toFixed(2)}`;
    });
}

createModel();
