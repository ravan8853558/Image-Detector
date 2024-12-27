let uploadedImage = document.getElementById('uploadedImage');
let output = document.getElementById('output');
let imageInput = document.getElementById('imageInput');

// Handle Image Upload
function handleImageUpload(event) {
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = function(e) {
        uploadedImage.src = e.target.result;
    };

    reader.readAsDataURL(file);
}

imageInput.addEventListener('change', handleImageUpload);

// Image Detection Function
async function detectImage() {
    const imageSrc = uploadedImage.src;

    if (!imageSrc) {
        output.innerHTML = "Please upload an image.";
        return;
    }

    // Show output area after image is uploaded
    output.style.opacity = 0;
    output.style.display = 'block';
    output.innerHTML = "Processing...";

    // Load the MobileNet model for image classification
    const model = await mobilenet.load();
    const predictions = await model.classify(uploadedImage);

    if (predictions.length > 0) {
        output.innerHTML = `This image is of a ${predictions[0].className}.`;
    } else {
        output.innerHTML = "Unable to detect the image content.";
    }

    // Fade in the result
    setTimeout(() => {
        output.style.opacity = 1;
    }, 500);
}
