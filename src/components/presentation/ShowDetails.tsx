import Image from "next/image";
import CalendarIcon from "../../assets/icons/date.svg";
import StarIcon from "../../assets/icons/star.svg";
import { TVShow } from "../../lib/tv_show/types";
import clsx from "clsx";

export default function ShowDetails({ showDetails, className }: { showDetails: TVShow; className: string }) {
  const dateText = `${showDetails.first_air_year}${showDetails.status === "Ended" ? " - " + showDetails.last_air_year : " ~"}`;

  return (
    <div className={clsx("grid grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto]", className)}>
      <Image
        src={showDetails.poster_url}
        alt={`${showDetails!.name} poster`}
        className="col-start-1 row-start-1 row-span-3 mr-5"
        width={140}
        height={210}
        priority
      />
      <h2 className="font-bold text-xl col-start-2 row-start-1">{showDetails.name}</h2>
      <div className="text-sm col-start-2 row-start-2">{showDetails.genres.join(", ")}</div>
      <div className="col-start-2 row-start-3">
        <div className="flex items-center text-sm font-bold">
          <CalendarIcon className="fill-(--signature-blue) w-6 h-6 mr-2" />
          <div>
            <span>{showDetails.first_air_year}</span>
            {showDetails.status === "Ended" ? (
              showDetails.first_air_year === showDetails.last_air_year ? null : (
                <>
                  <span> - </span>
                  <span>{showDetails.last_air_year}</span>
                </>
              )
            ) : (
              <span> ~</span>
            )}
          </div>
        </div>
        <div className="flex items-center mt-1 text-sm font-bold">
          <StarIcon className="fill-(--signature-gold) w-6 h-6 mr-2" />
          <div className="flex items-baseline">
            <span>{showDetails.rating_data?.show_average_rating}</span>
            <span className="text-[10px]">/10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
