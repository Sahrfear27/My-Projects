import fetch, { Response } from 'cross-fetch';   // Fetching API
import prompts from "prompts";
import { PetList, specificPet } from "./types";
import { bookMarkList } from "./bookMarkClass";

export async function userInput(secretCode: string) {
    try {

        // Select prompt for selecting animal type
        const selectAnimal = await prompts({
            type: 'select',
            name: 'value',
            message: 'Select Animal-Category',
            choices: [
                { title: 'Dog', value: 'Dog', },
                { title: 'Cat', value: 'Cat' },
            ],
            max: 1,
            hint: '- Space to select. Return to submit'
        });

        // Select prompt for selecting amimal gender
        const selectAnimalGender = await prompts({
            type: 'select',
            name: 'value',
            message: 'Select Animal-Gender',
            choices: [
                { title: 'Male', value: 'Male', },
                { title: 'Female', value: 'Female' },

            ],
            max: 2,
            hint: '- Space to select. Return to submit'
        });

        // GET request and pass choices as query string to retrive the pet data
        const rawAnimalsList: Response = await fetch(`https://api.petfinder.com/v2/animals?type=${selectAnimal.value}&gender=${selectAnimalGender.value}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${secretCode}` }
        });

        const jsonAnimalLists: PetList = await rawAnimalsList.json();

        if (jsonAnimalLists) {

            // Conveting fetched list og animal to choice array
            const petList = jsonAnimalLists.animals;
            const choices = petList.map(list => {
                return {
                    title: list.name,
                    value: list.id
                }
            });

            //Promt for selecting PET Names
            const selectAnimal = await prompts({
                type: 'select',
                name: 'value',
                message: 'Select Animal-Details',
                choices: choices,
                max: 1,
                hint: '- Space to select. Return to submit'
            });


            // Get request to get detailed information of the mentioned named PET
            const rawResponsePet: Response = await fetch(`https://api.petfinder.com/v2/animals/${selectAnimal.value}`, {
                method: "GET",
                headers: { 'Authorization': `Bearer ${secretCode}` }
            });
            const jsonResponsePet: specificPet = await rawResponsePet.json();

            // Detailed output of Specific PET
            console.log('Name: ', jsonResponsePet.animal.name)
            console.log('Breeds: ', jsonResponsePet.animal.breeds.primary);
            console.log('Size: ', jsonResponsePet.animal.size);
            console.log('Age: ', jsonResponsePet.animal.age)
            console.log('Color: ', jsonResponsePet.animal.colors.primary);
            console.log('Status: ', jsonResponsePet.animal.status)


            // Arguments to be sent to addBookMark method
            const petName: string = jsonResponsePet.animal.name;
            const petId: number = jsonResponsePet.animal.id;

            if (bookMarkList.getBookMark(petId) === true) {
                bookMarkList.removeBookMark(petId)

            } else {
                bookMarkList.addBookmark(petName, petId);
            }
            console.log(bookMarkList.displayBookMarkList());

            // Prompting user For more PET
            const wantMorePet = await prompts({
                type: 'select',
                name: 'value',
                message: 'Do you want to look for more PET',
                choices: [
                    { title: 'Yes', value: 'Yes', },
                    { title: 'No', value: 'No' },
                ],
                max: 1,
                hint: '- Space to select. Return to submit'
            });

            if (wantMorePet.value === "Yes") {
                userInput(secretCode)
            }
        };
    } catch {
        console.log("Program Error")

    }
}