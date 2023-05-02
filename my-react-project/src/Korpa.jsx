const Korpa = ({ korpa }) => (
    <div className="korpa">
      <h2>Korpa</h2>
      {korpa.length === 0 ? (
        <p>Korpa je prazna.</p>
      ) : (
        korpa.map((proizvod) => (
          <div key={proizvod.id} className="korpa-proizvod">
            <img src={proizvod.image_url} alt={proizvod.name} />
            <h3>{proizvod.name}</h3>
            <span className="cena">{proizvod.price} RSD</span>
          </div>
        ))
      )}
    </div>
  );
  

  export default Korpa;