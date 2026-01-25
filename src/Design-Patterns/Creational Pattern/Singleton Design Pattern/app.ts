export class DbConnection {
    private static instance: DbConnection;
    private constructor(){}

    getInstance(){
        if(!DbConnection.instance){
           DbConnection.instance = new DbConnection();
        }
        return DbConnection.instance;
    }
}

const db1 = DbConnection.prototype.getInstance();
const db2 = DbConnection.prototype.getInstance();

console.log("Are both instances equal? ", db1 === db2);