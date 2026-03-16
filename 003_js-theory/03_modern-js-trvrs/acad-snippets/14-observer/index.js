import { makeToast } from "./toast.js";

const Observable = {
  _observers: [],
  add(callback) {
    this._observers.push(callback);
  },
  remove(callback) {
    this._observers = this._observers.filter((callbackInStock) => callbackInStock !== callback);
  },
  notify() {
    this._observers.forEach((callback) => callback());
  },
};

const toastForNewEmail = makeToast("Пришла зарплата!");
const toastForNewChatMessage = makeToast("Пришли люди в масках");
const toastForAnotherMessage = makeToast("Деньги получены");
const callOperGroup = () => {
  Observable.remove(toastForNewChatMessage);
  Observable.add(toastForAnotherMessage);
};

Observable.add(toastForNewEmail);
Observable.add(toastForNewChatMessage);

document.querySelector("button").addEventListener("click", () => {
  callOperGroup();
  Observable.notify();
});
