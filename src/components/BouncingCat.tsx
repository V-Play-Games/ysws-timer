import React, {useRef, useEffect, useState} from 'react';

interface BouncingCatProps {
  imageUrl: string;
  onLoad: () => void;
}

const BouncingCat: React.FC<BouncingCatProps> = ({imageUrl, onLoad}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const catRef = useRef<HTMLImageElement | null>(null);
  const animationRef = useRef<number | null>(null);

  // State to track position and velocity
  const positionRef = useRef({x: 100, y: 100});
  const velocityRef = useRef({
    x: Math.random() > 0.5 ? 4 : -4,
    y: Math.random() > 0.5 ? 3 : -3
  });

  // Screensaver bounce animation effect
  useEffect(() => {
    if (!imageLoaded || !catRef.current) return;

    const catImage = catRef.current;

    // Use window dimensions for absolute screen boundaries
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    const imageWidth = 200; // Width in pixels
    const imageHeight = catImage.height * (imageWidth / catImage.width);

    // Function to handle window resizing
    const handleResize = () => {
      // Update container dimensions
      const newContainerWidth = window.innerWidth;
      const newContainerHeight = window.innerHeight;

      // Keep cat within new boundaries
      if (positionRef.current.x > newContainerWidth - imageWidth) {
        positionRef.current.x = newContainerWidth - imageWidth;
      }

      if (positionRef.current.y > newContainerHeight - imageHeight) {
        positionRef.current.y = newContainerHeight - imageHeight;
      }
    };

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    const animate = () => {
      // Update position based on velocity
      positionRef.current.x += velocityRef.current.x;
      positionRef.current.y += velocityRef.current.y;

      // Check for collisions with absolute screen edges
      if (positionRef.current.x <= 0) {
        positionRef.current.x = 0;
        velocityRef.current.x *= -1; // Reverse horizontal direction
        velocityRef.current.y += (Math.random() - 0.5);
      } else if (positionRef.current.x >= containerWidth - imageWidth) {
        positionRef.current.x = containerWidth - imageWidth;
        velocityRef.current.x *= -1;
        velocityRef.current.y += (Math.random() - 0.5);
      }

      if (positionRef.current.y <= 0) {
        positionRef.current.y = 0;
        velocityRef.current.y *= -1; // Reverse vertical direction
        velocityRef.current.x += (Math.random() - 0.5);
      } else if (positionRef.current.y >= containerHeight - imageHeight) {
        positionRef.current.y = containerHeight - imageHeight;
        velocityRef.current.y *= -1;
        velocityRef.current.x += (Math.random() - 0.5);
      }

      // Ensure velocity stays within reasonable bounds
      velocityRef.current.y = Math.max(-6, Math.min(6, velocityRef.current.y));
      velocityRef.current.x = Math.max(-6, Math.min(6, velocityRef.current.x));

      // Apply position to the element
      if (catImage) {
        catImage.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`;
      }

      // Continue animation loop
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation loop
    animationRef.current = requestAnimationFrame(animate);

    // Clean up animation on component unmount or when animation stops
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [imageLoaded]);

  const handleImageLoad = () => {
    setImageLoaded(true);

    // Reset position to a random location on the absolute screen
    positionRef.current = {
      x: Math.random() * (window.innerWidth - 200),
      y: Math.random() * (window.innerHeight - 200)
    };

    // Set a random initial velocity with slightly higher speed
    velocityRef.current = {
      x: (Math.random() > 0.5 ? 4 : -4) + Math.random() * 2,
      y: (Math.random() > 0.5 ? 3 : -3) + Math.random() * 2
    };

    // Call parent's onLoad callback
    onLoad();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen z-50 pointer-events-none overflow-hidden ${imageLoaded ? 'block' : 'hidden'}`}>
      <img
        ref={catRef}
        src={imageUrl}
        alt="Bouncing CatPage"
        className="absolute w-[200px] h-auto transition-transform duration-100 ease-linear"
        style={{width: '200px'}}
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default BouncingCat;
