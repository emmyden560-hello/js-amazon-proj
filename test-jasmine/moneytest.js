import { currencyformat } from "../scripts/utilities/money.js";

describe('test suite: currencyformat', () => {
    it('converts cents into dollars', () => {
        expect(currencyformat(2095)).toBe('20.95');
    });
});