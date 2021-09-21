import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

const ImageList = ({ images }) => {
  const [likedImages, setLikedImages] = useState(
    () => JSON.parse(localStorage.getItem("likes")) || []
  );

  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likedImages));
  }, [likedImages]);

  return (
    <ul className="imageList">
      {images.map((image) => {
        const isLiked = !!likedImages.find((item) => item.title == image.title);
        console.log(image);
        return (
          <ImageListItem
            key={image.title}
            image={image}
            likedImages={likedImages}
            setLikedImages={setLikedImages}
            isLiked={isLiked}
          />
        );
      })}
    </ul>
  );
};

const ImageListItem = ({ image, isLiked, setLikedImages }) => {
  const { hdurl, title, explanation, date } = image;

  const toggleLikedImage = () => {
    if (isLiked) {
      setLikedImages((images) =>
        images.filter((item) => item.title !== image.title)
      );
    } else {
      setLikedImages((images) => [...images, image]);
    }
  };

  return (
    <li className="imageList__item">
      <div className="card">
        <img src={hdurl} alt={title} className="card__img" />

        <div className="card__body">
          <p className="card__title">
            {title} <span className="card__date">{date}</span>
          </p>

          <p className="card__content">{explanation}</p>

          <FaHeart
            onClick={toggleLikedImage}
            className={`card__btn ${isLiked ? "active" : ""}`}
          />
        </div>
      </div>
    </li>
  );
};

export default ImageList;
