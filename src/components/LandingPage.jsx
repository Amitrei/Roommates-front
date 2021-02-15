import "../styles/landingPage.scss";
import googleIcon from "../assets/google-icon.svg";
import landingImage from "../assets/landing-image.svg";

const LandingPage = () => {

 
  return (
    <div className="ladingPage-body">
      <div className="navBar">
        <h1 className="logo">Roomates</h1>
        <a className="login-btn">LOGIN</a>
      </div>
      <div className="content-container">
        <div className="main-content-wrapper">
          <div className="main-text">
            <h2>Manage your apartment expenses in a smart & maintainable way</h2>
            <h3>• Keep track of all yours shared expenses around the apartment.</h3>
            <h3>• Easy to understand and maintain dashboard with bunch of features.</h3>
            <a className="google-login" href="http://localhost:3002/api/auth">
              <img src={googleIcon} /> Start now
            </a>
          </div>
          <img className="bg-image" src={landingImage} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
