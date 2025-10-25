"use client";

import { ReactSketchCanvas } from "react-sketch-canvas";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

interface DrawingPreviewProps {
  drawingData: any;
  onRemove: () => void;
}

export function DrawingPreview({ drawingData, onRemove }: DrawingPreviewProps) {
  const canvasRef = useRef<any>(null);

  useEffect(() => {
    if (canvasRef.current && drawingData) {
      canvasRef.current.clearCanvas();
      const paths = drawingData.paths || drawingData;
      canvasRef.current.loadPaths(paths);
    }
  }, [drawingData]);

  const getDrawingConfig = () => {
    if (!drawingData || typeof drawingData !== 'object' || Array.isArray(drawingData)) {
      return {
        strokeColor: "#000000",
        strokeWidth: 1,
        canvasColor: "#ffffff"
      };
    }
    return {
      strokeColor: drawingData.strokeColor || "#000000",
      strokeWidth: drawingData.strokeWidth || 1,
      canvasColor: drawingData.canvasColor || "#ffffff"
    };
  };

  const config = getDrawingConfig();

  return (
    <div 
      className="relative w-24 h-24 border rounded overflow-hidden flex-shrink-0"
      style={{ backgroundColor: config.canvasColor }}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={onRemove}
        className="absolute top-1 right-1 z-10 h-5 w-5 p-0 bg-white/90 hover:bg-red-100 dark:hover:bg-red-900"
      >
        <X className="h-3 w-3" />
      </Button>
      
      <div className="w-24 h-24 overflow-hidden">
        <ReactSketchCanvas
          ref={canvasRef}
          width="200px"
          height="200px"
          strokeWidth={config.strokeWidth}
          strokeColor={config.strokeColor}
          canvasColor={config.canvasColor}
          style={{ 
            border: "none",
            transform: "scale(0.48)",
            transformOrigin: "top left"
          }}
          allowOnlyPointerType="none"
        />
      </div>
    </div>
  );
}