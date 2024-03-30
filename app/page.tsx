import Image from "next/image";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import MaxWidthContainer from "@/components/maxWidthContainer";
import BrowseItems from "@/components/BrowseItems";
import Link from "next/link";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main>
      {/* {Header} */}
      <Header />
      {/* Hero */}
      <HeroSection />

      <MaxWidthContainer>
        <HowItWorks />

        <h3 className="font-bold mb-8 mt-8 px-2 py-4 text-center text-xl sm:text-4xl sm:py-8 bg-primary">
          Why buy when you can rent! Choose from thousand of items available to
          rent.
        </h3>

        <BrowseItems />

        <h3 className="my-16 text-center text-xl sm:text-4xl px-2 py-4 sm:py-12 bg-primary">
          Ready to make money?{" "}
          <Link className="font-bold" href="/my-listings">
            Start now &rarr;
          </Link>
        </h3>
      </MaxWidthContainer>
      {/* Browse Items */}

      {/* Footer */}
      <Footer />
    </main>
  );
}
