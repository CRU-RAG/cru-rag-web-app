import LandingPageCss from "../styles/LandingPage.module.css";

const LandingPage = ({ turnLandingOff }) => {
  return (
    <div className={LandingPageCss.container}>
      <img
        className={LandingPageCss.logo}
        src="/images/VERSEWISE.svg"
        alt=""
      />
      <div className={LandingPageCss.content}>
        <img
          src="/images/man.png"
          alt="man wearing vr holding a bible"
          className={LandingPageCss.man}
        />
        <div className={LandingPageCss.welcomeContainer}>
          <div className={LandingPageCss.welcomeText}>
            Welcome to our Chat Bot!
          </div>
          <div className={LandingPageCss.wisdom}>Wisdom at your command.</div>

          <div className={LandingPageCss.quote}>
            The fear of the LORD is the beginning of wisdom, and knowledge of
            the Holy One is understanding.
          </div>
          <div className={LandingPageCss.location}>Proverbs 9:10-12</div>
          <div
            className={LandingPageCss.start}
            onClick={() => turnLandingOff()}
          >
            <div className={LandingPageCss.buttonText}>Start Chat</div>
            <img src="/images/rightArrow.svg" alt="start" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
