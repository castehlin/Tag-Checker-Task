import { checkTags } from '../src/tagChecker';

describe('checkTags', () => {
    describe('test cases that should pass, includes ones from example', () => {
        test.each([
            //Example from PDF
            ["The following text<C><B>is centred and in boldface</B></C>", "Correctly tagged paragraph"],
            //Example from PDF
            ["<B>This <\g > is <B>boldface</B> in <<*> a</B> <\\6> <<d>sentence", "Correctly tagged paragraph"],
            //Misc extras
            ["<X></X><W></W>Plain text <F></F>", "Correctly tagged paragraph"],
            ["<A><D><E>Nested</E></D></A>", "Correctly tagged paragraph"],
            ["Nothing here!, just text <> << >> </> <", "Correctly tagged paragraph"],
            ["12345 test test", "Correctly tagged paragraph"],
        ])('returns "Correctly tagged paragraph" for valid/ignorable input [%s]', (input, expected) => {
            expect(checkTags(input)).toBe(expected);
        });
    });

    describe('test cases that should fail, including ones from example', () => {
        test.each([
            //Example from PDF
            ["<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>", "Expected </C> found </B>"],
            //Example from PDF
            ["<B>This should be in boldface, but there is an extra closing tag</B></C>", "Expected # found </C>"],
            //Example from PDF
            ["<B><C>This should be centred and in boldface, but there is a missing closing tag</C>", "Expected </B> found #"],
            // Misc extras
            ["</B>Starts with a closer", "Expected # found </B>"],
            ["<A>Oops this isn't right</B>", "Expected </A> found </B>"],
            ["<A><B><C>This one isn't either</B></C></A>", "Expected </C> found </B>"],
            ["<A></A><B>Text</C>", "Expected </B> found </C>"],
            ["<A><B>Ends missing", "Expected </B> found #"],
        ])('detects first error correctly for [%s]', (input, expected) => {
            expect(checkTags(input)).toBe(expected);
        });
    });
});