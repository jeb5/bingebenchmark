import type { NextApiRequest, NextApiResponse } from "next";
import search from "../../lib/find_shows/search";
import { z } from "zod";
import { ShowBrief } from "../../lib/find_shows/findHelper";

const querySchema = z.object({
	q: z.string(),
});

export type SearchResponse = { results: ShowBrief[] } | { error: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<SearchResponse>) {
	const query = querySchema.safeParse(req.query);
	if (req.method !== "GET" || !query.success) return res.status(400).json({ error: "Bad Request" });

	const { q } = query.data;

	try {
		const shows = await search(q);
		return res.status(200).json({ results: shows });
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
}
