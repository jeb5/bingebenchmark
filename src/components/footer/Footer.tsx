import WideLogoSVG from "@/assets/brand/WideLogo.svg";
import TMDBLogoSVG from "@/assets/brand/TMDB.svg";
import TRAKTLogoSVG from "@/assets/brand/TRAKT.svg";
import EmailIconSVG from "@/assets/icons/email.svg";
import GithubIconSVG from "@/assets/icons/github-mark.svg";

export default function Footer() {
  return (
    <div className="bg-(--weak-background) grid grid-cols-[1fr_auto] grid-rows-[auto_auto] p-20">
      <div className="col-start-1 row-start-1">
        <WideLogoSVG className="w-37.5 mb-7.5 **:fill-(--signature-offwhite)!" />
      </div>
      <div className="col-start-1 row-start-2 flex min-w-113 max-w-175 mr-7.5">
        <div className="flex flex-col justify-center">
          <a href="https://github.com/jeb5/bingebenchmark" className="flex mb-2.5">
            <GithubIconSVG className="w-3.5 mr-1.5 **:fill-(--signature-offwhite)!" />
            <div className="text-xs font-bold">Github</div>
          </a>
          <a href="mailto:gala_porter_04@icloud.com" className="flex">
            <EmailIconSVG className="w-3.5 mr-1.5 **:fill-(--signature-offwhite)!" />
            <div className="text-xs font-bold">Contact</div>
          </a>
        </div>
        <div className="text-xs ml-7.5 border-l-(--signature-offwhite) border-l pl-5 flex items-center">
          The best way to improve the accuracy of our results is to rate the TV you&apos;re watching on trakt.tv.
          <br />
          Missing rating data for an obscure show? Disagree with our verdict? Please contact us for feedback!
        </div>
      </div>
      <div className="col-start-2 row-start-1 row-span-2 flex flex-col justify-center border-l-(--signature-offwhite) border-l max-w-125 pl-5">
        <div className="flex mb-5">
          <a href="https://trakt.tv" className="h-7.5 w-25 shrink-0">
            <TRAKTLogoSVG className="h-full w-auto **:fill-(--signature-offwhite)!" />
          </a>
          <div className="text-xs ml-5">
            Rating data provided by TRAKT. This product uses the TRAKT API but is not endorsed or certified by TRAKT.TV.
          </div>
        </div>
        <div className="flex">
          <a href="https://tmdb.org" className="h-7.5 w-25 shrink-0">
            <TMDBLogoSVG className="h-full w-auto **:fill-(--signature-offwhite)!" />
          </a>
          <div className="text-xs ml-5">
            Show metadata provided by The Movie Database. This product uses the TMDB API but is not endorsed or certified by TMDB.
          </div>
        </div>
      </div>
    </div>
  );
}
