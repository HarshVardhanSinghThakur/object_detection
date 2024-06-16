const URL = "./models/3_classes/";

let model, webcam, labelContainer, maxPredictions;

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();


    const flip = true;
    webcam = new tmImage.Webcam(350, 350, flip);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);


    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { 
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
}


async function predict() {

    const prediction = await model.predict(webcam.canvas);

    let maxClassIndex = 0;
    let maxProbability = 0;
    for (let i = 0; i < maxPredictions; i++) {
        if (prediction[i].probability > maxProbability) {
            maxProbability = prediction[i].probability;
            maxClassIndex = i;
        }
    }

    const probabilityPercentage = (prediction[maxClassIndex].probability * 100).toFixed(0); // Convert to percentage and round off

    const classPrediction =
        prediction[maxClassIndex].className + " " + probabilityPercentage + "%";
    labelContainer.innerHTML = classPrediction;

}
