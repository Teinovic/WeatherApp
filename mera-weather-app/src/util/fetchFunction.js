export const fetchFunction = async (url, applyData) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    applyData(json);
  } catch (err) {
    throw err;
    console.log(err);
  }
};
