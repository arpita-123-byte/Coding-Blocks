const fs = require('fs');
const sharp = require('sharp');

const originalImagePath = 'image.png';      
const base64TextFile = 'image.txt';            
const restoredImagePath = 'restored.png';      
const resizedImagePath = 'resized.png';        

// Step 1: Read image and convert to base64 text
function imageToBase64() {
  const imageBuffer = fs.readFileSync(originalImagePath);
  const base64Data = imageBuffer.toString('base64');
  fs.writeFileSync(base64TextFile, base64Data);
  console.log('Step 1: Image converted to Base64 and saved to text file.');
}

// Step 2: Read base64 text and restore image
function base64ToImage() {
  const base64Data = fs.readFileSync(base64TextFile, 'utf8');
  const imageBuffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync(restoredImagePath, imageBuffer);
  console.log('Step 2: Base64 text restored to image.');
}

// Step 3: Resize the restored image
function resizeImage() {
  sharp(restoredImagePath)
    .resize(200) 
    .toFile(resizedImagePath)
    .then(info => {
      console.log('Step 3: Image resized successfully.');
      console.log('Output Size:', info.size, 'bytes');
    })
    .catch(err => {
      console.error('Error resizing image:', err);
    });
}


function main() {
  try {
    imageToBase64();
    base64ToImage();
    resizeImage();
  } catch (err) {
    console.error('Error occurred:', err);
  }
}

main();
