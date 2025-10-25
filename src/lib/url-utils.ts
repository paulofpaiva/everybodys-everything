const URL_REGEX = /(https?:\/\/[^\s]+)/g;
const HASHTAG_REGEX = /#[\w\u0590-\u05ff]+/g;

export function detectUrls(text: string): string[] {
  const matches = text.match(URL_REGEX);
  return matches || [];
}

export function detectHashtags(text: string): string[] {
  const matches = text.match(HASHTAG_REGEX);
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

export function formatTextWithLinksAndHashtags(text: string): { text: string; isLink: boolean; isHashtag: boolean; url?: string }[] {
  const parts: { text: string; isLink: boolean; isHashtag: boolean; url?: string }[] = [];
  let lastIndex = 0;
  
  const urls = detectUrls(text);
  const hashtags = detectHashtags(text);
  
  const allMatches = [
    ...urls.map(url => ({ text: url, type: 'url', index: text.indexOf(url) })),
    ...hashtags.map(hashtag => ({ text: hashtag, type: 'hashtag', index: text.indexOf(hashtag) }))
  ].sort((a, b) => a.index - b.index);
  
  if (allMatches.length === 0) {
    return [{ text, isLink: false, isHashtag: false }];
  }
  
  allMatches.forEach((match) => {
    if (match.index > lastIndex) {
      parts.push({
        text: text.slice(lastIndex, match.index),
        isLink: false,
        isHashtag: false
      });
    }
    
    parts.push({
      text: match.text,
      isLink: match.type === 'url',
      isHashtag: match.type === 'hashtag',
      url: match.type === 'url' ? match.text : undefined
    });
    
    lastIndex = match.index + match.text.length;
  });
  
  if (lastIndex < text.length) {
    parts.push({
      text: text.slice(lastIndex),
      isLink: false,
      isHashtag: false
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
