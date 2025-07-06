import React, {useRef, useState} from 'react';

interface BouncingCatProps {
  imageUrl: string;
  onLoad: () => void;
}

class Position {
  x: Coordinate;
  y: Coordinate;

  constructor(x: number, y: number) {
    this.x = new Coordinate(x);
    this.y = new Coordinate(y);
  }

  public plus(other: Position) {
    this.x.plus(other.x)
    this.y.plus(other.y)
  }
}

class Coordinate {
  value: number;

  constructor(value: number) {
    this.value = value;
  }

  public clamp(min: number, max: number) {
    this.value = (Math.max(min, Math.min(max, this.value)));
  }

  public plus(other: Coordinate) {
    this.value = (this.value + other.value);
  }

  public randomize() {
    this.value = (this.value * -1 + Math.random() - 0.5);
  }
}

const BouncingCat: React.FC<BouncingCatProps> = ({imageUrl, onLoad}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const catRef = useRef<HTMLImageElement>(null);

  const handleImageLoad = () => {
    setImageLoaded(true);
    onLoad();
    let animationId = 0;

    const catImage = catRef.current!;
    const imageWidth = 200;
    const imageHeight = catImage.height * (imageWidth / catImage.width);
    const position = new Position(
      Math.random() * (window.innerWidth - imageWidth),
      Math.random() * (window.innerHeight - imageHeight)
    );
    const velocity = new Position(
      (2 * Math.round(Math.random()) - 1) * 6 + Math.random() * 2,
      (2 * Math.round(Math.random()) - 1) * 4 + Math.random() * 2
    );

    const animate = () => {
      position.plus(velocity)
      position.x.clamp(0, window.innerWidth - imageWidth);
      position.y.clamp(0, window.innerHeight - imageHeight);
      if (position.x.value == 0 || position.x.value == window.innerWidth - imageWidth) {
        velocity.x.randomize();
      }
      if (position.y.value == 0 || position.y.value == window.innerHeight - imageHeight) {
        velocity.y.randomize();
      }

      velocity.x.clamp(6, -6)
      velocity.y.clamp(6, -6)

      catImage.style.transform = `translate(${position.x.value}px, ${position.y.value}px)`;

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationId);
    };
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen z-50 pointer-events-none overflow-hidden ${imageLoaded ? 'block' : 'hidden'}`}>
      <img
        ref={catRef}
        src={imageUrl}
        alt="Bouncing Cat"
        className="absolute w-[200px] h-auto transition-transform duration-100 ease-linear"
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default BouncingCat;
