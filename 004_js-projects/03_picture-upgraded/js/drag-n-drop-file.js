const FILENAME_LENGTH = 6;

const fileInputNodes = document.querySelectorAll('[name="upload"]');

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

const highlightUpload = (inputNode) => {
  inputNode.closest('.file_upload').style.outline = '5px dashed red';
  inputNode.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0, .1)';
};

const unhighlightUpload = (inputNode) => {
  inputNode.closest('.file_upload').style.outline = '';
  inputNode.closest('.file_upload').style.backgroundColor = '';
};

const onFileDrop = (evt) => {
  const inputNode = evt.target;
  inputNode.files = evt.dataTransfer.files;
  const [name, extension] = inputNode.files[0].name.split('.');

  const dots = name.length > FILENAME_LENGTH ? '...' : '.';
  const newName = name.substring(0, FILENAME_LENGTH) + dots + extension;
  inputNode.previousElementSibling.textContent = newName;
};

const bindFileInputs = () => {
  // dragenter - объект в пределах
  // dragleave - объект за пределами
  // dragover - объект завис над
  // drop - объект отправлен
  ['dragenter', 'dragleave', 'dragover', 'drop'].forEach((eventName) => {
    fileInputNodes.forEach((item) => {
      item.addEventListener(eventName, preventDefaults, false);
    });
  });

  ['dragenter', 'dragover'].forEach((eventName) => {
    fileInputNodes.forEach((item) => {
      item.addEventListener(eventName, () => highlightUpload(item), false);
    });
  });

  ['dragleave', 'drop'].forEach((eventName) => {
    fileInputNodes.forEach((item) => {
      item.addEventListener(eventName, () => unhighlightUpload(item), false);
    });
  });

  fileInputNodes.forEach((item) => {
    item.addEventListener('drop', onFileDrop);
  });
};

const initDragAndDropFiles = () => {
  bindFileInputs();
};

export { initDragAndDropFiles };
