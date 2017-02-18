package beans;

import java.io.Serializable;

public class KategorijaProizvoda implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 5341021376891477320L;
	private String naziv;
	private String opis;
	private KategorijaProizvoda podKategorija;
	public KategorijaProizvoda(String naziv, String opis) {
		super();
		this.naziv = naziv;
		this.opis = opis;
		this.podKategorija= new KategorijaProizvoda();
	}
	
	public KategorijaProizvoda() {
		// TODO Auto-generated constructor stub
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public String getOpis() {
		return opis;
	}

	public void setOpis(String opis) {
		this.opis = opis;
	}

	public KategorijaProizvoda getPodKategorija() {
		return podKategorija;
	}

	public void setPodKategorija(KategorijaProizvoda podKategorija) {
		this.podKategorija = podKategorija;
	}
	
	
}
