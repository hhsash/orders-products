import { Geist, Geist_Mono } from 'next/font/google';
import StoreProvider from '@/redux/StoreProvider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { SUPPORTED_LOCALES } from '@/types/locales';
import Header from '@/components/shared/Header';
import NavigationMenu from '@/components/shared/NavigationMenu';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.scss';

type Params = Promise<{ locale: string }>;

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

export async function generateMetadata(props: { params: Params }) {
    const { locale } = await props.params;
    const t = await getTranslations({ locale, namespace: 'HomePage' });

    return {
        title: t('title'),
    };
}

export default async function RootLayout(props: { children: React.ReactNode; params: Params }) {
    const { locale } = await props.params;
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
                                {props.children}
                            </div>
                        </main>
                    </NextIntlClientProvider>
                </StoreProvider>
            </body>
        </html>
    );
}
