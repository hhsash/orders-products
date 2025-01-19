'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const Home = () => {
    const t = useTranslations('HomePage');

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <h3>{t('title')}</h3>
            <p>{t('description')}</p>
        </motion.div>
    );
};

export default Home;
