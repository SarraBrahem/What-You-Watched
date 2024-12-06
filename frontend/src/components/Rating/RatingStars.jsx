import React from 'react';

const RatingStars = ({ rating }) => {
    const scaleRating = rating / 2; // Converti de 10 à une échelle de 5
    const fullStars = Math.floor(scaleRating);
    const halfStar = scaleRating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
  
    return (
      <>
        {'★'.repeat(fullStars)}
        {halfStar ? '✮' : ''}
        {'☆'.repeat(emptyStars)}
      </>
    );
  };
  

export default RatingStars;