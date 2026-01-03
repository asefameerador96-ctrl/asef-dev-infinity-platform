import novaLogo from "@/assets/brands/nova-logo.png";
import xforceLogo from "@/assets/brands/xforce-logo.jpg";
import liveMomentLogo from "@/assets/brands/live-moment-logo.png";

export const brandLogos = {
  nova: novaLogo,
  xforce: xforceLogo,
  'live-moment': liveMomentLogo,
} as const;

export type BrandKey = keyof typeof brandLogos;

export const getBrandLogo = (brand: BrandKey): string => {
  return brandLogos[brand];
};
