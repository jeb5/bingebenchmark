import { notFound } from "next/navigation";
import HeaderBar from "@/components/header/HeaderBar";
import ShowPresentation from "@/components/presentation/ShowPresentation";
import ShowExtraInfo from "@/components/show_extra_info/ShowExtraInfo";
import getTVShow from "@/lib/tv_show/getTVShow";
import { Metadata, ResolvingMetadata } from "next";

// TODO: Work out how to revalidate every hour

export async function generateMetadata({ params }: { params: Promise<{ tvshow: string }> }, parent: ResolvingMetadata): Promise<Metadata> {
  const showDetails = await getTVShowFromParams(await params);
  if (!showDetails) notFound();
  return {
    title: `Does ${showDetails.name} get better?`,
    description: `Find out if ${showDetails.name} is worth your time with Binge Benchmark's ratings graph and reviews.`,
  };
}

async function getTVShowFromParams(params: { tvshow: string }) {
  let { tvshow: showName } = params;
  showName = decodeURIComponent(showName);

  if (typeof showName !== "string" || showName !== showName.toLowerCase()) return null;
  const showDetails = await getTVShow(showName);
  return showDetails;
}

export default async function ShowPage({ params }: { params: Promise<{ tvshow: string }> }) {
  const showDetails = await getTVShowFromParams(await params);
  if (!showDetails) notFound();

  return (
    <>
      <HeaderBar />
      <div>
        <ShowPresentation showDetails={showDetails} />
        <ShowExtraInfo showDetails={showDetails} />
      </div>
    </>
  );
}
