/**
* MainArea Module
* ===============
*
* Here we set up the playground of the app, and the overlay
* to show when the game is paused.
* To be created, it needs a callback to increment the score,
* that will be passed to the Dot module.
* It's the middleman between the App module and the Dot module.
* It also handles the pause overlay.
* There's a listener attached to it, to redistribute the dots
* when the size of the screen changes.
* The render method at the end creates the element, inserts it
* into the provided root element, and sets the corresponding bindings
*
* @param {function} incrementScore - Function to execute when a dot is clicked
* @param {Object} [gameConfig] - Some visual configs for the dots
*
* @author  Díaz Agustín
*
*/
import { Dot } from './dot.js';
import { debounced, onAppend } from '../utility.js';

export class MainArea {
    constructor(incrementScore, gameConfig) {
        this.incrementScore = incrementScore; // Callback
        this.gameConfig = gameConfig;
        this.dots = [];
        this.oldWidth;
        this.main;
        this.overlay;
    }
    addDot(size, speed, position) {
        let dot = new Dot(size, speed, position, (dot) => this.removeDot(dot));
        dot.render(this.main, this.gameConfig);
        this.dots.push(dot);
    }
    removeDot(dotToRemove) {
        if(dotToRemove.dot.offsetTop < document.body.offsetHeight) { // Clicked or disappeared?
          this.incrementScore(dotToRemove.score);
        }
        this.dots = this.dots.filter(dot => dot.id !== dotToRemove.id);
        this.main.removeChild(dotToRemove.dot)
    }
    togglePauseResume(newSpeed) {
        this.dots.forEach(dot => dot.togglePauseResume(newSpeed));
    }
    propagateNewSpeed(newSpeed) {
        this.dots.forEach(dot => dot.updateSpeed(newSpeed));
    }
    updateOverlay(newState) {
        if(!this.overlay) return -1;
        this.overlay.classList.toggle('paused');
    }
    getWidth() {
        return this.main.offsetWidth;
    }
    repositionDots(newWidth) {
        this.dots.forEach(dot => dot.updateDimensions(this.oldWidth, newWidth));
        this.oldWidth = newWidth;
    }
    render(root) {
        const el = document.createElement('template');
        const mainAreaTemplate =`<main class="game-area"><div class="overlay"><div class="overlay__message">GAME PAUSED</div></div></main>`;
        el.insertAdjacentHTML('beforeend', mainAreaTemplate);
        this.main = el.getElementsByClassName('game-area')[0];
        this.overlay = el.getElementsByClassName('overlay')[0];
        root.appendChild(el.children[0]);
      
        // Listening when a dot is appended, to trigger its descent
        onAppend(this.main, (added) => {
            const dot = this.dots.find( element => element.id === parseInt(added[0].id));
            dot.fall();
        })
        
        // Debouncing the resize event
        this.updateDimensions = debounced(()=>this.repositionDots(this.getWidth()), 250);
        // Resize listener, to reposition the dots, horizontally
        window.addEventListener("resize", this.updateDimensions);
        this.oldWidth = document.body.offsetWidth;
    }
}