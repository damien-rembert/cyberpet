// @ts-check

// Cyber pet time!
// User selects the kind of animal they’d like (dog, cat,
// rabbit) and you have to play with it, feed it, give it
// drinks etc.
// There should be consequences across the board
// – if you don’t play, it gets bored, if you do, it’s happy,
// but gets thirsty, that kind of thing.

function normalise(value) {
    if (value > 100) {
        value = 100;
    }
    if (value < 0) {
        value = 0;
    }
    return value;
}


class CyberPet {
    constructor(name) {
        this._name = name;
        this._ageInDays = 0;
        this._hunger = 80;
        this._thirst = 70;
        this._boredom = 60;
        this._HP = 100;
        this._bodyType = 50;
        this._isDead = false;
    }

    get isDead() {
        return this._isDead;
    }

    get name() {
        return this._name;
    }
    get age() {
        return this._ageInDays;
    }
    get hunger() {
        return this._hunger;
    }
    get thirst() {
        return this._thirst;
    }
    get boredom() {
        return this._boredom;
    }
    get HP() {
        return this._HP
    }
    get bodyType() {
        return this._bodyType;
    }

    eat(amountOfFood) {
        if (this.hunger - amountOfFood < 0) {
            this._hunger = 0;
            this._bodyType += 10;
        } else {
            this._hunger -= amountOfFood;
        }
    }

    drink(amountOfWater) {
        if (this.thirst - amountOfWater < 0) {
            this._HP -= amountOfWater - this.thirst;
            this._thirst = 0;
        } else {
            this._thirst -= amountOfWater;
        }
    }

    play() {
        this._hunger += 5;
        if (this.boredom < 20) {
            this._boredom = 0;

        } else {
            this._boredom -= 20;
        }
    }

    revive() {
        if (this.isDead) {
            this._HP = 15;
            this._isDead = false;          
        }
    }

    timePassing(duration) {
        for (let i = 0; i < duration; i++) {
            if (this._isDead) {
                break;
            }
            this.incrementDay();
        }
    }

    incrementDay() {
        this._ageInDays++;
        this._hunger += 5;
        this._thirst += 5;
        this._boredom += 5;

        if (this.hunger >= 100) {
            this._HP -= 20;
            this._bodyType -= 10
        }

        if (this.thirst >= 100) {
            this._HP -= 20;
        }


        if (this.boredom >= 100) {
            this._HP -= 10;
        }

        if (this.hunger >= 85) {
            this._bodyType -= 5;
        }

        if (this.HP <= 0) {
            this._isDead = true;
        }

        this._hunger = normalise(this.hunger);
        this._thirst = normalise(this.thirst);
        this._boredom = normalise(this.boredom);
        this._HP = normalise(this.HP);
        this._bodyType = normalise(this.bodyType);


        
        // this._HP = 100;
        // this._bodyType = 50;
        // remove this so it's not annoying when running timePassing?
        this.printStatus();        
    }


    printStatus() {
        let status;
        if (this.isDead) {
            status =`Day ${this.age}. ${this.name} is dead. You could try to revive it.`;
        } else {
            status = `Day ${this.age}. ${this.name}`;
            if (this.HP > 80) {
                status += "'s health is good!";
            } else if (this.HP < 20) {
                status += "'s health is not so great!";
            } else {
                status += "'s health is alright.";
            }

            if (this.hunger > 90) {
                status += " It's pretty hungry!";
            } else if (this.hunger < 20) {
                status += " It does not need food at the moment!";
            }

            if (this.thirst > 90) {
                status += " It's pretty thirsty!";
            } else if (this.thirst < 20) {
                status += " It does not need water at the moment!";
            }

            if (this.boredom > 90) {
                status += " It's pretty bored!";
            } else if (this.boredom < 20) {
                status += " It's enjoying itself!";
            }

            if (this.bodyType > 90) {
                status += " It should probably exercise more.";
            } else if (this.bodyType < 20) {
                status += " It should probably eat more.";
            }
        // this._bodyType = 50;
        }
        console.log(status);
    }
}

class Bunny extends CyberPet {
    constructor(name) {
        super(name);
    }

    hop() {
        // console.log("hopping");
        this.play();
        this.play();
    }

}

class Dog extends CyberPet {
    constructor(name) {
        super(name);
    }
    eat() {
        // console.log("hopping");
        super.eat();
        this.play();
    }
}

class Cat extends CyberPet {
    constructor(name) {
        super(name);
    }
    roam() {
        // console.log("hopping");
        this.eat();
        this.play();
        this.drink(5);
    }
}

let jon = new Dog("Jon");
jon.incrementDay();
jon.eat();
jon.timePassing(20);
console.log(jon.HP);


let rosa = new Bunny("Rosa");
rosa.incrementDay();
rosa.hop();
rosa.timePassing(20);
console.log(jon.HP);

let donald = new Cat("Don");
donald.incrementDay();
donald.roam();
donald.timePassing(20);
