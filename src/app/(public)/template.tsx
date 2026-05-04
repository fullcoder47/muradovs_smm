import { PageTransition } from "@/components/motion/page-transition";

export default function PublicTemplate({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
