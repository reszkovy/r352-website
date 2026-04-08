import { Philosophy as PhilosophySection } from "@/app/components/agency/Philosophy";
import { PageTransition } from "@/app/components/ui/PageTransition";

export function Philosophy() {
  return (
    <PageTransition className="pt-20">
      <PhilosophySection />
    </PageTransition>
  );
}
