export class Product {
    public id: number;
    public naam: string;
    public beschrijving: string;
    public imagePath: string;
    public prijs: string;
    public amount: number;

    constructor(naam: string, beschrijving: string, imagePath: string, prijs: string){
        this.naam = naam;
        this.beschrijving = beschrijving;
        this.imagePath = imagePath;
        this.prijs = prijs;
    }
}