import { checkTags } from './tagChecker';

console.log('Enter text to check. Press Ctrl+C to exit.\n');

//Buffer to strings, listen to data input to cli and action appropriately on enter
process.stdin.setEncoding('utf8');
process.stdin.on('data', (data: string) => {
    const paragraph: string = data.trim();
    if (!paragraph) {
        return;
    }
    console.log(checkTags(paragraph));
});