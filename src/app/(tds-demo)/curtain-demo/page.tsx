import Link from "next/link";

// Dummy studio "Halftone". Swap the copy for your own.
export default function CurtainDemoA() {
  return (
    <main className="tds-pcdemo tds-pcdemo--light">
      <div className="tds-pcdemo__bar">
        <span>Halftone Studio</span>
        <span>01 / Home</span>
      </div>
      <h1 className="tds-pcdemo__title">
        Loud work,<br />quiet studio<i>.</i>
      </h1>
      <div className="tds-pcdemo__links">
        <Link href="/curtain-demo/about" className="tds-pcdemo__link">About the studio →</Link>
        <Link href="/curtain-demo/about#team" className="tds-pcdemo__link">Straight to the team →</Link>
      </div>
    </main>
  );
}
