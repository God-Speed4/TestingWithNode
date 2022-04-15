const functions = require("firebase-functions");
const express = require("express");
const app = express();
const path = require("path");
const { MongoClient, Db } = require("mongodb");

const uri =
    "mongodb+srv://HenriA:HenrisPassword@quizcluster.5oc2z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);
app.use(express.static(path.join(__dirname, "static")));

async function main() {
    //const uri = "mongodb+srv://QuizMaster:QuizMasterPass@cluster0.jm17e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    //const client = new MongoClient(uri);

    try {
        // Will connect to database as soon as user enters the site.
        await client.connect();

        // gets list of databases.
        //await listDatabases(client);

        // Creating listing, calling function to create list.
        // await createListing(client, {
        //     name:"Lovely Loft",
        //     summary: "A charming loft in paris",
        //     bedrooms:1,
        //     bathrooms:1
        // })

        await findOneListingByName(client, "HST01");
    } catch (e) {
        console.error(e);
    } finally {
        //await client.close();
    }
}

// console logging the databases inside of the MongoDB database.
async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach((db) => {
        console.log(`- ${db.name}`);
    });
}

// CREATE (create listing)
async function createListing(client, newListing) {
    const result = await client
        .db("Quiz-Capstone")
        .collection("Quiz")
        .insertOne(newListing);

    console.log(
        `New listing created with the following id: ${result.insertedId}`
    );
}

// READ (find listing)
async function findOneListingByName(client, nameOfListing) {
    const result = await client
        .db("Quiz-Capstone")
        .collection("Quiz")
        .findOne({ quizName: nameOfListing });

    if (result) {
        console.log(
            `Found a listing in the collection with the name '${nameOfListing}'`
        );
        console.log(result);
        return result;
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}

// calling main and catching for errors if any
main().catch(console.error);

// NODE ROUTES:
app.get("/home", (req, res) => {
    res.sendFile(__dirname + "/static/index.html");
});

app.get("/about", (req, res) => {
    res.sendFile(__dirname + "/static/about.html");
});

app.get("/hello", (req, res) => {
    res.send("Hi there!");
    console.log("OKAY");
});

app.get("/api", (req, res) => {
    res.json({ bongs: "BONG ".repeat(hours) });
});

app.get("/HST01", (req, res) => {
    findOneListingByName(client, "HST01").then(function(result) {
        res.type("application/json");
        res.send(`${JSON.stringify(result)}`);
    });
});

app.get("/SCI01", (req, res) => {
    findOneListingByName(client, "SCI01").then(function(result) {
        res.type("application/json");
        res.send(`${JSON.stringify(result)}`);
    });
});

app.get("/MEC01", (req, res) => {
    findOneListingByName(client, "MEC01").then(function(result) {
        res.type("application/json");
        res.send(`${JSON.stringify(result)}`);
    });
});

app.get("/CIS01", (req, res) => {
    findOneListingByName(client, "CIS01").then(function(result) {
        res.type("application/json");
        res.send(`${JSON.stringify(result)}`);
    });
});

// https request
exports.app = functions.https.onRequest(app);