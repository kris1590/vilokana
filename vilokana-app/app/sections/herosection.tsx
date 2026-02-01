import { Hero } from '@/sanity.types';
import React from 'react';
import PortableTextComponent from '../components/portable-text';

type Props = {};

const HeroSection = ({ data }: { data: Hero }) => {
    return (
        <>
            {data.title ? <PortableTextComponent value={data.title} /> : null}
            {data.description ? <PortableTextComponent value={data.description} /> : null}

        </>
    );
};

export default HeroSection;