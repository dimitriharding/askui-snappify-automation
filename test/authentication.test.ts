import { describe, test, expect, beforeEach } from 'vitest';


beforeEach(async ({ aui }) => {
    await aui.mouseLeftClick().exec();
    await aui.pressTwoKeys('command', 't').exec();
});

describe('Authentication', () => {
    test('Should be able to login', async ({ aui }) => {
        // Go to snappify.com login page
        await aui.type('https://snappify.com/login').exec();
        await aui.pressKey('enter').exec();

        await aui.typeIn('test@email.com').textfield().below().text().withText('Email').exec();
        await aui.typeIn('testpassword', { isSecret: true }).textfield().below().text().withText('Password').exec();
        await aui.click().text().withText('Login').below().text().withText('Password').exec();

        // confirm login
        await aui.waitFor(1000).exec();
        const dashboardTitle = await aui.get().text().withText('Your').exec();

        expect(dashboardTitle[0].text).toBe('Your Snaps');
    });
});
