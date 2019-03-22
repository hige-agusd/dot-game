/**
* Header Module
* =============
*
* Here we set up the header of the app
* To be created, it needs a set of callbacks to handle game dynamics
* that will be passed to the ActionBtn and Speed modules.
* It's the middleman between the App module and its 3 children:
* Score, ActionBtn and Speed modules.
* The render method at the end creates the element, inserts it
* into the provided root element, and sets the corresponding bindings
*
* @param {function} speedCallback - Function passed to the child Speed
* @param {function} startGameCallback - Function passed to the child ActionBtn
* @param {function} pauseResumeCallback - Function passed to the child ActionBtn
*
* @author  Díaz Agustín
*
*/
import { Score } from './score.js';
import { ActionBtn } from './button.js';
import { Speed } from './speed.js';

export class Header {
    constructor(speedCallback, startGameCallback, pauseResumeCallback) {
        this.speedCallback = speedCallback;
        this.startGameCallback = startGameCallback;
        this.pauseResumeCallback = pauseResumeCallback;
        this.header;
        this.score;
    }
    incrementScore(points) {
        this.score.incrementScore(points);
    }
    render(root) {
        this.header = document.createElement('header');
        this.score = new Score();
        const actionBtn = new ActionBtn(this.startGameCallback, this.pauseResumeCallback);
        const speed = new Speed(this.speedCallback);
        this.score.render(this.header);
        actionBtn.render(this.header);
        speed.render(this.header);
        root.appendChild(this.header);
    }

}