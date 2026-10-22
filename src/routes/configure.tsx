import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site";
import { Configurator } from "@/components/configurator";

export const Route = createFileRoute("/configure")({
  head: () => ({
    meta: [
      { title: "Build Your AI Front Office | AI Solution Company" },
      { name: "description", content: "Pick the 34 front-office problems you want solved and see which AI employees and plan fit your medical practice." },
      { property: "og:title", content: "Build Your AI Front Office for Your Medical Practice" },
      { property: "og:description", content: "Toggle the problems you want solved and get your recommended plan instantly." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <div className="overflow-x-clip"><SiteHeader /><main><Configurator standalone /></main><SiteFooter /></div>
  ),
});
