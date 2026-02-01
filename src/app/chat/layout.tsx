import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat with Miam | Free MIAM Preparation Assistant",
  description:
    "Talk or chat with Miam, your free AI assistant for MIAM certificate preparation. Get help understanding the mediation process, costs, and exemptions.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
