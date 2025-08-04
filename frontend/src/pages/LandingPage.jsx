import { useNavigate } from "react-router-dom"; 
import illustration from "../assets/shopping.svg";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="first-page">

      <section className="hero">
        <div className="hero-text">
          <h2>Shop Anything, Your Way!</h2>
          <p>
            <strong>Your one-stop destination for all your shopping needs!</strong>
            <br></br>Style it. Stock it. Save it. All at ShopVerse!
          </p>
          <button className="cta-button" onClick={() => navigate("/login")}>Shop Now</button>
        </div>
        <div className="hero-image">
          <img src={illustration} alt="Girl Reading" />
        </div>
      </section>
    </div>
  );
};


export default LandingPage;

