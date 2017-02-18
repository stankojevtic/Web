package beans;

import java.io.Serializable;

import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
@JsonIgnoreProperties(ignoreUnknown = true)
public class Proizvod implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 7216418674260412115L;
	private String sifra; //jedinstvena
	private String naziv; 
	private String boja;
	private double dimenzije;
	private double tezina;
	private String zemljaProizvodnje;
	private String nazivProizvodjaca;
	private double jedinicnaCena;
	private KategorijaProizvoda kategorija;
	private String slika;
	private String video;
	private ArrayList<Ocena> oceneKorisnika;
	private double ocena;
	private double akcija;
	private String datumAkcije;
	private ArrayList<Recenzija> recenzije;
	private double kolicinaUMagacinu;
	private Prodavnica prodavnica;
	public Proizvod(String sifra, String naziv, String boja, double dimenzije, double tezina, String zemljaProizvodnje,
			String nazivProizvodjaca, double jedinicnaCena, KategorijaProizvoda kategorija, String slika, String video,
			double ocena, double kolicinaUMagacinu, Prodavnica prodavnica) {
		super();
		this.sifra = sifra;
		this.naziv = naziv;
		this.boja = boja;
		this.dimenzije = dimenzije;
		this.tezina = tezina;
		this.zemljaProizvodnje = zemljaProizvodnje;
		this.nazivProizvodjaca = nazivProizvodjaca;
		this.jedinicnaCena = jedinicnaCena;
		this.kategorija = kategorija;
		this.slika = slika;
		this.video = video;
		this.ocena = ocena;
		this.recenzije = new ArrayList<>();
		this.kolicinaUMagacinu = kolicinaUMagacinu;
		this.prodavnica=prodavnica;
		this.oceneKorisnika=new ArrayList<>();
		this.akcija = 0;
	}
	
	public Proizvod() {
		// TODO Auto-generated constructor stub
	}

	public String getSifra() {
		return sifra;
	}

	public void setSifra(String sifra) {
		this.sifra = sifra;
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public String getBoja() {
		return boja;
	}

	public void setBoja(String boja) {
		this.boja = boja;
	}

	public double getDimenzije() {
		return dimenzije;
	}

	public void setDimenzije(double dimenzije) {
		this.dimenzije = dimenzije;
	}

	public double getTezina() {
		return tezina;
	}

	public void setTezina(double tezina) {
		this.tezina = tezina;
	}

	public String getZemljaProizvodnje() {
		return zemljaProizvodnje;
	}

	public void setZemljaProizvodnje(String zemljaProizvodnje) {
		this.zemljaProizvodnje = zemljaProizvodnje;
	}

	public String getNazivProizvodjaca() {
		return nazivProizvodjaca;
	}

	public void setNazivProizvodjaca(String nazivProizvodjaca) {
		this.nazivProizvodjaca = nazivProizvodjaca;
	}

	public double getJedinicnaCena() {
		return jedinicnaCena;
	}

	public void setJedinicnaCena(double jedinicnaCena) {
		this.jedinicnaCena = jedinicnaCena;
	}

	public KategorijaProizvoda getKategorija() {
		return kategorija;
	}

	public void setKategorija(KategorijaProizvoda kategorija) {
		this.kategorija = kategorija;
	}

	public String getSlika() {
		return slika;
	}

	public void setSlika(String slika) {
		this.slika = slika;
	}

	public String getVideo() {
		return video;
	}

	public void setVideo(String video) {
		this.video = video;
	}

	public double getOcena() {
		return ocena;
	}

	public void setOcena(double ocena) {
		this.ocena = ocena;
	}



	public double getKolicinaUMagacinu() {
		return kolicinaUMagacinu;
	}

	public void setKolicinaUMagacinu(double kolicinaUMagacinu) {
		this.kolicinaUMagacinu = kolicinaUMagacinu;
	}

	public Prodavnica getProdavnica() {
		return prodavnica;
	}

	public void setProdavnica(Prodavnica prodavnica) {
		this.prodavnica = prodavnica;
	}

	public ArrayList<Recenzija> getRecenzije() {
		return recenzije;
	}

	public void setRecenzije(ArrayList<Recenzija> recenzije) {
		this.recenzije = recenzije;
	}

	public ArrayList<Ocena> getOceneKorisnika() {
		return oceneKorisnika;
	}

	public void setOceneKorisnika(ArrayList<Ocena> oceneKorisnika) {
		this.oceneKorisnika = oceneKorisnika;
	}

	public double getAkcija() {
		return akcija;
	}

	public void setAkcija(double akcija) {
		this.akcija = akcija;
	}

	public String getDatumAkcije() {
		return datumAkcije;
	}

	public void setDatumAkcije(String datumAkcije) {
		this.datumAkcije = datumAkcije;
	}
	
	
	
}
