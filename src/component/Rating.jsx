import React, { useState } from "react";

const RatingComponent = ({ selectedRating, onRatingChange, disabled }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleHover = (rating) => {
    if (!disabled) {
      setHoverRating(rating);
    }
  };

  const handleRatingClick = (rating) => {
    if (!disabled) {
      onRatingChange(rating);
    }
  };

  const stars = [1, 2, 3, 4, 5];

  return (
    <div>
      {stars.map((star) => (
        <span
          key={star}
          className={
            star <= (hoverRating || selectedRating)
              ? "star-filled"
              : "star-empty"
          }
          onMouseEnter={() => handleHover(star)}
          onMouseLeave={() => handleHover(0)}
          onClick={() => handleRatingClick(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default RatingComponent;
