const URL_REGEX = /(https?:\/\/[^\s]+)/g;

export function detectUrls(text: string): string[] {
  const matches = text.match(URL_REGEX);
  return matches || [];
}

export function formatTextWithLinks(text: string): { text: string; isLink: boolean; url?: string }[] {
  const parts: { text: string; isLink: boolean; url?: string }[] = [];
  let lastIndex = 0;
  
  const urls = detectUrls(text);
  
  if (urls.length === 0) {
    return [{ text, isLink: false }];
  }
  
  urls.forEach((url) => {
    const urlIndex = text.indexOf(url, lastIndex);
    
    if (urlIndex > lastIndex) {
      parts.push({
        text: text.slice(lastIndex, urlIndex),
        isLink: false
      });
    }
    
    parts.push({
      text: url,
      isLink: true,
      url: url
    });
    
    lastIndex = urlIndex + url.length;
  });
  
  if (lastIndex < text.length) {
    parts.push({
      text: text.slice(lastIndex),
      isLink: false
    });
  }
  
  return parts;
}

export function isOnlyLink(text: string): boolean {
  const urls = detectUrls(text);
  if (urls.length !== 1) return false;
  
  const cleanText = text.trim();
  return cleanText === urls[0];
}
