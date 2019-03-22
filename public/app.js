/**
* App Module
* ========
*
* This Module is in charge of setting up the general variables
* and importing the two major containers this app has:
* Header and MainArea components.
* Also here, we are going to concentrate the callbacks needed to
* connect the different sections of the app.
*
* @param {Object} [gameConfig] - Some visual configs for the dots
*
* @author  Díaz Agustín
*
*/
import { Header } from './header/header.js';
import { MainArea } from './main/main.js';
import { debounced, onAppend } from '../utility.js';

export class App {
    // Global settings
    constructor(gameConfig) {
        this.gameConfig = gameConfig;
        this.maxDotSize = 10; // The 10th part of the maximum size
        this.minDotSize = 1; // The 10th part of the minimum size
        this.currentSpeed = 3;
        this.paused = false;
        this.mainInterval;
        this.main;
        this.header;
    }
    /*-- CALBACKS --*/
    speedChanged(newSpeed) {  
        this.currentSpeed = newSpeed;
        if(!this.paused) this.main.propagateNewSpeed(newSpeed);
    }
    incrementScore(points) {
        this.header.incrementScore(points);
    }
    pauseResume(newState) {
        this.main.updateOverlay(newState);
        this.paused = !this.paused;
        this.main.togglePauseResume(this.paused? 0 : this.currentSpeed);
        if(this.paused) {
            clearInterval(this.mainInterval);
        } else {
            this.startGame();
        }
    }
    /*-- /CALBACKS --*/

    startGame() {
        this.mainInterval = setInterval(() => {
            let size = (Math.floor(Math.random() * this.maxDotSize) + this.minDotSize) * 10;
            let speed = this.currentSpeed;
            let position = Math.floor(Math.random() * (this.main.getWidth() - size));
            this.main.addDot(size, speed, position);
        }, 1000);
    }

    render(root){
        let newFragment = document.createDocumentFragment();
        this.header = new Header((newSpeed)=>this.speedChanged(newSpeed), ()=>this.startGame(), ()=>this.pauseResume());
        this.header.render(newFragment);
        this.main = new MainArea((points)=>this.incrementScore(points), this.gameConfig);
        this.main.render(newFragment);
        root.appendChild(newFragment);
    }
}
  