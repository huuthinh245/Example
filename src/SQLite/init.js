import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(true);

// initDb = () => {
//     db = SQLite.openDatabase({ name: "testDB" }, okCallback, errorCallback);
// }

// okCallback = (result) => {
//     console.log(result);
// }
// errorCallback = (err) => {
//     console.log(err);
// }

class SQL {
    static db =null;
    static  initDb() {
        if(this.db === null) {
            SQLite.openDatabase({ name: "testDB" })
            .then(DB => {
                this.db= DB;
            })
            .catch(err => console.log(err));
        }
    }

    static closeDb() {
        if(this.db !== null) {
            this.db.close()
            .then(status => console.log(status));
        }
        // if(this.db) {
        //   this.db.close().then(status => console.log(status));
        // }
    }
    okCallback = (success) => {
        console.log(success);
    }

    errorCallback = (err) => {
        console.log(err);
    }
}

export default SQL;