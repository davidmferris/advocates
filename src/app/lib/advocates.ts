import db from "@/db";
import { advocates } from "@/db/schema";
import { count, sql } from "drizzle-orm";

export const getAdvocates = async (
  search: string | undefined,
  page: number = 1,
  pageSize: number = 10
) => {
  const offset = (page - 1) * pageSize;
  let query = db.select().from(advocates).$dynamic();
  let countQuery = db.select({ count: count() }).from(advocates).$dynamic();

  if (search) {
    const searchCondition = sql`LOWER(${
      advocates.firstName
    }) LIKE LOWER(${`%${search}%`}) OR
      LOWER(${advocates.lastName}) LIKE LOWER(${`%${search}%`}) OR
      LOWER(${advocates.city}) LIKE LOWER(${`%${search}%`}) OR
      LOWER(${advocates.degree}) LIKE LOWER(${`%${search}%`}) OR
      LOWER(${advocates.specialties}::text) LIKE LOWER(${`%${search}%`}) OR
      ${advocates.yearsOfExperience}::text LIKE ${`%${search}%`}`;

    query = query.where(searchCondition);
    countQuery = countQuery.where(searchCondition);
  }

  const [total] = await countQuery;
  const results = await query.limit(pageSize).offset(offset);

  return {
    results,
    total: total.count,
    page,
    pageSize,
    totalPages: Math.ceil(total.count / pageSize),
  };
};
