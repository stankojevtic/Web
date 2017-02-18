package beans;

import java.io.Serializable;
import java.util.ArrayList;

public class Recenzija implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 186069030029055308L;
	private String sifra; //jedinstvena
	private Korisnik korisnik;
	private String datum;
	private ArrayList<Ocena> oceneKorisnika;
	private double ocena;
	private ArrayList<Komentar> komentari;
	public Recenzija(String sifra, Korisnik korisnik, String datum, double ocena) {
		super();
		this.sifra = sifra;
		this.korisnik = korisnik;
		this.datum = datum;
		this.ocena = ocena;
		this.komentari=new ArrayList<>();
		this.oceneKorisnika=new ArrayList<>();
	}
	public Recenzija() {
		// TODO Auto-generated constructor stub
	}
	public String getSifra() {
		return sifra;
	}
	public void setSifra(String sifra) {
		this.sifra = sifra;
	}
	public Korisnik getKorisnik() {
		return korisnik;
	}
	public void setKorisnik(Korisnik korisnik) {
		this.korisnik = korisnik;
	}
	public String getDatum() {
		return datum;
	}
	public void setDatum(String datum) {
		this.datum = datum;
	}
	public double getOcena() {
		return ocena;
	}
	public void setOcena(double ocena) {
		this.ocena = ocena;
	}
	public ArrayList<Komentar> getKomentari() {
		return komentari;
	}
	public void setKomentari(ArrayList<Komentar> komentari) {
		this.komentari = komentari;
	}
	public ArrayList<Ocena> getOceneKorisnika() {
		return oceneKorisnika;
	}
	public void setOceneKorisnika(ArrayList<Ocena> oceneKorisnika) {
		this.oceneKorisnika = oceneKorisnika;
	}
	
	
	
}
