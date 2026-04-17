import { NextResponse } from "next/server";
import Stack, { contentstackConfigured } from "@/lib/contentstack";

export async function GET() {
  if (!contentstackConfigured || !Stack) {
    return NextResponse.json({ error: "No stack" });
  }

  const result: any = {};
  
  try {
    const q1 = await Stack.ContentType("recipe").Query().toJSON().find();
    result.recipes = q1[0];
  } catch (e) {
    result.recipes_error = JSON.stringify(e);
  }

  try {
    const q2 = await Stack.ContentType("category").Query().toJSON().find();
    result.categories = q2[0];
  } catch (e) {
    result.categories_error = JSON.stringify(e);
  }

  try {
    const q3 = await Stack.ContentType("chef").Query().toJSON().find();
    result.authors = q3[0];
  } catch (e) {
    result.authors_error = JSON.stringify(e);
  }

  return NextResponse.json(result);
}
