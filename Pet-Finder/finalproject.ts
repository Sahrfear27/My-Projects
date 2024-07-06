import { jwtDecode } from "jwt-decode";  // Importing decoding dependencies 
import fetch, { Response } from 'cross-fetch';   // Fetching API
import { JWTType, Token, FetchedData } from "./types"; // PetDetails, PetList, specificPetDetails, specificPet
import { localStorage, } from "./localstorage";
import { userInput } from "./userInput";


async function getAccessToken() {

    try {

        // POST request with body
        const rawAccessToken: Response = await fetch("https://api.petfinder.com/v2/oauth2/token", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "grant_type": "client_credentials",
                    "client_id": "8zTlv7Jg3EKdy6Gnc82U71Geit8mipgI1HhZdSZp9t6GtyBJvq",
                    "client_secret": "jwKuiaSamVvmpK5tPNAz2Hv3LxN8bU4B4mDee3q8"
                }
            )
        });

        // Parsing raw access token object
        const jsonAccessToken: Token = await rawAccessToken.json()

        // Accessing encrypted access_token
        const encryptedToken: string = jsonAccessToken.access_token;

        // Decripting access_token
        const decodedToken: JWTType = jwtDecode<JWTType>(encryptedToken);

        // Declaring object of decripted access code to save to local storage
        const saveData = { access_token: decodedToken, secretCode: encryptedToken }

        // Saving token to local storage
        localStorage.setItem('token', JSON.stringify(saveData))
        return saveData;
    }
    catch (error) {
        console.error(`Error Fetching access token: ${error}`);
        throw error;
    }
};

async function readTokenFromLocalStorage() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            const initialToken: FetchedData = await getAccessToken(); // Wait for token retrieval
            userInput(initialToken.secretCode);
        } else {
            const fetchedToken: FetchedData = JSON.parse(token);
            if (fetchedToken.access_token.exp * 1000 > Date.now()) {
                userInput(fetchedToken.secretCode);
            } else {
                const initialToken: FetchedData = await getAccessToken(); // Refresh expired token
                userInput(initialToken.secretCode);
            }
        }
    } catch (error) {
        console.error(`Error reading data: ${error}`);
    }
};

readTokenFromLocalStorage()

