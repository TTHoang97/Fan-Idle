
const counter = document.getElementById("counter");
const upgrade1 = document.getElementById("upgrade1");

function render () {
    counter.textContent = stats.count;
    upgrade1.textContent = `Upgrade (cost: ${upgradeCost()})`;
}

function tick() {
    stats.count = stats.count + stats.perTick;
    render();
}

setInterval(tick, 1000);

function upgradeCost() {
    return stats.upgrades * 10 + 10;
}

function upgrade() {
    if (stats.count >= upgradeCost()){
        stats.count = stats.count - upgradeCost();
        stats.perTick++;
        stats.upgrades++;
        render();
    }
}
upgrade1.addEventListener("click", upgrade);
console.log("Count = " + stats.count);