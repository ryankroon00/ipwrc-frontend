import { Bestelling } from "../bestelling.model";

export class User{
    public id: number;
    public jwt: string;
    public username: string;
    public email: string;
    public adres: string;
    public postcode: string;
    public role: string;
    public bestellingen: Bestelling[];

    constructor(id: number, name: string, email: string, adres: string, postcode: string){
        this.id = id;
        this.username = name;
        this.email = email;
        this.adres = adres;
        this.postcode = postcode;
        this.bestellingen = [];
    }

    private addBestelling(bestelling: Bestelling): void{
        this.bestellingen.push(bestelling);
    }
    private removeBestelling(index: number): void{
        this.bestellingen.splice(index, 1);
    }
}
