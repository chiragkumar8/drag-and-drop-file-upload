const dropZone = document.getElementById('dropZone');
const hintText = document.getElementById('hintText');
const previewContainer = document.getElementById('previewContainer');
const previewImage = document.getElementById('previewImage');
const removeBtn = document.getElementById('removeBtn');
const changeHint = document.getElementById('changeHint');

let currentFile = null;

// Click to upload
dropZone.addEventListener('click', () => {
    if (!dropZone.classList.contains('has-image')) {
        fileInput.click();
    }
});

// Click preview to change
previewContainer.addEventListener('click', (e) => {
    if (e.target !== removeBtn) {
        fileInput.click();
    }
});

// File input (hidden)
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'image/*';
fileInput.style.display = 'none';

fileInput.addEventListener('change', handleFiles);

// Drag & drop events
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => dropZone.classList.add('drag-over'), false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => dropZone.classList.remove('drag-over'), false);
});

dropZone.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFiles({ target: { files } });
    }
}

function handleFiles(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        currentFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImage.src = e.target.result;
            showPreview();
        };
        reader.readAsDataURL(file);
    }
}

function showPreview() {
    dropZone.classList.add('has-image');
    previewContainer.style.display = 'block';
    hintText.style.display = 'none';
    changeHint.style.display = 'block';
}

// Remove button
removeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    resetDropZone();
});

function resetDropZone() {
    dropZone.classList.remove('has-image');
    previewContainer.style.display = 'none';
    changeHint.style.display = 'none';
    hintText.style.display = 'block';
    previewImage.src = '';
    currentFile = null;
    fileInput.value = '';
}