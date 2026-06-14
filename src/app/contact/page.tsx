import type { Metadata } from "next";
import ContactPage from "./contact-client";

export const metadata: Metadata = {
  title: "Contact HQ // Vistar Web Systems",
  description: "Connect with Vistar Web Systems. Transmit your project requirements, coordinate timelines, and initiate custom high-performance web platform engineering.",
};

export default function Page() {
  return <ContactPage />;
}
