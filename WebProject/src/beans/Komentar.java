package beans;

import java.io.Serializable;


public class Komentar implements Serializable{


	
	/**
	 * 
	 */
	private static final long serialVersionUID = -6037913647821851618L;
	private String korisnik;
	private String datum; 
	private String sadrzaj;
	public Komentar(String korisnik, String datum, String sadrzaj) {
		super();
		this.korisnik = korisnik;
		this.datum = datum;
		this.sadrzaj = sadrzaj;
	}
	
	public Komentar() {
		// TODO Auto-generated constructor stub
	}

	public String getKorisnik() {
		return korisnik;
	}

	public void setKorisnik(String korisnik) {
		this.korisnik = korisnik;
	}

	public String getDatum() {
		return datum;
	}

	public void setDatum(String datum) {
		this.datum = datum;
	}

	public String getSadrzaj() {
		return sadrzaj;
	}

	public void setSadrzaj(String sadrzaj) {
		this.sadrzaj = sadrzaj;
	}
	
	
}
