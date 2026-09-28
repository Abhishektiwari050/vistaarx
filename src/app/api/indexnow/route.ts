import { NextResponse } from "next/server";

const INDEXNOW_KEY = "cacf974aed439f58efa2fd6f15276dfa";
const HOST = "www.vistar.tech";

const URL_LIST = [
  "https://www.vistar.tech/",
  "https://www.vistar.tech/work",
  "https://www.vistar.tech/contact",
  "https://www.vistar.tech/services/ai-solutions",
  "https://www.vistar.tech/services/nextjs-engineering",
  "https://www.vistar.tech/services/interactive-3d",
  "https://www.vistar.tech/vectors",
  "https://www.vistar.tech/philosophy",
  "https://www.vistar.tech/start",
  "https://www.vistar.tech/privacy",
  "https://www.vistar.tech/terms",
];

export async function POST() {
  try {
    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
      urlList: URL_LIST,
    };

    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      success: res.ok,
      status: res.status,
      submittedUrls: URL_LIST.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return POST();
}
