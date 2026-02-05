export class Rezervacija{
  _id:string="";
  datumOd: Date=new Date();
  datumDo: Date=new Date();
  brojOdraslih: number=0;
  brojDece: number=0;
  zahtevi: string="";
  korisnik: string="";
  vikendicaIme: string="";
  vikendicaMesto: string="";
  vikendicaVlasnik: string="";
  vikendicaId: string="";
  status: string="u obradi";
  datumRezervacje: Date=new Date();
  komentarVlasnika: string="";
}
