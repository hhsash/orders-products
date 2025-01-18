import { Geist, Geist_Mono } from 'next/font/google';
import StoreProvider from '@/redux/StoreProvider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { SUPPORTED_LOCALES } from '@/types/locales';
import Header from '@/components/shared/Header';
import NavigationMenu from '@/components/shared/NavigationMenu';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.scss';

type Props = {
    children: React.ReactNode;
    params: { locale: string };
};

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export function generateStaticParams() {
    return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: Omit<Props, 'children'>) {
    const t = await getTranslations({ locale, namespace: 'HomePage' });

    return {
        title: t('title'),
    };
}

export default async function RootLayout({ children, params: { locale } }: Readonly<Props>) {
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <StoreProvider>
                    <NextIntlClientProvider messages={messages}>
                        <Header />
                        <main className='d-flex'>
                            <NavigationMenu locale={locale} />
                            <div className='content__wrapper col-9 col-sm-10 col-lg-11 p-3'>
                                {children}
                            </div>
                        </main>
                    </NextIntlClientProvider>
                </StoreProvider>
            </body>
        </html>
    );
}
