package beans;

import java.io.Serializable;
import java.util.ArrayList;

public class ListaZelja implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -2043867959131040467L;
	private String korisnik;
	private ArrayList<String> listaProizvoda;
	
	public ListaZelja() {
		// TODO Auto-generated constructor stub
		this.listaProizvoda = new ArrayList<>();
	}

	public ListaZelja(String korisnik, ArrayList<String> listaProizvoda) {
		super();
		this.korisnik = korisnik;
		this.listaProizvoda = listaProizvoda;
	}

	public String getKorisnik() {
		return korisnik;
	}

	public void setKorisnik(String korisnik) {
		this.korisnik = korisnik;
	}

	public ArrayList<String> getListaProizvoda() {
		return listaProizvoda;
	}

	public void setListaProizvoda(ArrayList<String> listaProizvoda) {
		this.listaProizvoda = listaProizvoda;
	}
	
}
