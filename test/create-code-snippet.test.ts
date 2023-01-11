import { describe, test, expect } from 'vitest';

describe.skip('Dashboard', () => {
    test('Should create and export a code snippet with AskUI setup', async ({ aui }) => {

        //Make sure the browser window has focus
        await aui.mouseLeftClick().exec();

        // Open a new tab with keyboard shortcut
        await aui.pressTwoKeys('command', 't').exec();

        // type snappify.io into browser bar
        await aui.type('snappify.io').exec();

        // press enter to open snappify.io
        await aui.pressKey('enter').exec();

        // load dashboard 
        await aui.click().text().withText('Dashboard').exec();

        // Start new snap with Add snap button
        await aui.click().text().withText('Add snap').exec();

        await aui.click().text().withText('Blank').exec();

        await aui.click().image().leftOf().text().withText('Add snap').exec();

        // wait to load
        await aui.waitFor(1000).exec();

        // set background width and height
        await aui.click().textfield().below().text().withText('Width').exec();
        await aui.pressTwoKeys('command', 'a').exec();
        await aui.type('1080').exec();

        await aui.click().textfield().rightOf().text().withText('Width').exec();
        await aui.pressTwoKeys('command', 'a').exec();
        await aui.type('512').exec();

        // add code editor
        await aui.click().icon().withText('terminal').or().withText('calendar').exec();

        // focus code editor
        await aui.click().text().withText('/putyOurcodehere').exec();

        // highlight code
        await aui.pressTwoKeys('command', 'a').exec();

        // type new code for snap 
        await aui.type('npm init -y').exec();
        await aui.pressKey('enter').exec();
        await aui.type('// Install askui and other dependencies for writing and executing tests:').exec();
        await aui.pressKey('enter').exec();
        await aui.type('npm i -D askui typescript ts-node @types/jest ts-jest jest').exec();

        // Set code editor to spotlight
        await aui.click().icon().rightOf().text().withText('Codeeditor').exec();

        //Export code snippet
        await aui.click().text().withText('Export').exec();

        // Wait for download
        await aui.waitFor(5000).exec();

        const imageName = await aui.get().text().containsText('.png').exec();

        // Assert downloaded image name matches regex
        expect(imageName[0].text).toMatch(/Snap \(\d+\).png/)
    });
});
