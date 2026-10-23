import Link from "next/link";

export default function CurtainDemoB() {
  return (
    <main className="tds-pcdemo tds-pcdemo--dark">
      <div className="tds-pcdemo__bar">
        <span>Halftone Studio</span>
        <span>02 / About</span>
      </div>
      <h1 className="tds-pcdemo__title">
        Nine people,<br />one table<i>.</i>
      </h1>
      <div className="tds-pcdemo__links">
        <Link href="/curtain-demo" className="tds-pcdemo__link">← Back home</Link>
      </div>
      <section id="team" className="tds-pcdemo__team">
        <h2>The team</h2>
        <p>The transition landed here while the curtain was still down.</p>
      </section>
    </main>
  );
}
