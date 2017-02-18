package beans;

import java.io.Serializable;
import java.util.ArrayList;

public class Kupovina implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -2550405981850585128L;
	private int sifra; //jedinstvena
	private Korisnik kupac;
	private Prodavnica pridavnica;
	public static final double porez = 0.20;
	private ArrayList<ProizvodKorpa> proizvodi;
	private Dostavljac dostavljac;
	private double trajanjePrenosa;
	private double ukupnaCena;
	
	public Kupovina() {
		// TODO Auto-generated constructor stub
	}

	public Kupovina(int sifra, Korisnik kupac, Prodavnica pridavnica, ArrayList<ProizvodKorpa> proizvodi,
			Dostavljac dostavljac, double trajanjePrenosa, double ukupnaCena) {
		super();
		this.sifra = sifra;
		this.kupac = kupac;
		this.pridavnica = pridavnica;
		this.proizvodi = proizvodi;
		this.dostavljac = dostavljac;
		this.trajanjePrenosa = trajanjePrenosa;
		this.ukupnaCena = ukupnaCena;
	}

	public int getSifra() {
		return sifra;
	}

	public void setSifra(int sifra) {
		this.sifra = sifra;
	}

	public Korisnik getKupac() {
		return kupac;
	}

	public void setKupac(Korisnik kupac) {
		this.kupac = kupac;
	}

	public Prodavnica getPridavnica() {
		return pridavnica;
	}

	public void setPridavnica(Prodavnica pridavnica) {
		this.pridavnica = pridavnica;
	}

	public ArrayList<ProizvodKorpa> getProizvodi() {
		return proizvodi;
	}

	public void setProizvodi(ArrayList<ProizvodKorpa> proizvodi) {
		this.proizvodi = proizvodi;
	}

	public Dostavljac getDostavljac() {
		return dostavljac;
	}

	public void setDostavljac(Dostavljac dostavljac) {
		this.dostavljac = dostavljac;
	}

	public double getTrajanjePrenosa() {
		return trajanjePrenosa;
	}

	public void setTrajanjePrenosa(double trajanjePrenosa) {
		this.trajanjePrenosa = trajanjePrenosa;
	}

	public double getUkupnaCena() {
		return ukupnaCena;
	}

	public void setUkupnaCena(double ukupnaCena) {
		this.ukupnaCena = ukupnaCena;
	}
	
	
	
}
