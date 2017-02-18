package beans;

import java.io.Serializable;

public class ProizvodKorpa implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 6688115784715293267L;
	private Proizvod proizvod;
	private double kolicina;
	private double cenaDostave;
	private Dostavljac dostavljac;
	private int trajanjeDostave;
	public ProizvodKorpa(Proizvod proizvod, double kolicina) {
		super();
		this.proizvod = proizvod;
		this.kolicina = kolicina;
		this.cenaDostave = 0;
		this.trajanjeDostave = 0;
		this.dostavljac = new Dostavljac();
	}
	
	public ProizvodKorpa() {
		// TODO Auto-generated constructor stub
	}

	public Proizvod getProizvod() {
		return proizvod;
	}

	public void setProizvod(Proizvod proizvod) {
		this.proizvod = proizvod;
	}

	public double getKolicina() {
		return kolicina;
	}

	public void setKolicina(double kolicina) {
		this.kolicina = kolicina;
	}

	public double getCenaDostave() {
		return cenaDostave;
	}

	public void setCenaDostave(double cenaDostave) {
		this.cenaDostave = cenaDostave;
	}

	public Dostavljac getDostavljac() {
		return dostavljac;
	}

	public void setDostavljac(Dostavljac dostavljac) {
		this.dostavljac = dostavljac;
	}

	public int getTrajanjeDostave() {
		return trajanjeDostave;
	}

	public void setTrajanjeDostave(int trajanjeDostave) {
		this.trajanjeDostave = trajanjeDostave;
	}
	
	
}
