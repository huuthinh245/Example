//@flow
import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(true);

class SQL {
    static db = null;
    static initDb() {
        if (this.db === null) {
            SQLite.openDatabase({ name: "testDB" })
                .then(DB => {
                    this.db = DB;
                })
                .catch(err => console.log(err));
        }
    }

    static closeDb() {
        if (this.db !== null) {
            this.db.close()
                .then(status => console.log(status));
        }
        // if(this.db) {
        //   this.db.close().then(status => console.log(status));
        // }
    }
    okCallback(success: any) {
        console.log(success);
    }

    errorCallback(err : any) {
        console.log(err);
    }
}

export default SQL;