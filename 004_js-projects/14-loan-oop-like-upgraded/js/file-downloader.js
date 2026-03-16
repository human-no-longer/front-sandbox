const FILE_PATH = '../assets/img/mainbg.jpg';

class FileDownloader {
  #path = FILE_PATH;

  constructor(triggersSelector) {
    this.btns = document.querySelectorAll(triggersSelector);
  }

  #bindDownloader = () => {
    const tempLinkNode = document.createElement('a');

    tempLinkNode.setAttribute('href', this.#path);
    tempLinkNode.setAttribute('download', 'nice_picture');
    tempLinkNode.style.display = 'none';

    document.body.append(tempLinkNode);
    tempLinkNode.click();
    tempLinkNode.remove();
  };

  init() {
    this.btns.forEach((item) => {
      item.addEventListener('click', this.#bindDownloader);
    });
  }
}

export default FileDownloader;
