import Navhome from './Navhome';

export default function Header() {
  return (
    <>
      <div className="header-img" id="header">
        <Navhome />
        <div className="  home-banner-container">
          <div className="home-text-section">
            <h1 className="home-title-section mt-5 ms-5">
              If <span className="text-highlight">Health</span> is your priority
              and <span className="text-highlight">Fitness</span> is the most
              important part of your day
            </h1>
            <p className="home-text">
              We are here to help you
              <br />
              make the most of it!
            </p>
            <hr className="hr-style" />
            <p className="home-text">
              Get ready to have your fitness wishes granted with{' '}
              <span className="home-text-highlight">GymGenie</span>
              <br />
              Your personal trainer with a touch of{' '}
              <span className="home-text-highlight">AI</span> and{' '}
              <span className="home-text-highlight"> ChatGPT </span> magic!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
