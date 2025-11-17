import search from "../../../lib/find_shows/search";
import { ShowBrief } from "../../../lib/find_shows/findHelper";
import { NextRequest, NextResponse } from "next/server";

export type SearchResponse = { results: ShowBrief[] } | { error: string };

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const query = searchParams.get("q");
	if (query === null || query.trim() === "") return NextResponse.json({ error: "Bad Request" }, { status: 400 });


	try {
		const shows = await search(query);
		return NextResponse.json({ results: shows });
	} catch (error) {
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
