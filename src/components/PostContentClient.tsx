"use client";

import { ReactSketchCanvas } from "react-sketch-canvas";
import { useEffect, useRef } from "react";
import { formatTextWithLinksAndHashtags } from "@/lib/url-utils";

interface PostContentClientProps {
  type: string;
  content?: string | null;
  drawing_data?: any;
  isLinkOnly?: boolean;
  className?: string;
  isDetailView?: boolean;
  isThumbnail?: boolean;
}

const DEFAULT_CONFIG = {
  strokeColor: "#000000",
  strokeWidth: 1,
  canvasColor: "#ffffff"
};

const SIZE_CONFIG = {
  thumbnail: {
    drawing: { width: "200px", height: "200px", scale: 0.4, container: "w-20 h-20" },
    mixed: { width: "160px", height: "160px", scale: 0.4, container: "w-16 h-16" }
  },
  normal: {
    drawing: { height: "200px" },
    mixed: { height: "150px" }
  },
  detail: {
    drawing: { height: "400px" },
    mixed: { height: "300px" }
  }
};

export function PostContentClient({ 
  type, 
  content, 
  drawing_data, 
  isLinkOnly = false,
  className = "",
  isDetailView = false,
  isThumbnail = false
}: PostContentClientProps) {
  const canvasRef = useRef<any>(null);
  const textParts = content ? formatTextWithLinksAndHashtags(content) : [];

  useEffect(() => {
    if (canvasRef.current && drawing_data) {
      canvasRef.current.clearCanvas();
      setTimeout(() => {
        if (canvasRef.current) {
          const paths = drawing_data.paths || drawing_data;
          canvasRef.current.loadPaths(paths);
        }
      }, 100);
    }
  }, [drawing_data]);

  const getDrawingConfig = () => {
    if (!drawing_data || typeof drawing_data !== 'object' || Array.isArray(drawing_data)) {
      return DEFAULT_CONFIG;
    }
    return {
      strokeColor: drawing_data.strokeColor || DEFAULT_CONFIG.strokeColor,
      strokeWidth: drawing_data.strokeWidth || DEFAULT_CONFIG.strokeWidth,
      canvasColor: drawing_data.canvasColor || DEFAULT_CONFIG.canvasColor
    };
  };

  // Renderizar texto formatado
  const renderFormattedText = (textClassName: string) => (
    <p className={textClassName}>
      {textParts.map((part, index) => 
        part.isLink ? (
          <span key={index} className="text-blue-600 dark:text-blue-400 underline">
            {part.text}
          </span>
        ) : part.isHashtag ? (
          <span key={index} className="text-blue-600 dark:text-blue-400 font-medium">
            {part.text}
          </span>
        ) : (
          <span key={index}>{part.text}</span>
        )
      )}
    </p>
  );

  const renderCanvas = (config: any, sizeConfig: any, isThumbnail: boolean = false) => {
    const { strokeColor, strokeWidth, canvasColor } = getDrawingConfig();
    
    const canvasProps = {
      ref: canvasRef,
      strokeWidth,
      strokeColor,
      canvasColor,
      style: { border: "none" },
      allowOnlyPointerType: "all" as const
    };

    if (isThumbnail) {
      return (
        <div className={`${sizeConfig.container} overflow-hidden`}>
          <ReactSketchCanvas
            {...canvasProps}
            width={sizeConfig.width}
            height={sizeConfig.height}
            style={{ 
              ...canvasProps.style,
              transform: `scale(${sizeConfig.scale})`,
              transformOrigin: "top left"
            }}
          />
        </div>
      );
    }

    return (
      <ReactSketchCanvas
        {...canvasProps}
        width="100%"
        height={sizeConfig.height}
      />
    );
  };

  const renderCanvasContainer = (sizeConfig: any, isThumbnail: boolean = false) => {
    const containerClass = isThumbnail 
      ? `border rounded overflow-hidden bg-white ${sizeConfig.container} flex items-center justify-center`
      : "border rounded overflow-hidden bg-white";
    
    return (
      <div className={containerClass}>
        {renderCanvas(getDrawingConfig(), sizeConfig, isThumbnail)}
      </div>
    );
  };

  if (type === "drawing") {
    if (isThumbnail) {
      return (
        <div className={`${SIZE_CONFIG.thumbnail.drawing.container} ${className}`}>
          {renderCanvasContainer(SIZE_CONFIG.thumbnail.drawing, true)}
        </div>
      );
    }

    const height = isDetailView 
      ? SIZE_CONFIG.detail.drawing.height 
      : SIZE_CONFIG.normal.drawing.height;

    return (
      <div className={`border rounded overflow-hidden bg-white ${className}`}>
        {renderCanvas(getDrawingConfig(), { height }, false)}
      </div>
    );
  }

  if (type === "text" && content) {
    return renderFormattedText(`${isLinkOnly ? 'break-all' : 'truncate'} ${className}`);
  }

  if (type === "mixed") {
    if (isThumbnail) {
      return (
        <div className={`space-y-2 ${className}`}>
          {content && renderFormattedText(`${isLinkOnly ? 'break-all' : 'truncate'} text-sm`)}
          {renderCanvasContainer(SIZE_CONFIG.thumbnail.mixed, true)}
        </div>
      );
    }

    const height = isDetailView 
      ? SIZE_CONFIG.detail.mixed.height 
      : SIZE_CONFIG.normal.mixed.height;

    return (
      <div className={`space-y-3 ${className}`}>
        {content && renderFormattedText(`${isLinkOnly ? 'break-all' : 'truncate'}`)}
        {renderCanvasContainer({ height }, false)}
      </div>
    );
  }

  return null;
}
