import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetaljiProizvoda = ({ proizvodi }) => {
  const [proizvod, setProizvod] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const pronadjiProizvod = () => {
      const pronadjeniProizvod = proizvodi.find((proizvod) => proizvod.id == id);
      setProizvod(pronadjeniProizvod);
    };
    pronadjiProizvod();
  }, [id, proizvodi]);

  if (!id || proizvod == null) {
    return <div>Loading...</div>;
  }

  function average_review() {
    var sum = 0;
    var counter = 0;
    for (let i = 0; i < proizvod.reviews.length; i++) {
      sum += proizvod.reviews[i].rating;
      counter++;
    }
    return (sum / counter).toFixed(2);
  }

  function renderStars(rating) {
    const roundedRating = Math.round(rating);
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= roundedRating ? "filled" : ""}`}>
          ★
        </span>
      );
    }
    return stars;
  }

  return (
    <div className="detalji-proizvoda">
      <img src={proizvod.image_url} alt={proizvod.name} />
      <h2>{proizvod.name}</h2>
      <p>{proizvod.description}</p>
      <div className="proizvod-info">
        <div className="proizvod-info-item">
          <span className="label">Kategorija:</span>
          <span className="value">{proizvod.category}</span>
        </div>
        <div className="proizvod-info-item">
          <span className="label">Cena:</span>
          <span className="value">{proizvod.price} RSD</span>
        </div>
        <div className="proizvod-info-item">
          <span className="label">Ocene:</span>
          <span className="value">{renderStars(average_review())}</span>
        </div>
      </div>
      <h3>Recenzije korisnika</h3>
      {proizvod.reviews.map((review) => (
        <div className="review" key={review.id}>
          <h4>{review.title}</h4>
          <p>{review.body}</p>
          <div className="review-info">
            <div className="review-info-item">
              <span className="label">Korisnik:</span>
              <span className="value">{review.user.name}</span>
            </div>
            <div className="review-info-item">
              <span className="label">Ocena:</span>
              <span className="value">{review.rating}/5</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetaljiProizvoda;
