let windowOptionsState = {};

const getWindowOptionsState = () => windowOptionsState;

const setWindowOptionsState = (property, value) => {
  windowOptionsState[property] = value;
};

const clearWindowOptionsState = () => {
  windowOptionsState = {};
};

export {getWindowOptionsState, setWindowOptionsState, clearWindowOptionsState};
