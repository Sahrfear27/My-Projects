export type JWTType = { exp: number, aud: string, jti: string };
export type Token = { "token_type": string, "expires_in": number, "access_token": string };
export type PetDetails = { name: string, id: number }
export type PetList = { animals: PetDetails[] }
export type specificPetDetails = { id: number, size: string, age: string, name: string, status: string, breeds: { primary: string | null }, colors: { primary: string | null } }
export type specificPet = { animal: specificPetDetails }
export type BookMark = { [id: string]: string }
export type FetchedData = { access_token: JWTType, secretCode: string }

