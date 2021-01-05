const mongoClient = require('mongodb').MongoClient
const URI = "mongodb+srv://abdullah:testpassword@nodefirst.oksv7.mongodb.net/retryWrites=true&w=majority"

const config = {
    useUnifiedTopology: true
}

mongoClient.connect(URI, config, (error, myMongoClient) => {
    if (error) {
        console.log("Connection failed!");
    } else {
        // InsertData(myMongoClient)
        // DeleteData(myMongoClient)
        // FindOne(myMongoClient)
        // FindOneProjection(myMongoClient)
        // FindOneQuery(myMongoClient)
        // UpdateData(myMongoClient)
        // CreateNewCollection(myMongoClient)
        DropCollection(myMongoClient)

        console.log("Connection established!");
    }
})

// C

function InsertData(myMongoClient) {
    let myDataBase = myMongoClient.db("demo");
    let listCollection = myDataBase.collection("list")

    const myData = {
        "id": 5,
        "name": "Abdullah Al Rafi",
        "spouse": "Jebunnesa"
    }

    listCollection.insertOne(myData, (error) => {
        if (error) {
            console.log("Data insert failed!");
        } else {
            console.log("Data insert success!");
        }
    })
}

// R

function FindOne(myMongoClient) {
    let myDataBase = myMongoClient.db("demo");
    let listCollection = myDataBase.collection("list")

    // sort pattern
    let myData = {
        "name": -1
    }

    // with limit
    listCollection.find().limit(10).sort(myData).toArray((error, found) => {
        if (error) {
            console.log("Data not found!");
        } else {
            console.log("Data found!");
            console.log(found);
        }
    })
}

function FindOneProjection(myMongoClient) {
    let myDataBase = myMongoClient.db("demo");
    let listCollection = myDataBase.collection("list")

    let myData = {}
    let myDataProjection = { "projection": { "spouse": "" } }

    listCollection.find(myData, myDataProjection).toArray((error, found) => {
        if (error) {
            console.log("Data not found!");
        } else {
            console.log("Data found!");
            console.log(found);
        }
    })
}

function FindOneQuery(myMongoClient) {
    let myDataBase = myMongoClient.db("demo");
    let listCollection = myDataBase.collection("list")

    let myQuery = { "spouse": "Unknown" }

    listCollection.find(myQuery).toArray((error, found) => {
        if (error) {
            console.log("Data not found!");
        } else {
            console.log("Data found!");
            console.log(found);
        }
    })
}

// U

function UpdateData(myMongoClient) {
    let myDataBase = myMongoClient.db("demo");
    let listCollection = myDataBase.collection("list")

    let myQuery = { "id": 0 }
    let myValues = { $set: { "spouse": "Abdullah Al Rafi" } }

    listCollection.updateMany(myQuery, myValues, (error, result) => {
        if (error) {
            console.log("Data not updated!");
        } else {
            console.log("Data updated!");
            console.log(result);
        }
    })
}


// D

function DeleteData(myMongoClient) {
    let myDataBase = myMongoClient.db("demo");
    let listCollection = myDataBase.collection("list")

    let myData = {
        "id": 1
    }

    listCollection.deleteOne((error) => {
        if (error) {
            console.log("Data delete failed!");
        } else {
            console.log("Data delete success!");
        }
    })
}


// create new collection/table

function CreateNewCollection(myMongoClient) {
    let myDataBase = myMongoClient.db("demo");
    myDataBase.createCollection("another", (error, result) => {
        console.log(result);
    })
}

// delete existing collection/table

function DropCollection(myMongoClient) {
    let myDataBase = myMongoClient.db("demo");
    myDataBase.dropCollection("another", (error, result) => {
        console.log("Deleted successfully!");
    })
}