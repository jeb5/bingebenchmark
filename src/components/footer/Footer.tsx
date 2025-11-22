import WideLogoSVG from "../../assets/brand/WideLogo.svg";
import TMDBLogoSVG from "../../assets/brand/TMDB.svg";
import TRAKTLogoSVG from "../../assets/brand/TRAKT.svg";
import EmailIconSVG from "../../assets/icons/email.svg";
import GithubIconSVG from "../../assets/icons/github-mark.svg";
import styles from "./Footer.module.css";

export default function Footer() {
	return (
    <div className={styles.outerFooter}>
      <div className={styles.brandContainer}>
        <WideLogoSVG className={styles.brandLogo} />
      </div>
      <div className={styles.informationContainer}>
        <div className={styles.linksContainer}>
          <a href="https://github.com/jeb5/bingebenchmark">
            <GithubIconSVG />
            <div>Github</div>
          </a>
          <a href="mailto:gala_porter_04@icloud.com">
            <EmailIconSVG />
            <div>Contact</div>
          </a>
        </div>
        <div className={styles.suggestionContainer}>
          The best way to improve the accuracy of our results is to rate the TV you&apos;re watching on trakt.tv.
          <br />
          Missing rating data for an obscure show? Disagree with our verdict? Please contact us for feedback!
        </div>
      </div>
      <div className={styles.attributionContainer}>
        <div>
          <a href="https://trakt.tv">
            <TRAKTLogoSVG />
          </a>
          <div>Rating data provided by TRAKT. This product uses the TRAKT API but is not endorsed or certified by TRAKT. TV.</div>
        </div>
        <div>
          <a href="https://tmdb.org">
            <TMDBLogoSVG />
          </a>
          <div>Show metadata provided by The Movie Database. This product uses the TMDB API but is not endorsed or certified by TMDB.</div>
        </div>
      </div>
    </div>
  );
}
