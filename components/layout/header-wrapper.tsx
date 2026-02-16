import { getAllDocs } from "@/lib/docs";
import { Header } from "./header-client";

export function HeaderWrapper() {
  const allDocs = getAllDocs();

  return <Header allDocs={allDocs} />;
}
