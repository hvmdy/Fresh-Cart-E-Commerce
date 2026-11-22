import FooterMobile from "./footer-mobile";
import FooterTablet from "./footer-tablet";
import { FooterBrand, FooterBottom, FooterLinks } from "./footer-shared";

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#111b2d] text-slate-300">
      <div className="hidden lg:block">
        <div className="mx-auto max-w-[1650px] px-8 pt-10">
          <div className="grid grid-cols-[minmax(0,2.2fr)_minmax(0,4fr)] gap-12 border-b border-slate-700/70 pb-10">
            <FooterBrand />
            <FooterLinks className="grid-cols-4 gap-x-6" />
          </div>
          <FooterBottom />
        </div>
      </div>
      <div className="hidden md:block lg:hidden">
        <FooterTablet />
      </div>
      <div className="md:hidden">
        <FooterMobile />
      </div>
    </footer>
  );
}
