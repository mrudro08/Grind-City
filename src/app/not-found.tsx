import { Button } from "@/components/ui/Button";
import { Pattern } from "@/components/ui/Primitives";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-ink text-white">
      <Pattern kind="iso" className="inset-0 text-white/[0.05]" />
      <div className="relative mx-auto w-full max-w-[1680px] px-6 py-40 md:px-10 lg:px-[60px] 3xl:px-0">
        <p className="label text-[11px] text-orange">404</p>
        <h1 className="display mt-6 text-[clamp(48px,8vw,120px)]">
          Wrong lot.
          <br />
          <span className="text-orange">We moved.</span>
        </h1>
        <p className="mt-6 max-w-[480px] text-lg text-white/70">
          That page isn&apos;t here. The tunnel probably is, though — find this
          weekend&apos;s spot.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/">Back home</Button>
          <Button href="/pop-up#this-weekend" variant="outline">
            This weekend&apos;s pop-up
          </Button>
        </div>
      </div>
    </section>
  );
}
