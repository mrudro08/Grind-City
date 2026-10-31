import type { Metadata } from "next";
import { site } from "@/data/site";
import { reviews } from "@/data/content";
import { buildMetadata, JsonLd, breadcrumbLd } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { Button } from "@/components/ui/Button";
import {
  ReviewsArt,
  RatingSummary,
  AllReviews,
  TellMemphis,
} from "@/components/sections/ReviewsPageSections";
import { Cta } from "@/components/sections/Cta";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("reviews", {
    title: "Reviews — 4.9 stars, Memphis said it",
    description:
      "Weekend drivers, HR teams and fleet managers on Grind City Detail — Memphis' mobile hand car wash. 4.9 stars on Google.",
    path: "/reviews",
  });
}

export default function ReviewsPage() {
  return (
    <>
      <Hero
        variant="dark"
        compact
        crumbs={[{ label: "Home", href: "/" }, { label: "Reviews" }]}
        line1={`${site.rating.value} stars.`}
        line2="Memphis said it."
        intro="Weekend drivers, HR teams and fleet managers — here's what they say after the tunnel."
        actions={
          <>
            <Button href="https://g.page/grindcitydetail/review" magnetic>
              Leave a review
            </Button>
            <Button href="/pop-up#this-weekend" variant="outline">
              This weekend&apos;s spot
            </Button>
          </>
        }
        aside={<ReviewsArt />}
      />
      <Marquee />
      <RatingSummary />
      <AllReviews />
      <TellMemphis />
      <Cta />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AutoWash",
          "@id": `${site.url}/#business`,
          name: site.name,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: site.rating.value,
            reviewCount: site.rating.count,
            bestRating: 5,
          },
          review: reviews.map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.name },
            reviewBody: r.quote,
            reviewRating: {
              "@type": "Rating",
              ratingValue: r.rating,
              bestRating: 5,
            },
          })),
        }}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Reviews", path: "/reviews" },
        ])}
      />
    </>
  );
}
