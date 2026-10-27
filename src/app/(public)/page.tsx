import { About } from "@/components/home/about";
import { Benefits } from "@/components/home/benefits";
import { Hero } from "@/components/home/hero";
import { MembershipDetails } from "@/components/home/membership-details";

export default function Home() {
  return (
    <>
      <Hero />
      <Benefits />
      <About />
      <MembershipDetails />
    </>
  );
}
