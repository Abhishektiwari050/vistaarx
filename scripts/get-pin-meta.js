/* eslint-disable */
const fs = require("fs");
const path = require("path");

async function main() {
  const url = "https://www.pinterest.com/pin/959477895685222422/";
  const res = await fetch(url, {
    headers: {
      "User-Agent": "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
    },
  });
  const html = await res.text();
  
  const imgMatches = [...html.matchAll(/https:\/\/[^"'\s]+\.pinimg\.com\/[^"'\s]+\.(?:jpg|png|webp|mp4|m3u8)/gi)].map(m => m[0]);
  const vidMatches = [...html.matchAll(/https:\/\/[^"'\s]+\.(?:mp4|m3u8)/gi)].map(m => m[0]);
  console.log("Image matches found:", imgMatches.slice(0, 5));
  console.log("Video matches found:", vidMatches.slice(0, 5));

  if (imgMatches.length > 0) {
    // Pick the largest resolution image match (e.g. 736x or originals)
    const bestImg = imgMatches.find(u => u.includes("736x") || u.includes("originals")) || imgMatches[0];
    console.log("Downloading best image:", bestImg);
    const imgRes = await fetch(bestImg);
    const buffer = Buffer.from(await imgRes.arrayBuffer());
    const outPath = "C:/Users/abhis/.gemini/antigravity/brain/81a6510f-7e3b-4a31-b56d-87868f97c4ac/pin_image.jpg";
    fs.writeFileSync(outPath, buffer);
    console.log("Saved pin image to:", outPath);
  }

  if (ogImg && ogImg[1]) {
    const imgRes = await fetch(ogImg[1]);
    const buffer = Buffer.from(await imgRes.arrayBuffer());
    const outPath = "C:/Users/abhis/.gemini/antigravity/brain/81a6510f-7e3b-4a31-b56d-87868f97c4ac/pin_image.jpg";
    fs.writeFileSync(outPath, buffer);
    console.log("Saved pin image to:", outPath);
  }

  if (ogVid && ogVid[1]) {
    console.log("Found video URL:", ogVid[1]);
  }
}

main().catch(console.error);
