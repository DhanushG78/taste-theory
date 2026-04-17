import { NextResponse } from "next/server";
import Stack, { contentstackConfigured } from "@/lib/contentstack";

const getRecipesFromContentstack = async () => {
  if (!contentstackConfigured || !Stack) return [];

  const Query = Stack.ContentType("recipe").Query();
  Query.includeReference(["category", "author"]);

  const result = await Query.toJSON().find();
  return result[0] || [];
};

export async function GET() {
  const recipes = await getRecipesFromContentstack();
  return NextResponse.json(recipes);
}
