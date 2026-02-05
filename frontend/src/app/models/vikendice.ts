export class Vikendice {
    _id : string=""
    ime: string = "";
    mesto: string = "";
    usluge: string = "";
    cenovnik: {
        letnji: number;
        zimski: number;
    } = { letnji: 0, zimski: 0 };
    telefon: string = "";
    koordinate: {
        x: number;
        y: number;
    } = { x: 0, y: 0 };
    slike: string[] = [];
    ocene: number[] = [];
    komentari: string[] = [];
    vlasnik: string = "";
}