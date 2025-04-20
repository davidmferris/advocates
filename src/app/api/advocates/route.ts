import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

import { ResponseData } from "../types";
import { getAdvocates } from "@/app/lib";

const getAdvocatesInputSchema = z.object({
  search: z.string().optional(),
  page: z.string().optional(),
});

export type AdvocateResultsT = ResponseData<typeof GET>;
export type AdvocateT = NonNullable<
  AdvocateResultsT["data"]["results"]
>[number];

export async function GET(request: NextRequest) {
  const searchParams = Object.fromEntries(request.nextUrl.searchParams);
  const { search, page } = getAdvocatesInputSchema.parse(searchParams);
  const data = await getAdvocates(search, page ? parseInt(page) : 1);

  return NextResponse.json({ data });
}
