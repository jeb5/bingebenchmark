import { GetStaticPropsContext } from "next";
import Head from "next/head";
import ShowPresentation from "../components/presentation/ShowPresentation";
import getTVShow from "../lib/tv/getTVShow";
import { TVShow } from "../lib/tv/types";

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
			<div>
				<ShowPresentation showDetails={showDetails} />
			</div>
		</>
	);
}
