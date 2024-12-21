import { model } from "@/utils/gemini";
import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest) {
  const { index, data } = await req.json();

  const response = await model.generateContent(
    JSON.stringify({ index, blocks: data.blocks })
  );

  return new NextResponse(JSON.stringify({ msg: response.response.text() }));
}

export { handler as POST };
