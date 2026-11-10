
const counter = document.getElementById("counter");
const ipt = document.getElementById("ipt");
const upgrade1 = document.getElementById("upgrade1");
const notificationBox = document.getElementById("notificationBox");
const notificationText = document.getElementById("notificationText");
const tickInterval = 1000;

function render () {
    counter.textContent = stats.count;
    ipt.textContent = `Increase per tick :${stats.perTick} `;
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
function formatTime(ms){
    const secondsTotal = Math.floor(ms/1000);
    const hours = Math.floor(secondsTotal/3600);
    const minutes = (Math.floor(secondsTotal/60) % 60);
    const seconds = (secondsTotal % 60);

    return hours + "h " + minutes + "m " + seconds + "s"
}

function showOfflineGains(time, gains){
    if (gains <= 0){
        return;    
    }
    notificationText.textContent = `You have been away for ${formatTime(time)} and earned ${gains}.`
    notificationBox.showModal();
}

function calcOffline(){
    const offlineTime = Math.max(0,(Date.now() - stats.lastSaved));
    const offlineGains = ((Math.floor(offlineTime/tickInterval)) * stats.perTick);
    stats.count = (stats.count + offlineGains);

    saveGame();
    render();
    showOfflineGains(offlineTime, offlineGains);
}

//Startup
loadGame();
render();
calcOffline();
setInterval(tick, tickInterval);
const autoSave = setInterval(saveGame, 60000);
window.addEventListener('visibilitychange', handleVisibilityChange);
upgrade1.addEventListener("click", upgrade);