"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useToast } from "@/hooks/use-toast";
import { Share, Copy, Check } from "lucide-react";

interface ShareDropdownProps {
  postId: string;
}

export function ShareDropdown({ postId }: ShareDropdownProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [postUrl, setPostUrl] = useState("");
  const isMobile = useIsMobile();
  const { showToast } = useToast();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPostUrl(`${window.location.origin}/post/${postId}`);
    }
  }, [postId]);

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!postUrl) return;
    
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      showToast("Link copied to clipboard!", "success");
      setTimeout(() => setCopied(false), 2000);
      setOpen(false);
    } catch (error) {
      showToast("Error copying link", "error");
    }
  };

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={(e) => e.stopPropagation()}
          >
            <Share className="h-4 w-4" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Share post</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleCopyLink}
            >
                <Copy className="h-4 w-4 mr-2" />
                Copy link
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={(e) => e.stopPropagation()}
        >
          <Share className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleCopyLink}>
            <Copy className="h-4 w-4 mr-2" />
            Copy link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
