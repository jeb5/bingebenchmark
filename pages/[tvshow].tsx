import { GetStaticPropsContext } from "next";
import Head from "next/head";
import HeaderBar from "../components/header/HeaderBar";
import ShowPresentation from "../components/presentation/ShowPresentation";
import ShowExtraInfo from "../components/show_extra_info/ShowExtraInfo";
import getTVShow from "../lib/tv_show/getTVShow";
import { TVShow } from "../lib/tv_show/types";

//-----------------------
export function getStaticPaths() {
	return {
		paths: [],
		fallback: "blocking",
	};
	//https://stackoverflow.com/a/67787457/14900196
}
export async function getStaticProps(context: GetStaticPropsContext) {
	const showName = context.params?.tvshow;
	if (typeof showName !== "string" || showName !== showName.toLowerCase()) return { notFound: true };

	const showDetails = await getTVShow(showName);
	if (showDetails === null) return { notFound: true };
	return {
		props: { showDetails },
		revalidate: 60,
	};
}
//-----------------------

export default function ShowPage({ showDetails }: { showDetails: TVShow }) {
	return (
		<>
			<Head>
				<title>{`Does ${showDetails!.name} get better?`}</title>
			</Head>
			<HeaderBar />
			<div>
				<ShowPresentation showDetails={showDetails} />
				{/* <ShowExtraInfo showDetails={showDetails} /> */}
			</div>
		</>
	);
}
