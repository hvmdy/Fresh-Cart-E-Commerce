import { FooterBrand, FooterBottom, FooterLinks } from "./footer-shared";

export default function FooterMobile() {
  return (
    <div className="mx-auto max-w-lg px-5 py-8">
      <FooterBrand />
      <FooterLinks className="grid-cols-2 gap-x-4 gap-y-6 border-y border-slate-700/70 py-6" />
      <FooterBottom className="border-t border-slate-700/70 pt-4" />
    </div>
  );
}
