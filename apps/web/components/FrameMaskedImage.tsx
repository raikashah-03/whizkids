'use client';

import Image from 'next/image';
import React from 'react';

type Props = {
  frameImage: string;
  bgImage: string;
  maskImage: string;
  className?: string;
  scaleBgDown?: boolean;
};

const FramedMaskedImage: React.FC<Props> = ({
  frameImage,
  bgImage,
  maskImage,
  className = '',
  scaleBgDown = false,
}) => {
  console.log(frameImage)
  return (
    <div className={`relative ${className}`}>

      {/* Masked Background (ONLY inside shape) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',

          WebkitMaskImage: `url(${maskImage})`,
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskSize: '100% 100%',
          WebkitMaskPosition: 'center',

          maskImage: `url(${maskImage})`,
          maskRepeat: 'no-repeat',
          maskSize: '100% 100%',
          maskPosition: 'center',
          // background: 'green'
        }}
      />

      {/* Top Frame PNG */}
      <Image
        src={frameImage}
        alt="frame"
        width={400}
        height={400}
        className={`relative z-10 w-full h-full object-contain pointer-events-none ${scaleBgDown ? 'scale-[1.05]' : ''}`}
      />
    </div>
  );
};

export default FramedMaskedImage;