
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: number;
  className?: string;
  containerClassName?: string;
  fallback?: React.ReactNode;
  loadingBehavior?: "eager" | "lazy";
}

const ResponsiveImage = ({
  src,
  alt,
  aspectRatio = 16 / 9,
  className,
  containerClassName,
  fallback,
  loadingBehavior = "lazy",
  ...props
}: ResponsiveImageProps) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  return (
    <div className={cn("overflow-hidden relative", containerClassName)}>
      <AspectRatio ratio={aspectRatio}>
        {isLoading && !error && (
          <Skeleton className="absolute inset-0 h-full w-full rounded-md" />
        )}
        {error && fallback ? (
          fallback
        ) : (
          <img
            src={src}
            alt={alt || ""}
            loading={loadingBehavior}
            className={cn(
              "h-full w-full object-cover transition-opacity duration-300",
              isLoading ? "opacity-0" : "opacity-100",
              className
            )}
            onLoad={() => setIsLoading(false)}
            onError={() => setError(true)}
            {...props}
          />
        )}
      </AspectRatio>
    </div>
  );
};

export { ResponsiveImage };
