package beans;

import java.io.Serializable;
import java.util.ArrayList;

public class Dostavljac implements Serializable{
 
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -6037407311382384149L;
	private String sifra; //jedinstvena
	private String naziv; 
	private String opis;
	private ArrayList<String> drzavePoslovanja;
	private ArrayList<Integer> trajanjeDostave;
	private double[] tarifaKg;
	private double[] tarifaDim;
	
	
	
	public Dostavljac(String sifra, String naziv, String opis, ArrayList<String> drzavePoslovanja, ArrayList<Integer> trajanjeDostave, double[] tarifaKg, double[] tarifaDim) {
		super();
		this.sifra = sifra;
		this.naziv = naziv;
		this.opis = opis;
		this.drzavePoslovanja =drzavePoslovanja;
		
		this.trajanjeDostave=trajanjeDostave;
		this.tarifaKg = tarifaKg;
		this.tarifaDim = tarifaDim;
	}



	public Dostavljac() {
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



	public String getOpis() {
		return opis;
	}



	public void setOpis(String opis) {
		this.opis = opis;
	}

	

	public ArrayList<Integer> getTrajanjeDostave() {
		return trajanjeDostave;
	}



	public void setTrajanjeDostave(ArrayList<Integer> trajanjeDostave) {
		this.trajanjeDostave = trajanjeDostave;
	}



	public double[] getTarifaKg() {
		return tarifaKg;
	}



	public void setTarifaKg(double[] tarifaKg) {
		this.tarifaKg = tarifaKg;
	}



	public double[] getTarifaDim() {
		return tarifaDim;
	}



	public void setTarifaDim(double[] tarifaDim) {
		this.tarifaDim = tarifaDim;
	}



	public ArrayList<String> getDrzavePoslovanja() {
		return drzavePoslovanja;
	}



	public void setDrzavePoslovanja(ArrayList<String> drzavePoslovanja) {
		this.drzavePoslovanja = drzavePoslovanja;
	}



	
	
}
