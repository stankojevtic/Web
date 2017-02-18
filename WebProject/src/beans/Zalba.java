package beans;

import java.io.Serializable;

public class Zalba implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 7041752548181810640L;
	private String korisnik;
	private String sifraKupovine;
	private String sadrzajZalbe;
	public Zalba() {
		// TODO Auto-generated constructor stub
	}
	public Zalba(String korisnik, String sifraKupovine, String sadrzajZalbe) {
		super();
		this.korisnik = korisnik;
		this.sifraKupovine = sifraKupovine;
		this.sadrzajZalbe = sadrzajZalbe;
	}
	public String getKorisnik() {
		return korisnik;
	}
	public void setKorisnik(String korisnik) {
		this.korisnik = korisnik;
	}
	public String getSifraKupovine() {
		return sifraKupovine;
	}
	public void setSifraKupovine(String sifraKupovine) {
		this.sifraKupovine = sifraKupovine;
	}
	public String getSadrzajZalbe() {
		return sadrzajZalbe;
	}
	public void setSadrzajZalbe(String sadrzajZalbe) {
		this.sadrzajZalbe = sadrzajZalbe;
	}
	
	
	
}
