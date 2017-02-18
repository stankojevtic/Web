package beans;

import java.io.Serializable;
import java.util.ArrayList;

public class Korisnik implements Serializable{

		/**
	 * 
	 */
	private static final long serialVersionUID = -192481458403049781L;
		private String korisnickoIme;
		private String lozinka;
		private String ime;
		private String prezime;
		private String uloga;
		private String telefon;
		private String email;
		private String adresa;
		private String drzava;
		private ArrayList<Proizvod> listaZelja;
		private ArrayList<ProizvodKorpa> istorijaKupovine;
		
		public final static String KUPAC = "Kupac";
		public final static String PRODAVAC = "Prodavac";
		public final static String ADMIN = "Admin";
		
		public Korisnik() {
			// TODO Auto-generated constructor stub
		}

		public Korisnik(String korisnickoIme, String lozinka, String ime, String prezime, String uloga, String telefon,
				String email, String adresa, String drzava) {
			super();
			this.korisnickoIme = korisnickoIme;
			this.lozinka = lozinka;
			this.ime = ime;
			this.prezime = prezime;
			this.uloga = uloga;
			this.telefon = telefon;
			this.email = email;
			this.adresa = adresa;
			this.drzava = drzava;
			this.listaZelja = null;
			this.istorijaKupovine = new ArrayList<>();
		}

		public String getKorisnickoIme() {
			return korisnickoIme;
		}

		public void setKorisnickoIme(String korisnickoIme) {
			this.korisnickoIme = korisnickoIme;
		}

		public String getLozinka() {
			return lozinka;
		}

		public void setLozinka(String lozinka) {
			this.lozinka = lozinka;
		}

		public String getIme() {
			return ime;
		}

		public void setIme(String ime) {
			this.ime = ime;
		}

		public String getPrezime() {
			return prezime;
		}

		public void setPrezime(String prezime) {
			this.prezime = prezime;
		}

		public String getUloga() {
			return uloga;
		}

		public void setUloga(String uloga) {
			this.uloga = uloga;
		}

		public String getTelefon() {
			return telefon;
		}

		public void setTelefon(String telefon) {
			this.telefon = telefon;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public String getAdresa() {
			return adresa;
		}

		public void setAdresa(String adresa) {
			this.adresa = adresa;
		}

		public String getDrzava() {
			return drzava;
		}

		public void setDrzava(String drzava) {
			this.drzava = drzava;
		}

		public ArrayList<Proizvod> getListaZelja() {
			return listaZelja;
		}

		public void setListaZelja(ArrayList<Proizvod> listaZelja) {
			this.listaZelja = listaZelja;
		}

		public ArrayList<ProizvodKorpa> getIstorijaKupovine() {
			return istorijaKupovine;
		}

		public void setIstorijaKupovine(ArrayList<ProizvodKorpa> istorijaKupovine) {
			this.istorijaKupovine = istorijaKupovine;
		}
		
		
		
		
}
