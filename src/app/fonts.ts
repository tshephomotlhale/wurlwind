import { Inter, Roboto_Mono } from 'next/font/google';
import localFont from 'next/font/local';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export const movatif = localFont({
  src: "../../public/fonts/Movatif_rg.otf",
  display: 'swap',
  variable: '--font-movatif',
});
