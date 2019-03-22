/**
* index.js
* ========
*
* Its only task is to load the App module
*
* @author  Díaz Agustín
*
*/
import { App } from './app.js';

// gameConfig
// '8-bit' for 8-bit-esque dots, any other string for normal dots
// 'header' dots appear (hidden) behind the header
// 'main' dots appear straight on the playground
// 'middle' dots appear half behind the header, half on the playground
const gameConfig = {
  dotTheme: '8-bit',  
  appears: 'header' 
};

const app = new App(gameConfig);
app.render(document.body);
  