import LandingPageCss from "../styles/LandingPage.module.css";

const LandingPage = ({ turnLandingOff }) => {
  return (
    <div className={`font-sans w-full h-full min-h-screen l:h-screen bg-[url('/images/Pattern.jpg')] bg-center bg-cover flex flex-col items-end l:flex-row`}>
      <img
        className='absolute w-[170px] top-[35px] left-[35px] l:top-[40px] l:left-[40px]'
        src="/images/VERSEWISE.svg"
        alt=""
      />
      <div className={`flex flex-col l:flex-row w-full justify-center text-white`}>
        <img
          src="/images/man.png"
          alt="man wearing vr holding a bible"
          className='w-[500px] h-auto mx-auto mt-[60px] l:w-[700px]'
        />
        <div className={` flex flex-col text-center l:text-start max-w-[70%] mx-auto mt-[20px] l:w-[700px] l:mr-10 gap-[20px] justify-start`}>
          <div className={`mx-auto text-[32px] leading-[44px] font-semibold w-[90%] l:w-full l:font-normal l:text-[64px] l:leading-[87px] `}>
            Welcome to our Chat Bot!
          </div>
          <div className={`text-[22px] leading-[30px] font-bold text-[#EF4E25] l:leading-[51px] l:text-[37px] l:font-normal`}>Wisdom at your command.</div>

          <div className='font-semibold text-[14px] leading-[19px] text-[#FFFFFF78] l:text-[24px] l:leading-[32px] l:font-normal'>
            The fear of the LORD is the beginning of wisdom, and knowledge of
            the Holy One is understanding.
          </div>
          <div className='font-semibold text-[14px] leading-[19px] text-[#FFFFFF78] l:text-[24px] l:leading-[32px] l:font-normal'>Proverbs 9:10-12</div>
          <div
            className={`mb-[25px] l:mb-0 ${LandingPageCss.start} bg-[#EF4E25] flex justify-between items-center cursor-pointer rounded-[13px] mx-auto text-[20px] leading-[27px] font-bold w-[150px] h-[50px] l:w-[240px] l:h-[71px] p-[5px_11px] l:p-[9px_20px] l:ml-[27%] l:text-[31px] l:leading-[43px] l:font-normal shadow-[0px_4px_4px_0px_#00000040] mt-[15px]`}
            onClick={() => turnLandingOff()}
          >
            <div className={LandingPageCss.buttonText}>Start Chat</div>
            <img className="l:w-[14px]" src="/images/rightArrow.svg" alt="start" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
