import { useTheme } from 'next-themes';

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  style?: React.CSSProperties;
  className?: string;
  layer?: boolean;
  onClick?: any
}

export function PreImage({ src, layer, width, height, style, className, alt, onClick }: Props) {
  const { theme } = useTheme();
  const backgroundLayer = theme === 'light' ? 'bg-slate-300' : 'bg-black';

  return (
    <div>
      {src ? (
        <div className='relative w-full h-full overflow-hidden'>
          <img
            src={src}
            alt={alt}
            style={{ ...style, width: `${width}px`, height: `${height}px` }}
            className={className}
            onClick={onClick}
          />
          {layer && (
            <div
              style={style}
              className={`${className} ${backgroundLayer} absolute top-0 left-0 w-full h-full opacity-30`}
            ></div>
          )}
        </div>
      ) : (
        <div>
          <img
            src='/images/default.png'
            style={{ ...style, width: `50px`, height: `50px` }}
            className={className}
          />
        </div>
      )}
    </div>
  );
}
