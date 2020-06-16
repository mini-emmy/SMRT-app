import * as SQLite from 'expo-sqlite'

const db=SQLite.openDatabase('sarapp.db');

export const init = () => {
    const promise = new Promise((resolve, reject) =>{
    db.transaction((tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS sarmessages (id INTEGER PRIMARY KEY NOT NULL, message TEXT NOT NULL);',
        [],
        ()=>{
            resolve();
        },
        (_,err)=>{
            reject(err);
        }
        );
    });

    db.transaction((tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS sarsettings (id INTEGER PRIMARY KEY NOT NULL, settingsTitle TEXT NOT NULL, settingsText TEXT NOT NULL);',
        [],
        ()=>{
            resolve();
        },
        (_,err)=>{
            reject(err);
        }
        );
    });

});

return promise;
}

export const insertSetting=(settingsTitle, settingsText)=>{
const promise = new Promise((resolve, reject) =>{
    db.transaction((tx) => {    
        tx.executeSql('INSERT OR REPLACE INTO sarsettings (Id, settingsTitle, settingsText) VALUES ((SELECT id from sarsettings WHERE settingsTitle = ?),?,?);',
        [ settingsTitle,settingsTitle, settingsText],
        (_,result)=>{
            console.log(result)
            resolve(result);
        },
        (_,err)=>{
            console.log(err)
            reject(err);
        }
        );
    });

});

return promise;
}

export const fetchSetting = (setting) =>{
    const promise = new Promise((resolve, reject) =>{
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM sarsettings WHERE settingsTitle = "SARnumber";',
            [],
            (_,result)=>{
                resolve(result);
            },
            (_,err)=>{
                reject(err);
            }
            );
        });
    
    });
    
    return promise;
    }