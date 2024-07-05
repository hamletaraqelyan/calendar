export const setLocalStorage = (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error("Error saving to localStorage:", e);
  }
};

export const getLocalStorage = (key) => {
  try {
    const jsonValue = localStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error fetching from localStorage:", e);
    return null;
  }
};
