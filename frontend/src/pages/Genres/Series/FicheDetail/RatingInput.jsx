import React from 'react';

function RatingInput({ rating, setRating }) {
  const handleRatingChange = (e) => {
    const newRating = parseInt(e.target.value, 10);
    if (newRating >= 0 && newRating <= 10) {
      setRating(newRating);
    }
  };

  return (
    <div className="rating-input">
      <input
        type="number"
        value={rating}
        onChange={handleRatingChange}
        min="0"
        max="10"
        className="w-12 text-center border-2 border-gray-300 rounded"
      />
      <span className="text-lg ml-1">/10</span>
    </div>
  );
}

export default RatingInput;