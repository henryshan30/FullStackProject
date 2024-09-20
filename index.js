import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

import { db } from "./util/FirebaseInit.js";
import { collection, getDoc, setDoc, doc } from "firebase/firestore";

const app = express();
const port = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/cookies/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            return res.status(404).send('User not found');
        }

        const data = userDoc.data();
        res.json(data); 
    } catch (error) {
        console.error('Error fetching document:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/cookies', async (req, res) => {
    try {
        const { userId, cookies } = req.body;
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);

        let newCookieCount = cookies;
        if (userDoc.exists()) {
            const currentCookies = userDoc.data().cookies || 0;
            newCookieCount = currentCookies + cookies;
        }

        await setDoc(userRef, { cookies: newCookieCount }, { merge: true });
        res.send('Cookie count updated');
    } catch (error) {
        console.error('Error updating document:', error);
        res.status(500).send('Internal Server Error');
    }
});


function start() {
    app.listen(port, () => {
        console.log(`Started listening on http://localhost:${port}`);
    });
}

start();
