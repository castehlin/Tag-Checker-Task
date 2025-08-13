import { Tag } from './types';
import { parseTags } from './utils';

export function checkTags(textToCheck: string): string {
    //Get our tags with regex
    const foundTags: Tag[] = parseTags(textToCheck);
    const stack: string[] = [];

    for (const foundTag of foundTags) {
        //Skip to next iteration, opening tag found and added to stack
        if (foundTag.isClosing == false) {
            stack.push(foundTag.name);
            continue;
        }

        //We reached the end of stack and have a closing tag, but nothing in stack to close it against. Error with text...
        if (stack.length === 0) {
            return `Expected # found </${foundTag.name}>`;
        }

        //Closing tag compared against last open tag
        const top: string = stack[stack.length - 1];
        if (top === foundTag.name) {
            stack.pop();
        } else {
            return `Expected </${top}> found </${foundTag.name}>`;
        }
    }

    //We are left with an opening tag that didn't have a closing tag. Issue...
    if (stack.length > 0) {
        const top = stack[stack.length - 1];
        return `Expected </${top}> found #`;
    }

    return 'Correctly tagged paragraph';
}