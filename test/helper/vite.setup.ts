import { UiControlClient } from 'askui';
import { beforeAll, afterAll, afterEach, expect, beforeEach } from 'vitest';

const { toMatchImageSnapshot } = require('jest-image-snapshot');

// extend vitest expect with toMatchImageSnapshot for screenshot comparison
expect.extend({ toMatchImageSnapshot });

// Client is necessary to use the askui API
// eslint-disable-next-line import/no-mutable-exports
let aui: UiControlClient;

beforeAll(async () => {
    aui = await UiControlClient.build({
        credentials: {
            workspaceId: import.meta.env.VITE_ASKUI_WORKSPACE_ID,
            token: import.meta.env.VITE_ASKUI_API_KEY,
        },
    });

    await aui.connect();
});

beforeEach(async (context) => {
    context.aui = aui;
});

afterEach(async (testData) => {
    if (testData) {
        console.log(JSON.stringify(testData, null, 2));
    }
});

afterAll(async () => {
    aui.close();
});

export { aui };
