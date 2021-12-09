
export default class Score {

    answerCategoryScores = {
        'GOOD': 1,
        'ALMOST': 0.5,
        'NOT_ANSWERED': 0,
        'REVIEW_NEEDED': 0
    }

    constructor(answerNumber) {
        this.good = parseInt(answerNumber['good'], 10);
        this.almost = parseInt(answerNumber['almost'], 10);
        this.notAnswered = parseInt(answerNumber['notAnswered'], 10);
        this.reviewNeeded = parseInt(answerNumber['reviewNeeded'], 10);
        this.answerNumber = this.good + this.almost + this.notAnswered + this.reviewNeeded;
    }

    getSuccessRate()  {
        const score = this.good * this.answerCategoryScores['GOOD'] + 
        this.almost * this.answerCategoryScores['ALMOST'] +
        this.notAnswered * this.answerCategoryScores['NOT_ANSWERED'] +
        this.reviewNeeded * this.answerCategoryScores['REVIEW_NEEDED'];
        let successRate = 0;
        if (score !== 0 && this.answerNumber !== 0) {
            successRate = Math.round(score / this.answerNumber * 100);
        }
        return successRate;
    }

}
