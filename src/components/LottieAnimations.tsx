"use client";

import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface LottieAnimationsProps {
  animation?: string | null;
  children: React.ReactNode;
  width?: number;
  height?: number;
}

export function LottieAnimations({ animation, children, width = 100, height = 50 }: LottieAnimationsProps) {
  if (!animation) {
    return <>{children}</>;
  }

  const getAnimationSrc = () => {
    switch (animation) {
      case 'heart':
        return '/animations/heart.lottie';
      case 'heart_broken':
        return '/animations/heart_broken.lottie';
      case 'heart_blind':
        return '/animations/heart_blind.lottie';
      case 'dog_and_man':
        return '/animations/dog_and_man.lottie';
      case 'path_to_victory':
        return '/animations/path_to_victory.lottie';
      case 'couple_walking':
        return '/animations/couple_walking.lottie';
      default:
        return null;
    }
  };

  const animationSrc = getAnimationSrc();

  if (!animationSrc) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      
      <div className="flex justify-center">
        <div style={{ width: `${width}px`, height: `${height}px` }}>
          <DotLottieReact
            src={animationSrc}
            loop
            autoplay
          />
        </div>
      </div>
    </>
  );
}
