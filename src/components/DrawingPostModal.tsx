"use client";

import { useState, useRef, useEffect } from "react";
import { ResponsiveModal } from "@/components/ui/responsive-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { Trash2, Undo, Redo, Save, Eraser, Palette } from "lucide-react";

interface DrawingPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (drawingData: any) => void;
}

export function DrawingPostModal({ isOpen, onClose, onSave }: DrawingPostModalProps) {
  const canvasRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [canvasColor, setCanvasColor] = useState("#ffffff");
  const [isEraserMode, setIsEraserMode] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setStrokeColor("#000000");
      setStrokeWidth(2);
      setCanvasColor("#ffffff");
      setIsEraserMode(false);
      setHasContent(false);
      setCanUndo(false);
      setCanRedo(false);
      setHasChanges(false);
      setIsLoading(false);
      
      if (canvasRef.current) {
        canvasRef.current.clearCanvas();
      }
    }
  }, [isOpen]);

  const handleClear = () => {
    if (canvasRef.current) {
      canvasRef.current.clearCanvas();
      setHasContent(false);
    }
  };

  const handleUndo = () => {
    if (canvasRef.current) {
      canvasRef.current.undo();
    }
  };

  const handleRedo = () => {
    if (canvasRef.current) {
      canvasRef.current.redo();
    }
  };

  const handleStrokeColorChange = (color: string) => {
    setStrokeColor(color);
    setHasChanges(true);
  };

  const handleStrokeWidthChange = (width: number) => {
    setStrokeWidth(width);
    setHasChanges(true);
  };

  const handleCanvasColorChange = (color: string) => {
    setCanvasColor(color);
    setHasChanges(true);
  };

  const handleEraserToggle = () => {
    const newEraserMode = !isEraserMode;
    setIsEraserMode(newEraserMode);
  };

  const updateButtonStates = async () => {
    if (canvasRef.current) {
      const paths = await canvasRef.current.exportPaths();
      setHasContent(paths.length > 0);
      setHasChanges(true);
      
      const undoPaths = await canvasRef.current.exportPaths("undo");
      const redoPaths = await canvasRef.current.exportPaths("redo");
      setCanUndo(undoPaths.length > 0);
      setCanRedo(redoPaths.length > 0);
    }
  };

  const handleSave = async () => {
    if (!canvasRef.current || !hasChanges) return;
    
    setIsLoading(true);
    try {
      const paths = await canvasRef.current.exportPaths();
      
      const drawingData = {
        paths: paths,
        strokeColor: strokeColor,
        strokeWidth: strokeWidth,
        canvasColor: canvasColor,
        isEraserMode: isEraserMode
      };
      
      onSave(drawingData);
      onClose();
    } catch (error) {
      console.error("Error saving drawing:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const actionButton = (
    <Button
      onClick={handleSave}
      disabled={isLoading || !hasChanges}
      className="w-full flex items-center gap-2"
    >
      Save
    </Button>
  );

  return (
    <ResponsiveModal
      isOpen={isOpen}
      onClose={onClose}
      title="Drawing Tool"
      description="Draw something interesting"
      className="max-w-4xl"
      actionButton={actionButton}
    >
      <div className="space-y-4">
        <div className="border rounded-lg overflow-hidden">
          <ReactSketchCanvas
            ref={canvasRef}
            width="100%"
            height="400px"
            strokeWidth={isEraserMode ? Math.max(strokeWidth * 2, 10) : strokeWidth}
            strokeColor={isEraserMode ? canvasColor : strokeColor}
            canvasColor={canvasColor}
            style={{ border: "none" }}
            onChange={updateButtonStates}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 p-0">
          <Input
            type="color"
            value={strokeColor}
            onChange={(e) => handleStrokeColorChange(e.target.value)}
            className="w-8 h-8 p-1 border rounded cursor-pointer"
            title="Stroke color"
          />
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleStrokeWidthChange(Math.max(1, strokeWidth - 1))}
            className="h-8 w-8 p-0"
            title="Decrease stroke width"
          >
            -
          </Button>
          <div className="w-8 h-8 flex items-center justify-center text-xs font-medium bg-white border rounded">
            {strokeWidth}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleStrokeWidthChange(Math.min(20, strokeWidth + 1))}
            className="h-8 w-8 p-0"
            title="Increase stroke width"
          >
            +
          </Button>
          
          {/* Background color */}
          <Input
            type="color"
            value={canvasColor}
            onChange={(e) => handleCanvasColorChange(e.target.value)}
            className="w-8 h-8 p-1 border rounded cursor-pointer"
            title="Background color"
          />
          
          <Button
            variant={isEraserMode ? "default" : "outline"}
            size="sm"
            onClick={handleEraserToggle}
            className="h-8 w-8 p-0"
            title={isEraserMode ? "Disable eraser" : "Enable eraser"}
          >
            <Eraser className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleClear}
            disabled={!hasContent}
            className="h-8 w-8 p-0"
            title="Clear drawing"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleUndo}
            disabled={!canUndo}
            className="h-8 w-8 p-0"
            title="Undo"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRedo}
            disabled={!canRedo}
            className="h-8 w-8 p-0"
            title="Redo"
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </ResponsiveModal>
  );
}
