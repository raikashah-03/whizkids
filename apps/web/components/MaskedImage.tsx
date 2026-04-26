'use client';

import React from 'react';

type MaskedImageProps = {
  image: string;
  maskImage: string;
  className?: string;
  aspectRatio?: string;
};

const MaskedImage: React.FC<MaskedImageProps> = ({
  image,
  maskImage,
  className = '',
  aspectRatio = 'aspect-square',
}) => {
  return (
    <div className={`relative ${aspectRatio} ${className}`}>
      {/* Masked Image Content */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',

          // Webkit Support
          WebkitMaskImage: `url(${maskImage})`,
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskSize: '100% 100%',
          WebkitMaskPosition: 'center',

          // Standard Support
          maskImage: `url(${maskImage})`,
          maskRepeat: 'no-repeat',
          maskSize: '100% 100%',
          maskPosition: 'center',
        }}
        role="img"
        aria-label="Masked visuals"
      />
    </div>
  );
};

export default MaskedImage;
