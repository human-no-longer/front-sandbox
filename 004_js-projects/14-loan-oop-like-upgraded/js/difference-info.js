class DifferenceInfo {
  #oldCounter = 0;
  #newCounter = 0;

  constructor(oldListSelector, newListSelector, itemsSelector) {
    this.oldListNode = document.querySelector(oldListSelector);
    this.newListNode = document.querySelector(newListSelector);
    this.oldItemNodes = this.oldListNode.querySelectorAll(itemsSelector);
    this.newItemNodes = this.newListNode.querySelectorAll(itemsSelector);
  }

  #bindCounters(listNode, itemNodes, counter) {
    listNode.querySelector('.plus').addEventListener('click', () => {
      itemNodes[counter].style.display = '';
      itemNodes[counter].classList.add('animated', 'fadeIn');
      if (counter !== itemNodes.length - 2) {
        itemNodes[counter].style.display = '';
        counter++;
      } else {
        itemNodes[itemNodes.length - 1].remove();
      }
    });
  }

  #hideItems(itemNodes) {
    itemNodes.forEach((item, i, collection) => {
      if (i !== collection.length - 1) {
        item.style.display = 'none';
      }
    });
  }

  init() {
    this.#hideItems(this.oldItemNodes);
    this.#hideItems(this.newItemNodes);
    this.#bindCounters(this.oldListNode, this.oldItemNodes, this.#oldCounter);
    this.#bindCounters(this.newListNode, this.newItemNodes, this.#newCounter);
  }
}

export default DifferenceInfo;
