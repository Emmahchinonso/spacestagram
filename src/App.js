import { useEffect, useState } from "react";
import ImageList from "./components/ImageList";

function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.nasa.gov/planetary/apod?start_date=2021-09-08&api_key=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((json) =>
        setImages(json.filter((item) => item.media_type === "image"))
      )
      .catch((error) => console.log(error));
  }, []);

  return (
    <article className="container">
      <h1 className="u-center">Spacetagram</h1>
      <p className="u-center">Brought to you by NASA's Image API</p>

      {images.length > 0 && <ImageList images={images} />}
    </article>
  );
}

export default App;
