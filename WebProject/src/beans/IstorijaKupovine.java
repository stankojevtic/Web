package beans;

import java.io.Serializable;
import java.util.ArrayList;

public class IstorijaKupovine implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -2492638727278907556L;
	
	private String korisnik;
	private ArrayList<Kupovina> listaKupovina;
	private int sifra;
	
	public IstorijaKupovine(String korisnik, ArrayList<Kupovina> listaKupovina) {
		super();
		sifra=0;
		this.korisnik = korisnik;
		this.listaKupovina = listaKupovina;
		
	}
	
	public IstorijaKupovine() {
		// TODO Auto-generated constructor stub
	}

	public String getKorisnik() {
		return korisnik;
	}

	public void setKorisnik(String korisnik) {
		this.korisnik = korisnik;
	}

	public ArrayList<Kupovina> getListaKupovina() {
		return listaKupovina;
	}

	public void setListaKupovina(ArrayList<Kupovina> listaKupovina) {
		this.listaKupovina = listaKupovina;
	}

	public int getSifra() {
		return sifra;
	}

	public void setSifra(int sifra) {
		this.sifra = sifra;
	}
	
	
}
