/**
* ActionBtn Module
* ================
*
* Here we create the button that handles the flow of the game.
* It begins as a 'START' button, and once clicked it becomes a
* 'PAUSE'/'RESUME' handler.
* The render method at the end creates the elements, inserts them
* into the provided root element, and sets the corresponding bindings
*
* @param {function} startGameCallback - Callback to be executed when the game starts
* @param {function} pauseResumeCallback - Callback to handle when the game pauses and resumes
*
* @author  Díaz Agustín
*
*/
import { template, debounced } from '../utility.js';

export class ActionBtn {
    constructor(startGameCallback, pauseResumeCallback){
        this.startGameCallback = startGameCallback;
        this.pauseResumeCallback = pauseResumeCallback;
        this.started = false;
        this.paused = false;
        this.validFlags = ['resize', 'visibility'];
        this.button;
        this.pauseListener;
    }
    updateActionBtn(flag = '') {
        if(!this.started) { // Then, let's start!
            if(this.validFlags.indexOf(flag) > -1) return -1;
            this.started = true;
            this.button.innerHTML = 'PAUSE';
            this.startGameCallback();
        } else {
            if(this.paused && this.validFlags.indexOf(flag) > -1) return -1;
            this.paused = !this.paused;
            this.button.innerHTML = (this.paused) ? 'RESUME' : 'PAUSE';
            this.pauseResumeCallback(this.paused? 'paused' : '');
        }
    }
    render(root) {
        const buttonTemplate = template(`<section class="action sm-half md-3rd">
          <button id="action-btn" class="action__btn">
            START
          </button>`)({});
        root.insertAdjacentHTML('beforeend', buttonTemplate);
        this.button = root.getElementsByClassName('action__btn')[0];
        this.button.addEventListener('click', () => this.updateActionBtn());
      
        const debouncedPause = debounced((reason)=>this.updateActionBtn(reason), 150);
        window.addEventListener('resize', ()=>debouncedPause('resize'));
        document.addEventListener("visibilitychange", ()=>debouncedPause('visibility'), false);
    }
};
