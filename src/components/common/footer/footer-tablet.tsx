import { FooterBrand, FooterBottom, FooterLinks } from "./footer-shared";

export default function FooterTablet() {
  return (
    <div className="mx-auto max-w-5xl px-8 py-9">
      <div className="grid grid-cols-[1.1fr_1.9fr] gap-10 border-b border-slate-700/70 pb-8">
        <FooterBrand />
        <FooterLinks className="grid-cols-2 gap-x-6 gap-y-7" />
      </div>
      <FooterBottom />
    </div>
  );
}
