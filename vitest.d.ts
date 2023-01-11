import { UiControlClient } from 'askui';

declare module 'vitest' {
    export interface TestContext {
        aui?: UiControlClient
    }
}
✨