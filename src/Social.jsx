import instagram from "/img/Instagram_Glyph_Black.png"
import linkedin from "/img/LI-In-Bug.png"
import github from "/img/github-mark.png"

export default function Social() {
  return (
    <div>
      <p>
        <a href="https://github.com/iamthesaint">
          <img
            className="social-logo"
            src={github}
            alt="github logo"
          />
        </a>
        <a href="https://www.instagram.com/iamthesaint/">
          <img
            className="social-logo"
            src={instagram}
            alt="instagram logo"
          />
        </a>
        <a href="https://www.linkedin.com/in/stephenie-st-hilaire">
          <img
            className="social-logo"
            src={linkedin}
            alt="linkedin logo"
          />
        </a>
      </p>
    </div>
  );
}
