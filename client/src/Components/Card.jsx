
import "./card.scss"

const Card = ({ mainImage, name, price }) => {
  
    return (
      <div className="card">
        {mainImage && <img src={"http://localhost:3000" + mainImage} alt={name} />}
        {name && <div className="card-name">{name}</div>}
        {price && <div className="card-price">{price}</div>}
       
      </div>
    );
  };


export default Card;