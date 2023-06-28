import "./ItemImage.css";
import { useState } from "react";
import ItemPlaceholder from "../../images/ItemPlaceholder.svg";

function ItemImage({ src, alt, className }) {
  const [error, setError] = useState(false);

  return (
    <img
      className={`item-image ${className}`}
      styles={{ background: "grey" }}
      src={error ? ItemPlaceholder : src}
      alt={alt}
      onError={() => setError(true)}
    />
  );
}

export default ItemImage;
