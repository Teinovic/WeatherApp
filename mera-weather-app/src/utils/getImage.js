export async function getImage(url, applyImgData) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Request failed!");
    }
    const imageBlob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);
    reader.onloadend = () => {
      const base64data = reader.result;
      applyImgData(base64data);
    };
  } catch (error) {
    console.log(error);
    //setError(err.message || "Something went wrong!");
  }
}
