
import { config } from 'dotenv';




function init() {

    config({ path: './config.env' }); // grabs when in dev

    config(); // grabs when in prod

}

init();