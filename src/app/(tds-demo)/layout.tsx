import { Archivo, Geist } from "next/font/google";
import { PageCurtain } from "@/components/tds/page-curtain/PageCurtain";
import "@/components/tds/page-curtain/demo.css";

const display = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--tds-display" });
const sans = Geist({ subsets: ["latin"], variable: "--tds-sans" });

// Demo only: in your real app put <PageCurtain> in app/layout.tsx around everything in <body>.
export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${display.variable} ${sans.variable}`}>
      <PageCurtain>{children}</PageCurtain>
    </div>
  );
}
