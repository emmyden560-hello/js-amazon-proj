import { currencyformat } from "../scripts/utilities/money.js";

if (currencyformat(2095) === '20.95' ) {
    console.log('moneytest.js: PASSED');
} else {
    console.log('moneytest.js: FAILED');
}

