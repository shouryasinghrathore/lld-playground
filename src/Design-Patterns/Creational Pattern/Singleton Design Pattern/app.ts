export class DbConnection {
    private static instance: DbConnection;
    private constructor(){}

   static getInstance(){
        if(!DbConnection.instance){
           DbConnection.instance = new DbConnection();
        }
        return DbConnection.instance;
    }
}

const db1 = DbConnection.getInstance();
const db2 = DbConnection.getInstance();

console.log("Are both instances equal? ", db1 === db2);