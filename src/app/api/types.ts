import { NextRequest, NextResponse } from "next/server";

export type ResponseData<
  T extends (req: NextRequest) => Promise<NextResponse>
> = Awaited<ReturnType<T>> extends NextResponse<infer K> ? K : never;
