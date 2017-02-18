package beans;

import java.io.Serializable;



public class Ocena implements Serializable{

	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -2750770223597893525L;
	private Korisnik korisnik;
	private double ocena;
	public Ocena() {
		// TODO Auto-generated constructor stub
	}
	public Ocena(Korisnik korisnik, double ocena) {
		super();
		this.korisnik = korisnik;
		this.ocena = ocena;
	}
	public Korisnik getKorisnik() {
		return korisnik;
	}
	public void setKorisnik(Korisnik korisnik) {
		this.korisnik = korisnik;
	}
	public double getOcena() {
		return ocena;
	}
	public void setOcena(double ocena) {
		this.ocena = ocena;
	}
	
}
