import { Tag } from './types';

export function parseTags(text: string): Tag[] {
    const tagRegex: RegExp = /<\/?[A-Z]>/g;
    const matches = text.match(tagRegex) || [];

    return matches.map(tag => ({
        name: tag.replace(/[<\/>]/g, ''),
        isClosing: tag.startsWith('</')
    }));
}