
const counter = document.getElementById("counter");
const tps = document.getElementById("tps");
const upgrade1 = document.getElementById("upgrade1");

function render () {
    counter.textContent = stats.count;
    tps.textContent = `Increase per tick :${stats.perTick} `;
    upgrade1.textContent = `Upgrade (cost: ${upgradeCost()})`;
}

function tick() {
    stats.count = stats.count + stats.perTick;
    render();
}

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

function handleVisibilityChange(){
    if(document.visibilityState === "hidden"){
        saveGame();
    }
}

//Startup
loadGame();
render();
const tickInterval = setInterval(tick, 1000);
const autoSave = setInterval(saveGame, 60000);
window.addEventListener('visibilitychange', handleVisibilityChange);
upgrade1.addEventListener("click", upgrade);