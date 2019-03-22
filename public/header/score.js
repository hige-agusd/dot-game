/**
* Score Module
* ============
*
* The Score Module is where the visual representation of the current score
* is created and updated.
* The only parameter received is an optional initial score.
* The render method at the end creates the elements, inserts them
* into the provided root element, and sets the corresponding bindings
*
* @param {number} [score=0] - Initial score
*
* @author  Díaz Agustín
*
*/
import { template } from '../utility.js';

export class Score {
    constructor(score = 0){
        this.score = score;
        this.currentScoreValue;
    }
    incrementScore(newScore) {
        this.score += newScore;
        this.currentScoreValue.innerHTML = this.score;
    }
    render(root) {
        let scoreTemplate = template(`<section class="score sm-half md-3rd">
          <label class="score__label">SCORE:</label>
          <div class="score__value">{score}</div>
          </section>`)({score: this.score});
        root.insertAdjacentHTML('beforeend', scoreTemplate);
        this.currentScoreValue = root.getElementsByClassName('score__value')[0];
    }
};
