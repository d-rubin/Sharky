class Level {
    enemies;
    bottles;
    coins;
    backgroundObjects;
    level_end_x = 1420;

    constructor(enemies, bottles, coins, backgroundObjects) {
        this.enemies = enemies;
        this.bottles = bottles;
        this.coins = coins;
        this.backgroundObjects = backgroundObjects;
    }
}