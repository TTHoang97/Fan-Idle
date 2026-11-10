const SAVE_KEY = "fanIdleSave";

function saveGame(){
    const saveData = JSON.stringify(stats);
    localStorage.setItem(SAVE_KEY, saveData);
}

function loadGame(){
    try{
        const rawSaveData = localStorage.getItem(SAVE_KEY);
        if (rawSaveData == null){
            return;
        }
        
        const parsedSaveData = JSON.parse(rawSaveData);
        Object.assign(stats, parsedSaveData);
    }catch (err){
        console.warn("Failed to load save file with error.", err);
    }
}