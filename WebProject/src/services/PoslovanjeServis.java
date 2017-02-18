package services;

import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInput;
import java.io.ObjectInputStream;
import java.io.ObjectOutput;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.UUID;

import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Dostavljac;
import beans.IstorijaKupovine;
import beans.KategorijaProizvoda;
import beans.Komentar;
import beans.Korisnik;
import beans.Kupovina;
import beans.ListaZelja;
import beans.Ocena;
import beans.Prodavnica;
import beans.Proizvod;
import beans.ProizvodKorpa;
import beans.Recenzija;
import beans.Zalba;



@Path("/proizvodi")
public class PoslovanjeServis {

	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	
	public void init(){

		
		
//		if(ctx.getAttribute("korisnici")==null){
			
			
			Korisnik a1 = new Korisnik("admin", "admin", "Stanko", "Jevtic", Korisnik.ADMIN, "987654321", "mail@hotmail.com","adresa","Srbija");
			Korisnik k1 = new Korisnik("kor1", "kor1", "Joca", "Grbic", Korisnik.KUPAC, "987654321", "mail@hotmail.com","sb95","Srbija");
			Korisnik k2 = new Korisnik("kor2", "kor2", "Milos", "Peric", Korisnik.KUPAC, "987654321", "mail@hotmail.com","adresa","Srbija");
			Korisnik k3 = new Korisnik("kor3", "kor3", "Gojko", "Jocic", Korisnik.KUPAC, "987654321", "mail@hotmail.com","adresa","Srbija");
			Korisnik p1 = new Korisnik("prod1", "prod1", "Mihajlo", "Grbic", Korisnik.PRODAVAC, "987654321", "mail@hotmail.com","adresa","Srbija");
			Korisnik p2 = new Korisnik("prod2", "prod2", "Stevan", "Petrovic", Korisnik.PRODAVAC, "987654321", "mail@hotmail.com","adresa","Srbija");
			Korisnik p3 = new Korisnik("prod3", "prod3", "Sava", "Ninkovic", Korisnik.PRODAVAC, "987654321", "mail@hotmail.com","adresa","Srbija");
			
			
			ArrayList<Korisnik> korisnici= new ArrayList<>();
			korisnici.add(a1);
			korisnici.add(k1);
			korisnici.add(k2);
			korisnici.add(k3);
			korisnici.add(p1);
			korisnici.add(p2);
			korisnici.add(p3);
	
			
			
			ctx.setAttribute("korisnici", korisnici);
			sacuvajKorisnike();	
//			if(ctx.getAttribute("prodavnice") == null)
//			{
			
				Prodavnica pr1=new Prodavnica("p1","Vitorog","Novi Sad","Srbija","0216044545","vitorog@hotmail.com",p1.getKorisnickoIme(),0);
				Prodavnica pr2=new Prodavnica("p2","MTS","Beograd","Srbija","021603245","mts@hotmail.com",p1.getKorisnickoIme(),0);
				Prodavnica pr3=new Prodavnica("p3","DivTrade","Backa Palanka","Hrvatska","0216041235","divtrade@hotmail.com",p2.getKorisnickoIme(),0);
				Prodavnica pr4=new Prodavnica("p4","Nivea","London","Madjarska","0216041235","nivea@hotmail.com",p2.getKorisnickoIme(),0);
				Prodavnica pr5=new Prodavnica("p5","Tehnomanija","Novi Sad","Crna Gora","0216041235","tehnomanija@hotmail.com",p3.getKorisnickoIme(),0);
				Prodavnica pr6=new Prodavnica("p6","Balans","Beograd","Srbija","0216041235","balans@hotmail.com",p3.getKorisnickoIme(),0);
				ArrayList<Prodavnica> prodavnice= new ArrayList<>();
				prodavnice.add(pr1);
				prodavnice.add(pr2);
				prodavnice.add(pr3);
				prodavnice.add(pr4);
				prodavnice.add(pr5);
				prodavnice.add(pr6);
				ctx.setAttribute("prodavnice", prodavnice);
				sacuvajProdavnice();	
				
//				if(ctx.getAttribute("kategorije") == null)
//				{
					KategorijaProizvoda kp1 = new KategorijaProizvoda("Telefon", "Mobilni telefon");
					KategorijaProizvoda kp2 = new KategorijaProizvoda("Namestaj", "Kucni namestaj");
					KategorijaProizvoda kp3 = new KategorijaProizvoda("Kompjuter", "Kucni racunari");
					KategorijaProizvoda kp4 = new KategorijaProizvoda("Kozmetika", "Nega lica");
					ArrayList<KategorijaProizvoda> kategorije= new ArrayList<>();
					kategorije.add(kp1);
					kategorije.add(kp2);
					kategorije.add(kp3);
					kategorije.add(kp4);
					ctx.setAttribute("kategorije", kategorije);
					sacuvajKategorije();
								
						Proizvod pp1 = new Proizvod("pr1", "iPhone 7", "Mat crna", 100, 5 , "Srbija", "Apple", 1000, kp1, "slika", "slika", 0, 100,pr2);
						Proizvod pp2 = new Proizvod("pr2", "Galaxy S7", "Bela", 100, 5 , "Srbija", "Samsung", 700, kp1, "slika", "slika", 0, 100,pr2);
						
						

						Proizvod pp3 = new Proizvod("pr3", "Trosed", "Siva", 500, 50, "Francuska", "Lex furniture", 350, kp2, "slika", "video", 0, 120,pr1);
						pp3.setAkcija(0);
						
						Proizvod pp4 = new Proizvod("pr4", "HP e7100", "Crna", 50, 3, "Italija", "HP", 900, kp3, "slika", "video", 0, 100,pr5);

						Proizvod pp5 = new Proizvod("pr5", "HP e7102", "Crna", 50, 3, "Italija", "HP", 900, kp3, "slika", "video", 0, 100,pr5);
						
						
						
						ArrayList<Proizvod> proizvodi= new ArrayList<>();
						proizvodi.add(pp1);
						proizvodi.add(pp2);
						proizvodi.add(pp3);
						proizvodi.add(pp4);
						proizvodi.add(pp5);
				
						ctx.setAttribute("proizvodi", proizvodi);
						sacuvajProizvod();
//						if(ctx.getAttribute("dostavljaci")==null){
							ArrayList<String> drzave = new ArrayList<>();
							drzave.add("Srbija");
							drzave.add("Hrvatska");
							ArrayList<Integer> trajanjePrenosa=new ArrayList<>();
							trajanjePrenosa.add(3);
							trajanjePrenosa.add(5);
							
							Dostavljac d1= new Dostavljac("d1", "Bex", "Nema", drzave, trajanjePrenosa, new double[]{2.5,5,10}, new double[]{3,6,12} );
							drzave = new ArrayList<>();
							drzave.add("Madjarska");
							drzave.add("Slovenija");
							trajanjePrenosa=new ArrayList<>();
							trajanjePrenosa.add(5);
							trajanjePrenosa.add(5);
							Dostavljac d2= new Dostavljac("d2", "Aks", "Nema",drzave, trajanjePrenosa, new double[]{3,7,12}, new double[]{4,7,12});
							drzave = new ArrayList<>();
							drzave.add("Svet");
							trajanjePrenosa=new ArrayList<>();
							trajanjePrenosa.add(28);
							Dostavljac d3= new Dostavljac("d3", "DHL", "Nema", drzave,trajanjePrenosa , new double[]{5,10,20}, new double[]{6,9,17});
							ArrayList<Dostavljac> dostavljaci= new ArrayList<>();
							dostavljaci.add(d1);
							dostavljaci.add(d2);
							dostavljaci.add(d3);
							ctx.setAttribute("dostavljaci", dostavljaci);
							sacuvajDostavljace();
							
							
							ArrayList<ListaZelja> listaZelja=new ArrayList<>();
							ctx.setAttribute("listaZelja", listaZelja);
							sacuvajListuZelja();
							
							ArrayList<IstorijaKupovine> istorijat =new ArrayList<>();
							ctx.setAttribute("istorijat", istorijat);
							sacuvajIstorjat();
							
							ArrayList<Zalba> zalbeKupaca = new ArrayList<>();
							ctx.setAttribute("zalbe", zalbeKupaca);
							sacuvajZalbe();
							
							
//						}
//					}
//					
//				}
//				
//				
//			}
//		}
	}
	//FAJLOVI ZA ZALBE (.BIN)
			@SuppressWarnings("unchecked")
			public synchronized void sacuvajZalbe() {
				ArrayList<Zalba> zalbeKupaca = (ArrayList<Zalba>) ctx.getAttribute("zalbe");
				if (zalbeKupaca != null) {
					try (OutputStream file = new FileOutputStream("spisakZalbi.bin");
					OutputStream buffer = new BufferedOutputStream(file);
					ObjectOutput out = new ObjectOutputStream(buffer);) {
					out.writeObject(zalbeKupaca);
				} catch (Exception e) {
					return;
					}
				}
			}
			@SuppressWarnings("unchecked")
			public synchronized void ucitajZalbe() { 
				ArrayList<Zalba> zalbeKupaca = new ArrayList<Zalba>();

				try (InputStream file = new FileInputStream("spisakZalbi.bin");
						InputStream buffer = new BufferedInputStream(file);
						ObjectInput in = new ObjectInputStream(buffer);) {
					zalbeKupaca = (ArrayList<Zalba>) in.readObject();
				} catch (Exception e) {
					return;
				}
				ctx.setAttribute("zalbe", zalbeKupaca);
			}
	
	//FAJLOVI ZA ISTORIJAT (.BIN)
		@SuppressWarnings("unchecked")
		public synchronized void sacuvajIstorjat() {
			ArrayList<IstorijaKupovine> istorijat = (ArrayList<IstorijaKupovine>) ctx.getAttribute("istorijat");
			if (istorijat != null) {
				try (OutputStream file = new FileOutputStream("spisakIstorijat.bin");
				OutputStream buffer = new BufferedOutputStream(file);
				ObjectOutput out = new ObjectOutputStream(buffer);) {
				out.writeObject(istorijat);
			} catch (Exception e) {
				return;
				}
			}
		}
		@SuppressWarnings("unchecked")
		public synchronized void ucitajIstorijat() { 
			ArrayList<IstorijaKupovine> istorijat = new ArrayList<IstorijaKupovine>();

			try (InputStream file = new FileInputStream("spisakIstorijat.bin");
					InputStream buffer = new BufferedInputStream(file);
					ObjectInput in = new ObjectInputStream(buffer);) {
				istorijat = (ArrayList<IstorijaKupovine>) in.readObject();
			} catch (Exception e) {
				return;
			}
			ctx.setAttribute("istorijat", istorijat);
		}
	
	
	//FAJLOVI ZA LISTU ZELJA (.BIN)
	@SuppressWarnings("unchecked")
	public synchronized void sacuvajListuZelja() {
		ArrayList<ListaZelja> listaZelja = (ArrayList<ListaZelja>) ctx.getAttribute("listaZelja");
		if (listaZelja != null) {
			try (OutputStream file = new FileOutputStream("spisakListaZelja.bin");
			OutputStream buffer = new BufferedOutputStream(file);
			ObjectOutput out = new ObjectOutputStream(buffer);) {
			out.writeObject(listaZelja);
		} catch (Exception e) {
			return;
			}
		}
	}
	@SuppressWarnings("unchecked")
	public synchronized void ucitajListuZelja() { 
		ArrayList<ListaZelja> listaZelja = new ArrayList<ListaZelja>();

		try (InputStream file = new FileInputStream("spisakListaZelja.bin");
				InputStream buffer = new BufferedInputStream(file);
				ObjectInput in = new ObjectInputStream(buffer);) {
			listaZelja = (ArrayList<ListaZelja>) in.readObject();
		} catch (Exception e) {
			return;
		}
		ctx.setAttribute("listaZelja", listaZelja);
	}
	
	//FAJLOVI ZA DOSTAVLJACE (.BIN)
			@SuppressWarnings("unchecked")
			public synchronized void sacuvajDostavljace() {
				ArrayList<Dostavljac> dostavljaci = (ArrayList<Dostavljac>) ctx.getAttribute("dostavljaci");
				if (dostavljaci != null) {
					try (OutputStream file = new FileOutputStream("spisakDostavljaca.bin");
					OutputStream buffer = new BufferedOutputStream(file);
					ObjectOutput out = new ObjectOutputStream(buffer);) {
					out.writeObject(dostavljaci);
				} catch (Exception e) {
					return;
					}
				}
			}
			@SuppressWarnings("unchecked")
			public synchronized void ucitajDostavljace() { 
				ArrayList<Dostavljac> dostavljaci = new ArrayList<Dostavljac>();

				try (InputStream file = new FileInputStream("spisakDostavljaca.bin");
						InputStream buffer = new BufferedInputStream(file);
						ObjectInput in = new ObjectInputStream(buffer);) {
					dostavljaci = (ArrayList<Dostavljac>) in.readObject();
				} catch (Exception e) {
					return;
				}
				ctx.setAttribute("dostavljaci", dostavljaci);
			}
		
		//FAJLOVI ZA KORISNIKE (.BIN)
		@SuppressWarnings("unchecked")
		public synchronized void sacuvajKorisnike() {
			ArrayList<Korisnik> korisnici = (ArrayList<Korisnik>) ctx.getAttribute("korisnici");
			if (korisnici != null) {
				try (OutputStream file = new FileOutputStream("spisakKorisnika.bin");
				OutputStream buffer = new BufferedOutputStream(file);
				ObjectOutput out = new ObjectOutputStream(buffer);) {
				out.writeObject(korisnici);
			} catch (Exception e) {
				return;
				}
			}
		}
		@SuppressWarnings("unchecked")
		public synchronized void ucitajKorisnike() { 
			ArrayList<Korisnik> korisnici = new ArrayList<Korisnik>();

			try (InputStream file = new FileInputStream("spisakKorisnika.bin");
					InputStream buffer = new BufferedInputStream(file);
					ObjectInput in = new ObjectInputStream(buffer);) {
				korisnici = (ArrayList<Korisnik>) in.readObject();
			} catch (Exception e) {
				return;
			}
			ctx.setAttribute("korisnici", korisnici);
		}
		
		//FAJLOVI ZA KATEGORIJE (.BIN)
		@SuppressWarnings("unchecked")
		public synchronized void sacuvajKategorije() {
			ArrayList<KategorijaProizvoda> kategorije = (ArrayList<KategorijaProizvoda>) ctx.getAttribute("kategorije");
			if (kategorije != null) {
				try (OutputStream file = new FileOutputStream("spisakKategorija.bin");
				OutputStream buffer = new BufferedOutputStream(file);
				ObjectOutput out = new ObjectOutputStream(buffer);) {
				out.writeObject(kategorije);
			} catch (Exception e) {
				return;
				}
			}
		}
		@SuppressWarnings("unchecked")
		public synchronized void ucitajKategorije() { 
			ArrayList<KategorijaProizvoda> kategorije = new ArrayList<>();
			try (InputStream file = new FileInputStream("spisakKategorija.bin");
					InputStream buffer = new BufferedInputStream(file);
					ObjectInput in = new ObjectInputStream(buffer);) {
				kategorije = (ArrayList<KategorijaProizvoda>) in.readObject();
			} catch (Exception e) {
				return;
			}
			ctx.setAttribute("kategorije", kategorije);
		}
		
		//FAJLOVI ZA PRODAVNICE (.BIN)
				@SuppressWarnings("unchecked")
				public synchronized void sacuvajProdavnice() {
					ArrayList<Prodavnica> prodavnice = (ArrayList<Prodavnica>) ctx.getAttribute("prodavnice");
					if (prodavnice != null) {
						try (OutputStream file = new FileOutputStream("spisakProdavnica.bin");
						OutputStream buffer = new BufferedOutputStream(file);
						ObjectOutput out = new ObjectOutputStream(buffer);) {
						out.writeObject(prodavnice);
					} catch (Exception e) {
						return;
						}
					}
				}
				@SuppressWarnings("unchecked")
				public synchronized void ucitajProdavnice() { 
					ArrayList<Prodavnica> prodavnice = new ArrayList<>();
					try (InputStream file = new FileInputStream("spisakProdavnica.bin");
							InputStream buffer = new BufferedInputStream(file);
							ObjectInput in = new ObjectInputStream(buffer);) {
						prodavnice = (ArrayList<Prodavnica>) in.readObject();
					} catch (Exception e) {
						return;
					}
					ctx.setAttribute("prodavnice", prodavnice);
				}
		
				//FAJLOVI ZA PROIZVOD (.BIN)
				@SuppressWarnings("unchecked")
				public synchronized void sacuvajProizvod() {
					ArrayList<Proizvod> proizvodi = (ArrayList<Proizvod>) ctx.getAttribute("proizvodi");
					if (proizvodi != null) {
						try (OutputStream file = new FileOutputStream("spisakProizvoda.bin");
						OutputStream buffer = new BufferedOutputStream(file);
						ObjectOutput out = new ObjectOutputStream(buffer);) {
						out.writeObject(proizvodi);
					} catch (Exception e) {
						return;
						}
					}
				}
				@SuppressWarnings("unchecked")
				public synchronized void ucitajProizvod() { 
					ArrayList<Proizvod> proizvodi = new ArrayList<>();
					try (InputStream file = new FileInputStream("spisakProizvoda.bin");
							InputStream buffer = new BufferedInputStream(file);
							ObjectInput in = new ObjectInputStream(buffer);) {
						proizvodi = (ArrayList<Proizvod>) in.readObject();
					} catch (Exception e) {
						return;
					}
					ctx.setAttribute("proizvodi", proizvodi);
				}
		
		
		
		
		
		
		
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/registracija")
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public synchronized boolean proveraRegistracije(Korisnik k1){
			
		
			
			if(ctx.getAttribute("korisnici") == null)
			{
				ucitajKorisnike();
				init();
				
			}
			
			
			ArrayList<Korisnik> korisnici = (ArrayList<Korisnik>)ctx.getAttribute("korisnici");
			
			
			for (Korisnik k : korisnici) {
				if(k.getKorisnickoIme().equals(k1.getKorisnickoIme()) )
				{				
					return false;
				}
			}
			if(k1.getUloga()==null)
				k1.setUloga(Korisnik.KUPAC);
			korisnici.add(k1);
			ctx.setAttribute("korisnici", korisnici);
			sacuvajKorisnike();
			
			for (Korisnik k : korisnici) {
				System.out.println(k.getKorisnickoIme());
			}
			
			
			return true;
		}
		

		@SuppressWarnings("unchecked")
		@POST
		@Path("/login")
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public synchronized Korisnik proveraLogin(Korisnik k1){
			System.out.println("login");
			if(ctx.getAttribute("korisnici") == null)
			{
				ucitajKorisnike();
				init();
			}
			
			ArrayList<Korisnik> korisnici = (ArrayList<Korisnik>)ctx.getAttribute("korisnici");
			
			for (Korisnik k : korisnici) {
				if(k.getKorisnickoIme().equals(k1.getKorisnickoIme()) 
						&& k.getLozinka().equals(k1.getLozinka()))
				{
					request.getSession().setAttribute("korisnik", k);
					System.out.println(k.getUloga() + " se ulogovao.");
					return k;
				}
			}
			
			
			return null;
		}
		
		@POST
		@Path("/logout")
		public synchronized void izlogujKorisnika()
		{
			otkazivanjeKupovine();
			request.getSession().removeAttribute("korisnik");
			request.getSession().invalidate();
		}
		
		@POST
		@Path("/proveraLogovanja")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized Korisnik provera()
		{
//			init();
			return (Korisnik)request.getSession().getAttribute("korisnik");
		}
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/preuzmiProdavniceProdavac")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized ArrayList<Prodavnica> posaljiProdavnice() {
			if (ctx.getAttribute("prodavnice") == null)
				ucitajProdavnice();
			ArrayList<Prodavnica> prodavnice = (ArrayList<Prodavnica>) ctx.getAttribute("prodavnice");
			Korisnik k = (Korisnik)request.getSession().getAttribute("korisnik");
			ArrayList<Prodavnica> temp = new ArrayList<>();
			if(k!=null){
				String korisnickoIme=k.getKorisnickoIme();
				
				for (Prodavnica prodavnica : prodavnice) {
					if(prodavnica.getOdgovorniProdavac().equals(korisnickoIme)){
						temp.add(prodavnica);
					}
				}
			}
			if(temp.size()==0){
				return null;
			}
			
			return temp;
			
			
		}
		
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/preuzmiProdavnicuZaIzmenu")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized Prodavnica posaljiProdavnicuZaIzmenu(Prodavnica pp) {
			if (ctx.getAttribute("prodavnice") == null)
				ucitajProdavnice();
			ArrayList<Prodavnica> prodavnice = (ArrayList<Prodavnica>) ctx.getAttribute("prodavnice");
			
			for (Prodavnica prodavnica : prodavnice) {
				if(pp.getSifra().equals(prodavnica.getSifra())){
					return prodavnica;
				}
			}
			
			return null;
			
			
		}
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/sacuvajIzmeneProdavnice")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized void posaljiSacuvanuIzmenu(Prodavnica pp) {
			if (ctx.getAttribute("prodavnice") == null)
				ucitajProdavnice();
			ArrayList<Prodavnica> prodavnice = (ArrayList<Prodavnica>) ctx.getAttribute("prodavnice");
			System.out.println(pp.getOdgovorniProdavac());
			for (Prodavnica prodavnica : prodavnice) {
				if(pp.getSifra().equals(prodavnica.getSifra())){
					prodavnica.setNaziv(pp.getNaziv());
					prodavnica.setAdresa(pp.getAdresa());
					prodavnica.setDrzava(pp.getDrzava());
					prodavnica.setTelefon(pp.getTelefon());
					prodavnica.setEmail(pp.getEmail());
					if(pp.getOdgovorniProdavac()!=null)
						prodavnica.setOdgovorniProdavac(pp.getOdgovorniProdavac());
					break;
				}
			}
			ctx.setAttribute("prodavnice", prodavnice);
			sacuvajProdavnice();
			
		}
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/preuzmiProdavnice")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized ArrayList<Prodavnica> posaljiSveProdavnice() {
			if (ctx.getAttribute("prodavnice") == null)
				ucitajProdavnice();
			init();
		
			if(((ArrayList<Prodavnica>) ctx.getAttribute("prodavnice")).size() == 0)
				return null;
			else
				return (ArrayList<Prodavnica>) ctx.getAttribute("prodavnice");
				
		}
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/preuzmiProizvode")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized ArrayList<Proizvod> posaljiProizvode() {
			if (ctx.getAttribute("proizvodi") == null)
				ucitajProizvod();
			init();
			
			ArrayList<Proizvod> listaPro = (ArrayList<Proizvod>) ctx.getAttribute("proizvodi");
		
			for (Proizvod proizvod : listaPro) {
				if(proizvod.getAkcija()!=0){
					//System.out.println(proizvod.getDatumAkcije());
					String date = new SimpleDateFormat("dd.MM.yyyy").format(new Date());
					//System.out.println(date);
					
					String[] temp = proizvod.getDatumAkcije().split("&");
					String[] temp2=temp[1].split("\\.");
					int mojDan=Integer.parseInt(temp2[0]);
					int mojMojMesec=Integer.parseInt(temp2[1]);
					int mojMojaGodina=Integer.parseInt(temp2[2]);
					
					
					String[] tempp2=date.split("\\.");
					int danasDan=Integer.parseInt(tempp2[0]);
					int danasMojMesec=Integer.parseInt(tempp2[1]);
					int danasMojaGodina=Integer.parseInt(tempp2[2]);
					
					if(mojMojaGodina<danasMojaGodina){
						
						proizvod.setAkcija(0);
					}else if(mojMojMesec<danasMojMesec){
					
						proizvod.setAkcija(0);	
					}else if(mojDan<danasDan){
						
						proizvod.setAkcija(0);
					}
					
					
					
				}
				java.util.Collections.sort(proizvod.getRecenzije(), new Comparator<Recenzija>(){

					@Override
					public int compare(Recenzija o1, Recenzija o2) {
						// TODO Auto-generated method stub
						
						return ((Double)o2.getOcena()).compareTo((Double)o1.getOcena());
					}
				
				});
				
			}
			ctx.setAttribute("proizvodi", listaPro);
			sacuvajProizvod();
			if(listaPro.size()==0)
				return null;
			else
				return listaPro;
				
		}
		@SuppressWarnings("unchecked")
		@POST
		@Path("/preuzmiProizvodZaIzmenu")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized Proizvod posaljiProizvodZaIzmenu(Proizvod pp) {
			if (ctx.getAttribute("proizvodi") == null)
				ucitajProizvod();
			ArrayList<Proizvod> proizvodi = (ArrayList<Proizvod>) ctx.getAttribute("proizvodi");
			Proizvod temp = new Proizvod();
			
			for (Proizvod proizvod : proizvodi) {
				if(proizvod.getSifra().equals(pp.getSifra())){
					temp=proizvod;
					break;
				}
			}
			
			return temp;
		}
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/obrisiProizvod")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized void posaljiObrisanProizvod(Proizvod pp) {
			if (ctx.getAttribute("proizvodi") == null)
				ucitajProizvod();
			ArrayList<Proizvod> proizvodi = (ArrayList<Proizvod>) ctx.getAttribute("proizvodi");
			
			if(ctx.getAttribute("listaZelja") == null)
				ucitajListuZelja();
			ArrayList<ListaZelja> listaZelja = (ArrayList<ListaZelja>) ctx.getAttribute("listaZelja");
			
			for (ListaZelja listaZelja2 : listaZelja) {
				for (String s : listaZelja2.getListaProizvoda()) {
					if(s.equals(pp.getSifra())){
						listaZelja2.getListaProizvoda().remove(s);
						break;
					}
				}
			}
			ctx.setAttribute("listaZelja", listaZelja);
			sacuvajListuZelja();
			
			for (Proizvod proizvod : proizvodi) {
				if(proizvod.getSifra().equals(pp.getSifra())){
					proizvodi.remove(proizvod);
					break;
				}
			}
			
			ctx.setAttribute("proizvodi", proizvodi);
			sacuvajProizvod();
			
		}
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/obrisiProdavnicu")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized void posaljiObrisanuProdavnicu(Prodavnica pp) {
			if (ctx.getAttribute("proizvodi") == null)
				ucitajProizvod();
			ArrayList<Proizvod> proizvodi = (ArrayList<Proizvod>) ctx.getAttribute("proizvodi");
			
			if(ctx.getAttribute("listaZelja") == null)
				ucitajListuZelja();
			ArrayList<ListaZelja> listaZelja = (ArrayList<ListaZelja>) ctx.getAttribute("listaZelja");
			
			if (ctx.getAttribute("prodavnice") == null)
				ucitajProdavnice();
			ArrayList<Prodavnica> prodavnice = (ArrayList<Prodavnica>) ctx.getAttribute("prodavnice");
			
			Prodavnica mojaProdavnica = new Prodavnica();
			for (Prodavnica prodavnica : prodavnice) {
				if(prodavnica.getSifra().equals(pp.getSifra())){
					mojaProdavnica = prodavnica;
					prodavnice.remove(prodavnica);
					break;
				}
			}
			ctx.setAttribute("prodavnice", prodavnice);
			sacuvajProdavnice();
			
			
			ArrayList<String> pomListProizvoda = new ArrayList<>();
			
			for (Proizvod proizvod : proizvodi) {
				if(proizvod.getProdavnica().getSifra().equals(pp.getSifra())){
					pomListProizvoda.add(proizvod.getSifra());
					proizvodi.remove(proizvod);
					break;
				}
			}
			ctx.setAttribute("proizvodi", proizvodi);
			sacuvajProizvod();
			
			for (String proZaBrisanje : pomListProizvoda) {
				for (ListaZelja listaZelja2 : listaZelja) {
					for (String s : listaZelja2.getListaProizvoda()) {
						if(s.equals(proZaBrisanje)){
							listaZelja2.getListaProizvoda().remove(s);
							break;
						}
					}
				}
			}
			
			ctx.setAttribute("listaZelja", listaZelja);
			sacuvajListuZelja();
			
			
			
		}
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/obrisiKategoriju")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized void posaljiObrisanuKategorija(KategorijaProizvoda pp) {
			if (ctx.getAttribute("proizvodi") == null)
				ucitajProizvod();
			ArrayList<Proizvod> proizvodi = (ArrayList<Proizvod>) ctx.getAttribute("proizvodi");
			
			if(ctx.getAttribute("listaZelja") == null)
				ucitajListuZelja();
			ArrayList<ListaZelja> listaZelja = (ArrayList<ListaZelja>) ctx.getAttribute("listaZelja");
			
			
			
			
			
			ArrayList<String> pomListProizvoda = new ArrayList<>();
			
			for (Proizvod proizvod : proizvodi) {
				if(proizvod.getKategorija().getNaziv().equals(pp.getNaziv())){
					pomListProizvoda.add(proizvod.getSifra());
					proizvodi.remove(proizvod);
					break;
				}
			}
			ctx.setAttribute("proizvodi", proizvodi);
			sacuvajProizvod();
			
			for (String proZaBrisanje : pomListProizvoda) {
				for (ListaZelja listaZelja2 : listaZelja) {
					for (String s : listaZelja2.getListaProizvoda()) {
						if(s.equals(proZaBrisanje)){
							listaZelja2.getListaProizvoda().remove(s);
							break;
						}
					}
				}
			}
			
			ctx.setAttribute("listaZelja", listaZelja);
			sacuvajListuZelja();
			
			if(ctx.getAttribute("kategorije") == null)
				ucitajKategorije();
			ArrayList<KategorijaProizvoda> kategorije = (ArrayList<KategorijaProizvoda>) ctx.getAttribute("kategorije");
			
			for (KategorijaProizvoda k : kategorije) {
				if(k.getNaziv().equals(pp.getNaziv())){
					kategorije.remove(k);
					break;
				}	
			}
			ctx.setAttribute("kategorije", kategorije);
			sacuvajKategorije();
			
			
		}
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/dodajNoviProizvod")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized boolean posaljiDodatProizvod(Proizvod pp) {
			if (ctx.getAttribute("proizvodi") == null)
				ucitajProizvod();
			ArrayList<Proizvod> proizvodi = (ArrayList<Proizvod>) ctx.getAttribute("proizvodi");
			
			
			for (Proizvod proizvod : proizvodi) {
				if(proizvod.getSifra().equals(pp.getSifra())){
					return false;
				}
			}
			String proba= pp.getDatumAkcije();
			String kljucevi[] = proba.split("_");
			String nazivKategorije=kljucevi[0];
			if(ctx.getAttribute("kategorije")==null)
				ucitajKategorije();
			
			ArrayList<KategorijaProizvoda> kategorije = (ArrayList<KategorijaProizvoda>) ctx.getAttribute("kategorije");
			KategorijaProizvoda temp = new KategorijaProizvoda();
			for (KategorijaProizvoda kategorijaProizvoda : kategorije) {
				if(nazivKategorije.equals(kategorijaProizvoda.getNaziv()))
				{
					
					temp = kategorijaProizvoda;
					break;
				}
			}
			
			String nazivProdavnice= kljucevi[1];
			if(ctx.getAttribute("prodavnice")==null)
				ucitajProdavnice();
			
			ArrayList<Prodavnica> prodavnice = (ArrayList<Prodavnica>) ctx.getAttribute("prodavnice");
			Prodavnica temp1 = new Prodavnica();
			for (Prodavnica prodavnica : prodavnice) {
				if(prodavnica.getSifra().equals(nazivProdavnice)){
					
					temp1 = prodavnica;
					break;
				}
			}
			
			
			Proizvod novi = new Proizvod(pp.getSifra(), pp.getNaziv(), pp.getBoja(), pp.getDimenzije(), pp.getTezina(), pp.getZemljaProizvodnje(), pp.getNazivProizvodjaca(), pp.getJedinicnaCena(), temp, pp.getSlika(), pp.getVideo(), 0, pp.getKolicinaUMagacinu(), temp1);
			proizvodi.add(novi);
			ctx.setAttribute("proizvodi", proizvodi);
			sacuvajProizvod();
			
			return true;
		}
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/dodajNovuProdavnice")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized boolean posaljiDodatuProdavnicu(Prodavnica pp) {
			if (ctx.getAttribute("prodavnice") == null)
				ucitajProdavnice();
			ArrayList<Prodavnica> prodavnice = (ArrayList<Prodavnica>) ctx.getAttribute("prodavnice");
			
			for (Prodavnica prodavnica : prodavnice) {
				if(prodavnica.getSifra().equals(pp.getSifra()) || prodavnica.getNaziv().equals(pp.getNaziv())){
					return false;
				}
			}
			
			Prodavnica nova = new Prodavnica(pp.getSifra(), pp.getNaziv(), pp.getAdresa(), pp.getDrzava(), pp.getTelefon(), pp.getEmail(), pp.getOdgovorniProdavac(), 0);
			prodavnice.add(nova);
			ctx.setAttribute("prodavnice", prodavnice);
			sacuvajProdavnice();
			
			
			return true;
		}
		
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/dodajNovoDostavljaca")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized boolean posaljiDodatogDostavljaca(Proizvod pp) {
			if (ctx.getAttribute("dostavljaci") == null)
				ucitajDostavljace();
			ArrayList<Dostavljac> dostavljaci = (ArrayList<Dostavljac>) ctx.getAttribute("dostavljaci");
			
			for (Dostavljac dostavljac : dostavljaci) {
				if(dostavljac.getSifra().equals(pp.getSifra())){
					return false;
				}
			}
			
			String[] c = pp.getSlika().split(",");
			double cenaDim1 = Double.parseDouble(c[0]);
			double cenaDim2 = Double.parseDouble(c[1]);
			double cenaDim3 = Double.parseDouble(c[2]);
			double[] tarifeDimCena = new double [] {cenaDim1,cenaDim2,cenaDim3};
			
			String[] c2 = pp.getVideo().split(",");
			double cenaKg1 = Double.parseDouble(c2[0]);
			double cenaKg2 = Double.parseDouble(c2[1]);
			double cenaKg3 = Double.parseDouble(c2[2]);
			double[] tarifeKgCena = new double [] {cenaKg1,cenaKg2,cenaKg3};
			
			ArrayList<String> drzavePos = new ArrayList<>();
			ArrayList<Integer> trajanjeDos = new ArrayList<>();
			
			String[] temp = pp.getDatumAkcije().split("&");
			for (String string : temp) {
				String[] pom1 = string.split(",");
				drzavePos.add(pom1[0]);
				trajanjeDos.add(Integer.parseInt(pom1[1]));
			}
			
			
			Dostavljac novi = new Dostavljac(pp.getSifra(), pp.getNaziv(), pp.getBoja(), drzavePos, trajanjeDos, tarifeKgCena, tarifeDimCena);
			dostavljaci.add(novi);
			
			ctx.setAttribute("dostavljaci", dostavljaci);
			sacuvajDostavljace();
			
			
			return true;
		}
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/izmeniDostavljaca")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized boolean posaljiIzmenjenogDostavljaca(Proizvod pp) {
			if (ctx.getAttribute("dostavljaci") == null)
				ucitajDostavljace();
			ArrayList<Dostavljac> dostavljaci = (ArrayList<Dostavljac>) ctx.getAttribute("dostavljaci");
			
			for (Dostavljac dostavljac : dostavljaci) {
				if(dostavljac.getSifra().equals(pp.getSifra())){
					String[] c = pp.getSlika().split(",");
					double cenaDim1 = Double.parseDouble(c[0]);
					double cenaDim2 = Double.parseDouble(c[1]);
					double cenaDim3 = Double.parseDouble(c[2]);
					double[] tarifeDimCena = new double [] {cenaDim1,cenaDim2,cenaDim3};
					
					String[] c2 = pp.getVideo().split(",");
					double cenaKg1 = Double.parseDouble(c2[0]);
					double cenaKg2 = Double.parseDouble(c2[1]);
					double cenaKg3 = Double.parseDouble(c2[2]);
					double[] tarifeKgCena = new double [] {cenaKg1,cenaKg2,cenaKg3};
					
					ArrayList<String> drzavePos = new ArrayList<>();
					ArrayList<Integer> trajanjeDos = new ArrayList<>();
					
					String[] temp = pp.getDatumAkcije().split("&");
					for (String string : temp) {
						String[] pom1 = string.split(",");
						drzavePos.add(pom1[0]);
						trajanjeDos.add(Integer.parseInt(pom1[1]));
					}
					
					dostavljac.setSifra(pp.getSifra());
					dostavljac.setNaziv(pp.getNaziv());
					dostavljac.setOpis(pp.getBoja());
					dostavljac.setDrzavePoslovanja(drzavePos);
					dostavljac.setTrajanjeDostave(trajanjeDos);
					dostavljac.setTarifaDim(tarifeDimCena);
					dostavljac.setTarifaKg(tarifeKgCena);
					
					
					ctx.setAttribute("dostavljaci", dostavljaci);
					sacuvajDostavljace();
					break;
				}
			}
			
			
			
			
			return true;
		}
		
		
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/obrisiDostavljaca")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized boolean posaljiObrisanogDostavljaca(Proizvod pp) {
			if (ctx.getAttribute("dostavljaci") == null)
				ucitajDostavljace();
			ArrayList<Dostavljac> dostavljaci = (ArrayList<Dostavljac>) ctx.getAttribute("dostavljaci");
			
			for (Dostavljac dostavljac : dostavljaci) {
				if(dostavljac.getSifra().equals(pp.getSifra())){
					dostavljaci.remove(dostavljac);
					
					break;
				}
			}
			
			ctx.setAttribute("dostavljaci", dostavljaci);
			sacuvajDostavljace();
			
			
			return true;
		}
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/dodajNovuKategoriju")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized boolean posaljiDodatuKategoriju(Dostavljac pp) {
			if (ctx.getAttribute("kategorije") == null)
				ucitajKategorije();
			ArrayList<KategorijaProizvoda> kategorije = (ArrayList<KategorijaProizvoda>) ctx.getAttribute("kategorije");
			
			
			for (KategorijaProizvoda kat : kategorije) {
				if(kat.getNaziv().equals(pp.getNaziv())){
					return false;
				}
			}
			KategorijaProizvoda temp=null;
			for (KategorijaProizvoda kat : kategorije) {
				if(kat.getNaziv().equals(pp.getSifra())){
					temp = kat;
					break;
				}
			}
			
			
			KategorijaProizvoda nova = new KategorijaProizvoda(pp.getNaziv(), pp.getNaziv());
			if(temp!=null){
				nova.setPodKategorija(temp);
			}
			kategorije.add(nova);
			ctx.setAttribute("kategorije", kategorije);
			sacuvajKategorije();
			
			
			return true;
		}
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/izmeniKategoriju")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized void posaljiIzmenjenuKategoriju(Dostavljac pp) {
			if (ctx.getAttribute("kategorije") == null)
				ucitajKategorije();
			ArrayList<KategorijaProizvoda> kategorije = (ArrayList<KategorijaProizvoda>) ctx.getAttribute("kategorije");
			
			KategorijaProizvoda temp=null;
			for (KategorijaProizvoda kat : kategorije) {
				if(kat.getNaziv().equals(pp.getSifra())){
					temp = kat;
					break;
				}
			}
			
			for (KategorijaProizvoda kat : kategorije) {
				if(kat.getNaziv().equals(pp.getNaziv())){
					kat.setOpis(pp.getOpis());
					if(temp!=null){
						kat.setPodKategorija(temp);
					}else{
						if(pp.getSifra().equals("Nema")){
							KategorijaProizvoda k = new KategorijaProizvoda();
							kat.setPodKategorija(k);
						}
							
						
					}
					
				}
			}
		
			ctx.setAttribute("kategorije", kategorije);
			sacuvajKategorije();
			
		}
		
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/izmeniProizvod")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized void posaljiIzmenjenProizvod(Proizvod pp) {
			if (ctx.getAttribute("proizvodi") == null)
				ucitajProizvod();
			ArrayList<Proizvod> proizvodi = (ArrayList<Proizvod>) ctx.getAttribute("proizvodi");
			
			
			for (Proizvod proizvod : proizvodi) {
				if(proizvod.getSifra().equals(pp.getSifra())){
					String proba= pp.getDatumAkcije();
					String kljucevi[] = proba.split("_");
					String nazivKategorije=kljucevi[0];
					if(ctx.getAttribute("kategorije")==null)
						ucitajKategorije();
					
					ArrayList<KategorijaProizvoda> kategorije = (ArrayList<KategorijaProizvoda>) ctx.getAttribute("kategorije");
					KategorijaProizvoda temp = new KategorijaProizvoda();
					for (KategorijaProizvoda kategorijaProizvoda : kategorije) {
						if(nazivKategorije.equals(kategorijaProizvoda.getNaziv()))
						{
							
							temp = kategorijaProizvoda;
							break;
						}
					}
					
					String nazivProdavnice= kljucevi[1];
					if(ctx.getAttribute("prodavnice")==null)
						ucitajProdavnice();
					
					ArrayList<Prodavnica> prodavnice = (ArrayList<Prodavnica>) ctx.getAttribute("prodavnice");
					Prodavnica temp1 = new Prodavnica();
					for (Prodavnica prodavnica : prodavnice) {
						if(prodavnica.getSifra().equals(nazivProdavnice)){
							
							temp1 = prodavnica;
							break;
						}
					}
					
					
//					Proizvod novi = new Proizvod(pp.getSifra(), pp.getNaziv(), pp.getBoja(), pp.getDimenzije(), pp.getTezina(), pp.getZemljaProizvodnje(), pp.getNazivProizvodjaca(), pp.getJedinicnaCena(), temp, pp.getSlika(), pp.getVideo(), 0, pp.getKolicinaUMagacinu(), temp1);
					proizvod.setSifra(pp.getSifra());
					proizvod.setNaziv(pp.getNaziv());
					proizvod.setBoja(pp.getBoja());
					proizvod.setDimenzije(pp.getDimenzije());
					proizvod.setTezina(pp.getTezina());
					proizvod.setZemljaProizvodnje(pp.getZemljaProizvodnje());
					proizvod.setNazivProizvodjaca(pp.getNazivProizvodjaca());
					proizvod.setJedinicnaCena(pp.getJedinicnaCena());
					proizvod.setSlika(pp.getSlika());
					proizvod.setVideo(pp.getVideo());
					proizvod.setKolicinaUMagacinu(pp.getKolicinaUMagacinu());
					proizvod.setProdavnica(temp1);
					proizvod.setKategorija(temp);
					
					ctx.setAttribute("proizvodi", proizvodi);
					sacuvajProizvod();
					break;
				}
			}
			
			
			
		}
		
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/dodajPopustNaProizvod")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized void posaljiIzmenjenPopustProizvoda(Proizvod pp) {
			if (ctx.getAttribute("proizvodi") == null)
				ucitajProizvod();
			ArrayList<Proizvod> proizvodi = (ArrayList<Proizvod>) ctx.getAttribute("proizvodi");
			
			
			for (Proizvod proizvod : proizvodi) {
				if(proizvod.getSifra().equals(pp.getSifra())){
					proizvod.setAkcija(pp.getAkcija());
					proizvod.setDatumAkcije(pp.getDatumAkcije());
					break;
				}
			}
			ctx.setAttribute("proizvodi", proizvodi);
			sacuvajProizvod();
			
		}
		
		
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/dodajKategorijuNaPopust")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized boolean posaljiIzmenjenPopustKategorije(Proizvod pp) {
			if (ctx.getAttribute("proizvodi") == null)
				ucitajProizvod();
			ArrayList<Proizvod> proizvodiSve = (ArrayList<Proizvod>)ctx.getAttribute("proizvodi");
			
			ArrayList<Proizvod> proizvodi = posaljiProizvodeProdavca();
			if(proizvodi==null)
				return false;
			boolean usao = true;
			for (Proizvod proizvod : proizvodi) {
				if(proizvod.getKategorija().getNaziv().equals(pp.getSifra())){
					usao=false;
					proizvod.setAkcija(pp.getAkcija());
					proizvod.setDatumAkcije(pp.getDatumAkcije());
				}
			}
			if(usao==true)
				return false;
			
			for (Proizvod proizvod : proizvodiSve) {
				for (Proizvod proizvod2 : proizvodi) {
					if(proizvod.getSifra().equals(proizvod2.getSifra())){
						proizvod=proizvod2;
					}
				}
			}
			
			ctx.setAttribute("proizvodi", proizvodiSve);
			sacuvajProizvod();
			return true;
		}
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/preuzmiProizvodeProdavca")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized ArrayList<Proizvod> posaljiProizvodeProdavca() {
			if (ctx.getAttribute("proizvodi") == null)
				ucitajProizvod();
			ArrayList<Proizvod> proizvodi=(ArrayList<Proizvod>) ctx.getAttribute("proizvodi");
			ArrayList<Proizvod> temp=new ArrayList<>();
			Korisnik korisnik =(Korisnik)request.getSession().getAttribute("korisnik");
			
			if(korisnik!=null){
				
				String korisnickoIme=korisnik.getKorisnickoIme();

				if(proizvodi.size() == 0){
					return null;
				}
				else{
					
					for (Proizvod p : proizvodi) {
						java.util.Collections.sort(p.getRecenzije(), new Comparator<Recenzija>(){

							@Override
							public int compare(Recenzija o1, Recenzija o2) {
								// TODO Auto-generated method stub
								
								return ((Double)o2.getOcena()).compareTo((Double)o1.getOcena());
							}
						
						});
						if(p.getProdavnica().getOdgovorniProdavac().equals(korisnickoIme))
						{	
							if(p.getAkcija()!=0){
								//System.out.println(p.getDatumAkcije());
								String date = new SimpleDateFormat("dd.MM.yyyy").format(new Date());
								//System.out.println(date);
								
								String[] tempe = p.getDatumAkcije().split("&");
								String[] temp2=tempe[1].split("\\.");
								int mojDan=Integer.parseInt(temp2[0]);
								int mojMojMesec=Integer.parseInt(temp2[1]);
								int mojMojaGodina=Integer.parseInt(temp2[2]);
								
								
								String[] tempp2=date.split("\\.");
								int danasDan=Integer.parseInt(tempp2[0]);
								int danasMojMesec=Integer.parseInt(tempp2[1]);
								int danasMojaGodina=Integer.parseInt(tempp2[2]);
								
								if(mojMojaGodina<danasMojaGodina){
									
									p.setAkcija(0);
								}else if(mojMojMesec<danasMojMesec){
								
									p.setAkcija(0);	
								}else if(mojDan<danasDan){
									
									p.setAkcija(0);
								}
							}
							temp.add(p);
						}
					}
	
				}
			}
			
			if(temp.size()==0)
				return null;
			return temp;
				
				
		}
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/preuzmiProizvodeRacun")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized ArrayList<ProizvodKorpa> posaljiProizvodeRacun() {
			sacuvajProizvod();
			ArrayList<ProizvodKorpa> temp = (ArrayList<ProizvodKorpa>)request.getSession().getAttribute("proizvodiKorpe");
			Korisnik korisnik =(Korisnik)request.getSession().getAttribute("korisnik");
			String korisnickoIme=korisnik.getKorisnickoIme();

			ArrayList<IstorijaKupovine> istorijaKupovine = (ArrayList<IstorijaKupovine>)ctx.getAttribute("istorijat");
			if(istorijaKupovine==null)
				istorijaKupovine=new ArrayList<>();
			double ukupnaCena = getTotalCena();
			
			//ukoliko postji korisnik u istoriji kupovine
			for (IstorijaKupovine istorija : istorijaKupovine) {
				if(istorija.getKorisnik().equals(korisnickoIme)){
					
					
					
					Kupovina k = new Kupovina(istorija.getSifra()+1, korisnik, new Prodavnica(), temp, new Dostavljac(),0, ukupnaCena);
					istorija.getListaKupovina().add(k);
					istorija.setSifra(istorija.getSifra()+1);
					ctx.setAttribute("istorijat", istorijaKupovine);
					sacuvajIstorjat();
					request.getSession().removeAttribute("proizvodiKorpe");
					return temp;
				}
			}
			
			ArrayList<Kupovina> lista=new ArrayList<>();
			Kupovina k2 = new Kupovina(1, korisnik, new Prodavnica(), temp, new Dostavljac(),0, ukupnaCena);
			lista.add(k2);
			
			IstorijaKupovine moja= new IstorijaKupovine(korisnickoIme, lista);
			moja.setSifra(1);
			istorijaKupovine.add(moja);
			ctx.setAttribute("istorijat", istorijaKupovine);
			sacuvajIstorjat();
			request.getSession().removeAttribute("proizvodiKorpe");
			return temp;

				
		}
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/hocuDaneDostave")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized int posaljiDaneDostave(Proizvod pp) {
			
			ArrayList<ProizvodKorpa> proizvodiKorpe = (ArrayList<ProizvodKorpa>)request.getSession().getAttribute("proizvodiKorpe");
			//request.getSession().removeAttribute("proizvodiKorpe");
			ProizvodKorpa nasProizvod=null;
			for (ProizvodKorpa proizvodKorpa : proizvodiKorpe) {
				if(proizvodKorpa.getProizvod().getSifra().equals(pp.getSifra())){
					nasProizvod=proizvodKorpa;
					break;
				}
			}
			ArrayList<Dostavljac> dostavljaci = (ArrayList<Dostavljac>) ctx.getAttribute("dostavljaci");
			if(ctx.getAttribute("dostavljaci")==null)
				ucitajDostavljace();
			Dostavljac nasDostavljac = null;
			for (Dostavljac dostavljac : dostavljaci) {
				if(dostavljac.getSifra().equals(nasProizvod.getDostavljac().getSifra())){
					nasDostavljac = dostavljac;
					break;
				}
			}
			
			int indexBrojDana=0;
			
			boolean nasao =false;
			for (String drzava : nasDostavljac.getDrzavePoslovanja()) {
				
				if(drzava.equals(nasProizvod.getProizvod().getProdavnica().getDrzava())){
					nasao=true;
					break;
				}
				indexBrojDana++;
			}
			
			if(nasao==false){
				indexBrojDana=0;
				for (String drzava : nasDostavljac.getDrzavePoslovanja()) {
					if(drzava.equals("Svet")){
						break;
					}
					indexBrojDana++;
				}
			}
			
			
			int retVrednostDana = nasDostavljac.getTrajanjeDostave().get(indexBrojDana);
						
			
			return retVrednostDana;
				
		}
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/preuzmiDostavljace")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized ArrayList<Dostavljac> posaljiDostavljace() {
			if (ctx.getAttribute("dostavljaci") == null)
				ucitajDostavljace();
			init();
		
			if(((ArrayList<Dostavljac>) ctx.getAttribute("dostavljaci")).size() == 0)
				return null;
			else
				return (ArrayList<Dostavljac>) ctx.getAttribute("dostavljaci");
				
		}
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/preuzmiProdavce")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized ArrayList<Korisnik> posaljiProdavce() {
			if (ctx.getAttribute("korisnici") == null)
				ucitajKorisnike();
			ArrayList<Korisnik> korisnici=(ArrayList<Korisnik>)ctx.getAttribute("korisnici");
			
			ArrayList<Korisnik> temp = new ArrayList<>();
			
			for (Korisnik k : korisnici) {
				if(k.getUloga().equals(Korisnik.PRODAVAC)){
					temp.add(k);
					
				}
			}
		
			if(temp.size()==0)
				return null;
			return temp;
	
		}
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/preuzmiKorisnike")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized ArrayList<Korisnik> posaljiKorisnike() {
			if (ctx.getAttribute("korisnici") == null)
				ucitajKorisnike();
			ArrayList<Korisnik> korisnici=(ArrayList<Korisnik>)ctx.getAttribute("korisnici");
			
			Korisnik k =(Korisnik)request.getSession().getAttribute("korisnik");
			String korisnickoIme = k.getKorisnickoIme();
			ArrayList<Korisnik> temp = new ArrayList<>();
			for (Korisnik korisnik : korisnici) {
				if(!korisnik.getKorisnickoIme().equals(korisnickoIme)){
					temp.add(korisnik);
				}
			}
			
			
			return temp;
	
		}
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/izmenaNaloga")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized void posaljiIzmenjenogKorisnika(Korisnik kk) {
			if (ctx.getAttribute("korisnici") == null)
				ucitajKorisnike();
			ArrayList<Korisnik> korisnici=(ArrayList<Korisnik>)ctx.getAttribute("korisnici");
			
			Korisnik k =(Korisnik)request.getSession().getAttribute("korisnik");
			String korisnickoIme = k.getKorisnickoIme();
			
			for (Korisnik korisnik : korisnici) {
				if(korisnik.getKorisnickoIme().equals(korisnickoIme)){
					korisnik.setLozinka(kk.getLozinka());
					korisnik.setIme(kk.getIme());
					korisnik.setPrezime(kk.getPrezime());
					korisnik.setAdresa(kk.getAdresa());
					korisnik.setDrzava(kk.getDrzava());
					korisnik.setEmail(kk.getEmail());
					korisnik.setTelefon(kk.getTelefon());
					break;
					
				}
			}
			
			ctx.setAttribute("korisnici",korisnici)	;
			sacuvajKorisnike();
	
		}
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/obrisiKorisnika")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized double  posaljiObrisanogKorisnike(Korisnik kk) {
			if (ctx.getAttribute("korisnici") == null)
				ucitajKorisnike();
			ArrayList<Korisnik> korisnici=(ArrayList<Korisnik>)ctx.getAttribute("korisnici");
			//brisanje korisniki 
			Korisnik mojKorisnik=new Korisnik();
			
			for (Korisnik korisnik : korisnici) {
				if(korisnik.getKorisnickoIme().equals(kk.getKorisnickoIme())){
					korisnici.remove(korisnik);
					mojKorisnik=korisnik;
					break;
				}
			}
			
			double korisnikBroj= 1;
			ctx.setAttribute("korisnici",korisnici);
			sacuvajKorisnike();
			if(mojKorisnik.getUloga().equals(Korisnik.KUPAC)){
				//brisemo njegove liste zelja i istorijat iz mape ako se ponovo registruje sa istim imenom
				if(ctx.getAttribute("listaZelja") == null)
					ucitajListuZelja();
				ArrayList<ListaZelja> listaZelja = (ArrayList<ListaZelja>) ctx.getAttribute("listaZelja");
				
				for (ListaZelja listaZelja2 : listaZelja) {
					if(listaZelja2.getKorisnik().equals(kk.getKorisnickoIme())){
						listaZelja.remove(listaZelja2);
						break;
					}
				}
				ctx.setAttribute("listaZelja", listaZelja);
				sacuvajListuZelja();
				
				if(ctx.getAttribute("istorijat") == null)
					ucitajIstorijat();
				ArrayList<IstorijaKupovine> istorijat = (ArrayList<IstorijaKupovine>) ctx.getAttribute("istorijat");
				
				for (IstorijaKupovine ii : istorijat) {
					if(ii.getKorisnik().equals(kk.getKorisnickoIme())){
						istorijat.remove(ii);
						break;
					}
				}
				ctx.setAttribute("istorijat", istorijat);
				sacuvajIstorjat();
			}else if(mojKorisnik.getUloga().equals(Korisnik.PRODAVAC)){
				//ukoliko je prodavac, brise se prodavnica i svi proizvodi iz te prodavnice
				if(ctx.getAttribute("prodavnice") == null)
					ucitajProdavnice();
				ArrayList<Prodavnica> prodavnice = (ArrayList<Prodavnica>) ctx.getAttribute("prodavnice");
				
				
				
				for (Prodavnica p : prodavnice) {
					if(p.getOdgovorniProdavac().equals(kk.getKorisnickoIme())){
						p.setOdgovorniProdavac("defaultProdavac");
					}
				}
				
				ctx.setAttribute("prodavnice", prodavnice);
				sacuvajProdavnice();
				korisnikBroj=2;
			}
			
			return korisnikBroj;
		}
		
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/preuzmiZalbe")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized ArrayList<Zalba> posaljiZalbe() {
			
			if (ctx.getAttribute("zalbe") == null)
				ucitajZalbe();
			ArrayList<Zalba> zalbe = (ArrayList<Zalba>) ctx.getAttribute("zalbe");
			
			if(zalbe.size()==0)
				return null;
			return zalbe;		
		}
		
		
	
		
		
	
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/preuzmiKategorije")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized ArrayList<KategorijaProizvoda> posaljiKategorije() {
			if (ctx.getAttribute("kategorije") == null)
				ucitajKategorije();
			init();
			ArrayList<KategorijaProizvoda> kategorije = (ArrayList<KategorijaProizvoda>) ctx.getAttribute("kategorije");
			if(kategorije.size() == 0)
				return null;
			else
				return kategorije;
				
		}
		
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/proveriDaLiSviImajuDostavu")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized ProizvodKorpa posaljiProveruDostave() {
			ArrayList<ProizvodKorpa> pkKorpa = (ArrayList<ProizvodKorpa>)request.getSession().getAttribute("proizvodiKorpe");
			for (ProizvodKorpa proizvodKorpa : pkKorpa) {
				if(proizvodKorpa.getCenaDostave() == 0){
					return proizvodKorpa;
				}
			}
			
			return null;
		}
		
		
		
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/kupiProizvod")
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public synchronized ProizvodKorpa ubaciProizvodUKorpu(Proizvod kn)
		{
			
			ArrayList<ProizvodKorpa> pk = (ArrayList<ProizvodKorpa>)request.getSession().getAttribute("proizvodiKorpe");
			ArrayList<Proizvod> proizvodi = (ArrayList<Proizvod>)ctx.getAttribute("proizvodi");
			
			ProizvodKorpa sn = new ProizvodKorpa();
			sn.setProizvod(kn);
			sn.setKolicina(kn.getKolicinaUMagacinu());
			
			boolean postoji = false;
			
			if(pk == null)
			{
				pk = new ArrayList<ProizvodKorpa>();
				
			}
			
			
			
			if(pk.size()!=0)
				for (ProizvodKorpa n : pk) {
					if(kn.getSifra().equals(n.getProizvod().getSifra()))
					{
						double kol = n.getProizvod().getKolicinaUMagacinu();
						if(kol < sn.getKolicina())	//ako ima manje na lageru od onog sto se trazi
							return null;
						
						kol -= sn.getKolicina();
						n.getProizvod().setKolicinaUMagacinu(kol);
						sn.setProizvod(n.getProizvod());
						
						double cnt = n.getKolicina();
						n.setKolicina(cnt + sn.getKolicina());
						postoji=true;
						break;
					}
				}
			
			if(postoji==false){
				for (Proizvod n : proizvodi) {
					if(n.getSifra().equals(kn.getSifra())){
						
						double kol = n.getKolicinaUMagacinu();
						if(kol < kn.getKolicinaUMagacinu())	//ako ima manje na lageru od onog sto se trazi
							return null;
						
						kol -= kn.getKolicinaUMagacinu();
						n.setKolicinaUMagacinu(kol);
						
						sn.setProizvod(n);
						
						pk.add(sn);
						break;
					}
				}
			}
			
			
			
			ctx.setAttribute("proizvodi", proizvodi);
			//sacuvajProizvod();
			request.getSession().setAttribute("proizvodiKorpe", pk);
			return sn;
		}
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/dodajListuZelja")
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public synchronized boolean posaljiListuZelja(Proizvod pp)
		{
			Korisnik korisnik =(Korisnik)request.getSession().getAttribute("korisnik");
			String korisnickoIme=korisnik.getKorisnickoIme();
			ArrayList<ListaZelja> listaZelja = (ArrayList<ListaZelja>)ctx.getAttribute("listaZelja");
			if(listaZelja==null)
				listaZelja=new ArrayList<>();
			//ukoliko postji korisnik u listi zelja
			for (ListaZelja listaZelja2 : listaZelja) {
				if(listaZelja2.getKorisnik().equals(korisnickoIme)){
					for (String listaPro : listaZelja2.getListaProizvoda()) {
						if(listaPro.equals(pp.getSifra())){
							return false;
						}
					}
					listaZelja2.getListaProizvoda().add(pp.getSifra());
					ctx.setAttribute("listaZelja", listaZelja);
					sacuvajListuZelja();
					return true;
				}
			}
			
			ArrayList<String> noviPro= new ArrayList<>();
			noviPro.add(pp.getSifra());
			ListaZelja novaZelja = new ListaZelja(korisnickoIme, noviPro);
			listaZelja.add(novaZelja);
			ctx.setAttribute("listaZelja", listaZelja);
			sacuvajListuZelja();
			return true;
			
			
			
		}
		
		
		
		@SuppressWarnings("unchecked")
		public synchronized void otkazivanjeKupovine()
		{
			ArrayList<ProizvodKorpa> pkKorpa = (ArrayList<ProizvodKorpa>)request.getSession().getAttribute("proizvodiKorpe");
			ArrayList<Proizvod> proizvodi = (ArrayList<Proizvod>) ctx.getAttribute("proizvodi");
			
			if(pkKorpa != null && proizvodi != null)
			{
				
				for (Proizvod pk : proizvodi ) {
					for (ProizvodKorpa pro : pkKorpa) {
						
						if(pk.getSifra().equals(pro.getProizvod().getSifra()))
						{
							
							pk.setKolicinaUMagacinu(pk.getKolicinaUMagacinu()+pro.getKolicina());
						}
					}
				}
			}
			
			//request.getSession().removeAttribute("duKorpa");
			request.getSession().removeAttribute("proizvodiKorpe");		
			ctx.setAttribute("proizvodi", proizvodi);
			
			sacuvajProizvod();
		}
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/preuzmiKorpu")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized ArrayList<ProizvodKorpa> posaljiProizvodIzKorpe()
		{		
			ArrayList<ProizvodKorpa> pkKorpa = (ArrayList<ProizvodKorpa>)request.getSession().getAttribute("proizvodiKorpe");		
			
		
			if(pkKorpa == null || pkKorpa.size() == 0)
				return null;
			else
				return pkKorpa;
		}
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/preuzmiIstorijuKupovine")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized ArrayList<IstorijaKupovine> posaljiIstorijuKupovine()
		{		
			ArrayList<IstorijaKupovine> istorijaKupovine = (ArrayList<IstorijaKupovine>)ctx.getAttribute("istorijat");		
			
		
			if(istorijaKupovine == null || istorijaKupovine.size() == 0)
				return null;
			else
				return istorijaKupovine;
		}
		
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/dostavljaciZaProivod")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized ArrayList<Dostavljac> posaljiDostavljaceProizvoda(Proizvod pp)
		{		
			
			if(ctx.getAttribute("proizvodi")==null)
				ucitajProizvod();
			ArrayList<Proizvod> proizvodi = (ArrayList<Proizvod>) ctx.getAttribute("proizvodi");
			if(ctx.getAttribute("prodavnice")==null)
				ucitajProdavnice();
			ArrayList<Prodavnica> prodavnice = (ArrayList<Prodavnica>) ctx.getAttribute("prodavnice");
			if(ctx.getAttribute("dostavljaci")==null)
				ucitajDostavljace();
			ArrayList<Dostavljac> dostavljaci = (ArrayList<Dostavljac>) ctx.getAttribute("dostavljaci");
			
			String drzavaProdavnice = pp.getProdavnica().getDrzava();
			ArrayList<Dostavljac> temp = new ArrayList<>();
			for (Dostavljac dostavljac : dostavljaci) {
				for (String drzavaPoslovanja : dostavljac.getDrzavePoslovanja()) {
					
					if(drzavaPoslovanja.equals(drzavaProdavnice) || drzavaPoslovanja.equals("Svet")){
						temp.add(dostavljac);
						break;
					}
				}
			}
			if(temp.size()==0)
				return null;
			
			return temp;
		}
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/preuzmiListuZelja")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized ArrayList<Proizvod> posaljiListuZeljaProizvoda()
		{		
			if (ctx.getAttribute("listaZelja") == null)
				ucitajListuZelja();
			if (ctx.getAttribute("proizvodi") == null)
				ucitajProizvod();
			ArrayList<Proizvod> temp=null;
			
			Korisnik korisnik =(Korisnik)request.getSession().getAttribute("korisnik");
			if(korisnik !=null){
				String korisnickoIme =korisnik.getKorisnickoIme();
				ArrayList<Proizvod> proizvodi = (ArrayList<Proizvod>)ctx.getAttribute("proizvodi");
				if(ctx.getAttribute("proizvodi")==null)
					ucitajProizvod();
				ArrayList<ListaZelja> listaZelja = (ArrayList<ListaZelja>)ctx.getAttribute("listaZelja");
				if(ctx.getAttribute("listaZelja")==null)
					ucitajListuZelja();
				
				for (ListaZelja listaZelja2 : listaZelja) {
					if(listaZelja2.getKorisnik().equals(korisnickoIme)){
						temp=new ArrayList<>();
						for (String pro : listaZelja2.getListaProizvoda() ) {
							for (Proizvod proizvod : proizvodi) {
								if(pro.equals(proizvod.getSifra())){
									temp.add(proizvod);
									break;
								}
							}
						}
						
						
					}
				}
			}
			if(temp!=null)
				if(temp.size()==0)
					return null;
			return temp;

		}
		
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/preuzmiListuIstorijeKorisnika")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized ArrayList<Kupovina> preuzmiListuIstorijeKorisnika()
		{		
			
			
			if (ctx.getAttribute("istorijat") == null)
				ucitajIstorijat();
//			if (ctx.getAttribute("proizvodi") == null)
//				ucitajProizvod();
			ArrayList<Kupovina> temp=null;
			
			Korisnik korisnik =(Korisnik)request.getSession().getAttribute("korisnik");
			if(korisnik !=null){
				String korisnickoIme =korisnik.getKorisnickoIme();
				ArrayList<IstorijaKupovine> istorijaKupovine = (ArrayList<IstorijaKupovine>)ctx.getAttribute("istorijat");
//				if(istorijaKupovine==null)
//					istorijaKupovine=new ArrayList<>();
				
				for (IstorijaKupovine istorija : istorijaKupovine) {
					if(istorija.getKorisnik().equals(korisnickoIme)){
						//temp=new ArrayList<>();
						if(istorija.getListaKupovina()==null || istorija.getListaKupovina().size()==0){
							return null;
						}
						temp=istorija.getListaKupovina();
						break;

						
					}
				}
			}
			return temp;

		}
		
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/ukloniProizvodIzKorpe")
		@Consumes(MediaType.APPLICATION_JSON)
		public synchronized ProizvodKorpa izbrisiProizvodIzKorpe(Proizvod pp)
		{
			
			ArrayList<ProizvodKorpa> pkKorpa = (ArrayList<ProizvodKorpa>)request.getSession().getAttribute("proizvodiKorpe");	
			ArrayList<Proizvod> proizvodi = (ArrayList<Proizvod>) ctx.getAttribute("proizvodi");
			
			ProizvodKorpa temp = null;
			
			for (ProizvodKorpa pk : pkKorpa) {
				if(pk.getProizvod().getSifra().equals(pp.getSifra())){
					temp = pk;
					break;
				}
			}
			
			
			if(proizvodi != null	)
			{
					for (Proizvod k : proizvodi) {
						if(k.getSifra().equals(temp.getProizvod().getSifra()))
						{					
							k.setKolicinaUMagacinu(k.getKolicinaUMagacinu() + temp.getKolicina());
							break;
						}
					}
				}
		
			pkKorpa.remove(temp);
			

			ctx.setAttribute("proizvodi", proizvodi);
			sacuvajProizvod();
			request.getSession().setAttribute("proizvodiKorpe", pkKorpa);
			return temp;
		}
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/ukloniSaListeZelja")
		@Consumes(MediaType.APPLICATION_JSON)
		public synchronized boolean izbrisiIzListeZelja(Proizvod pp)
		{
			Korisnik korisnik =(Korisnik)request.getSession().getAttribute("korisnik");
			String korisnickoIme=korisnik.getKorisnickoIme();
			ArrayList<ListaZelja> listaZelja = (ArrayList<ListaZelja>)ctx.getAttribute("listaZelja");
			int brojProizvoda = 2;
			for (ListaZelja listaZelja2 : listaZelja) {
				if(listaZelja2.getKorisnik().equals(korisnickoIme)){
					for (String listaPro : listaZelja2.getListaProizvoda()) {
						if(listaPro.equals(pp.getSifra())){
							listaZelja2.getListaProizvoda().remove(listaPro);
							brojProizvoda = listaZelja2.getListaProizvoda().size();
							break;
						}
					}
					
				}
			}
			ctx.setAttribute("listaZelja", listaZelja);
			sacuvajListuZelja();
			if(brojProizvoda==0)
				return false;
			
			return true;

		}
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/postaviDostavuNula")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized double posaljiOdradjenoPostavljanje(Proizvod pp)
		{
			ArrayList<ProizvodKorpa> pkKorpa = (ArrayList<ProizvodKorpa>)request.getSession().getAttribute("proizvodiKorpe");
			for (ProizvodKorpa proizvodKorpa : pkKorpa) {
				if(proizvodKorpa.getProizvod().getSifra().equals(pp.getSifra())){
					proizvodKorpa.setCenaDostave(0);
					proizvodKorpa.getDostavljac().setNaziv("Nema dostavljaca");
					break;
				}
			}
			request.getSession().setAttribute("proizvodiKorpe",pkKorpa);
			return 0;
		}
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/getTotal")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized double getTotalCena()
		{
			double total = 0;
			ArrayList<ProizvodKorpa> pkKorpa = (ArrayList<ProizvodKorpa>)request.getSession().getAttribute("proizvodiKorpe");
			
			
			if(pkKorpa != null)
			{	
				for (ProizvodKorpa proizvodKorpa : pkKorpa) {
					total += (proizvodKorpa.getProizvod().getJedinicnaCena() - ((double)proizvodKorpa.getProizvod().getAkcija()/(double)100)*proizvodKorpa.getProizvod().getJedinicnaCena())*proizvodKorpa.getKolicina();
					total +=proizvodKorpa.getCenaDostave();
				}
			}
			return total;
		}
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/otkaziKupovinu")
		public synchronized void otkazivanjeKupovineKorpe()
		{
			ArrayList<ProizvodKorpa> pkKorpa = (ArrayList<ProizvodKorpa>)request.getSession().getAttribute("proizvodiKorpe");
			ArrayList<Proizvod> proizvodi = (ArrayList<Proizvod>) ctx.getAttribute("proizvodi");
			
			if(pkKorpa != null && proizvodi != null)
			{
				for (Proizvod pk : proizvodi) {
					for (ProizvodKorpa sn : pkKorpa) {
						if(sn.getProizvod().getSifra().equals(pk.getSifra()))
						{
							pk.setKolicinaUMagacinu(pk.getKolicinaUMagacinu() + sn.getKolicina());
						}
					}
				}
			}

			request.getSession().removeAttribute("proizvodiKorpe");		
			ctx.setAttribute("proizvodi", proizvodi);
		
		}
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/racunajCenuKorpeZaDostavu")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized double[] posaljiCenuZaProizvod(Proizvod pp)
		{		
			
			
			
			ArrayList<ProizvodKorpa> pkKorpa = (ArrayList<ProizvodKorpa>)request.getSession().getAttribute("proizvodiKorpe");
			ProizvodKorpa  proizvodIzKorpe = null;
			double cenaKorpe=0;
			for (ProizvodKorpa proizvodKorpa : pkKorpa) {
				cenaKorpe += (proizvodKorpa.getProizvod().getJedinicnaCena() - ((double)proizvodKorpa.getProizvod().getAkcija()/(double)100)*proizvodKorpa.getProizvod().getJedinicnaCena())*proizvodKorpa.getKolicina();
				 
			}
			
			//uzimamo proizvod koji nam treba
			for (ProizvodKorpa proizvodKorpa : pkKorpa) {
				if(proizvodKorpa.getProizvod().getSifra().equals(pp.getSifra())){
					proizvodIzKorpe = proizvodKorpa;
					break;
				}
			}
			if(ctx.getAttribute("dostavljaci")==null){
				ucitajDostavljace();
			}
			ArrayList<Dostavljac> dostavljaci = (ArrayList<Dostavljac>) ctx.getAttribute("dostavljaci");
			//uzimamo odabranog dostavljaca
			Dostavljac dostavljac = null;
			for (Dostavljac d : dostavljaci) {
				if(d.getSifra().equals(pp.getNaziv())){
					dostavljac = d;
					break;
				}
			}
			
			double [] cene={0,0};
			cene[1]=cenaKorpe;
			if(dostavljac!=null && proizvodIzKorpe!=null){
				double tezinaProizvoda = proizvodIzKorpe.getProizvod().getTezina();
				double dimenzijeProizvoda = proizvodIzKorpe.getProizvod().getDimenzije();
				double [] tarifaTezine = dostavljac.getTarifaKg();
				double [] tarifaDimenzija = dostavljac.getTarifaDim();
				
				double cenaZaTezinu = 0;
				//provera cene za tezinu
				if(tezinaProizvoda<=1){
					cenaZaTezinu=tarifaTezine[0];
				}else if(tezinaProizvoda<=5){
					cenaZaTezinu=tarifaTezine[1];
				}else{
					cenaZaTezinu=tarifaTezine[2];
				}
				
				double cenaZaDimenzije = 0;
				//provera cena za dimenzije
				if(dimenzijeProizvoda<=0.5){
					cenaZaDimenzije=tarifaDimenzija[0];
				}else if(dimenzijeProizvoda<=1){
					cenaZaDimenzije=tarifaDimenzija[1];
				}else {
					cenaZaDimenzije=tarifaDimenzija[2];
				}
				cene[0]=cenaZaDimenzije+cenaZaTezinu;
				cene[1]+=cene[0];
				
				
				for (ProizvodKorpa proizvodKorpa : pkKorpa) {
					if(proizvodKorpa.getProizvod().getSifra().equals(pp.getSifra())){
						proizvodKorpa.setCenaDostave(cene[0]);
						Dostavljac dost=new Dostavljac();
						dost.setNaziv(dostavljac.getNaziv());
						dost.setSifra(dostavljac.getSifra());
						proizvodKorpa.setDostavljac(dost);
						int dani = posaljiDaneDostave(pp);
						proizvodKorpa.setTrajanjeDostave(dani);
						break;
					}
				}
				request.getSession().setAttribute("proizvodiKorpe",pkKorpa);
				return cene;
				
			}
			
			return cene;

		}
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/hocuSifruKupovine")
		@Produces(MediaType.APPLICATION_JSON)
		public synchronized int posaljiSifruKupovine()
		{	
			int ret = 1;
			
			if(ctx.getAttribute("istorijat")==null)
				ucitajIstorijat();
			ArrayList<IstorijaKupovine> istorijat = (ArrayList<IstorijaKupovine>) ctx.getAttribute("istorijat");
			
			
			Korisnik k = (Korisnik) request.getSession().getAttribute("korisnik");
			String korisnikSifra = k.getKorisnickoIme();
			
			
			
			for (IstorijaKupovine istorijaKupovine : istorijat) {
				//System.out.println(istorijaKupovine.getKorisnik());
				if(istorijaKupovine.getKorisnik().equals(korisnikSifra)){
					//System.out.println("AAAAA");
					//Treba dodeliti sifru kupovine - napravili smo sve u klasi
//					String sifra =  istorijaKupovine.getListaKupovina().get(istorijaKupovine.getListaKupovina().size()).getSifra()+1;
					ret =  istorijaKupovine.getSifra();
					//return istorijaKupovine.getSifra();
					break;
				}
			}
			
			//NIKAD SE NE DODELI ISTORIJA KUPOVINE
			//System.out.println(ret);
			
			return ret;
		}
		
		@SuppressWarnings("unchecked")
		@POST
		@Path("/posaljiZalbuAdminu")
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public synchronized void dodajNaListuZalbi(Proizvod pp)
		{
			Korisnik korisnik =(Korisnik)request.getSession().getAttribute("korisnik");
			String korisnickoIme=korisnik.getKorisnickoIme();
			if(ctx.getAttribute("zalbe")==null)
				ucitajZalbe();
			ArrayList<Zalba> zalbeKupaca = (ArrayList<Zalba>) ctx.getAttribute("zalbe");
			
			
			Zalba novaZalba=new Zalba(korisnickoIme, pp.getSifra(), pp.getBoja());
			zalbeKupaca.add(novaZalba);

			ctx.setAttribute("zalbe", zalbeKupaca);
			sacuvajZalbe();
			
			
		}
		
		
		 @POST
		 @Path("/upload") 
		 @Consumes(MediaType.APPLICATION_JSON)
		 @Produces(MediaType.APPLICATION_JSON)
		 public synchronized Proizvod upload(String image) {
		  String imageUrl = "";
		  String path = ctx.getRealPath("")+"/images";
		  System.out.println(path);
		   String base64Image = image.split(",")[1];
		   //System.out.println(base64Image);
		   String temp = image.split(",")[0];
		   //System.out.println("temp: " +temp);
		   temp = temp.split("/")[1];
		   //System.out.println("temp: " +temp);
		   String type = temp.split(";")[0];
		   if(type.equals("jpeg")){
		    type="jpg";
		   }
		   
		   
		   byte[] imageBytes = javax.xml.bind.DatatypeConverter.parseBase64Binary(base64Image);
		   
		   try {
		    BufferedImage bufferedimg = ImageIO.read(new ByteArrayInputStream(imageBytes));
		    String uniqueName = UUID.randomUUID().toString();
		    File outputfile = new File(path+"/"+uniqueName + "."+type);
		    
		    ImageIO.write(bufferedimg, type, outputfile);
		    
		    imageUrl = "images/"+uniqueName + "."+type;
		    
		   } catch (IOException e) {
		    e.printStackTrace();
		   }
		   Proizvod novi= new Proizvod();
		   novi.setSifra(imageUrl);
		 // return imageUrl;
		  return novi;
		 }
		 
		 @SuppressWarnings("unchecked")
			@POST
			@Path("/preuzmiPreporuke")
			@Produces(MediaType.APPLICATION_JSON)
			public synchronized ArrayList<Proizvod> posaljiPreporuke() {
				if (ctx.getAttribute("proizvodi") == null)
					ucitajProizvod();
				init();
			
				if(((ArrayList<Proizvod>) ctx.getAttribute("proizvodi")).size() == 0)
					return null;
				else{
					Korisnik korisnik =(Korisnik)request.getSession().getAttribute("korisnik");
					
					if(ctx.getAttribute("istorijat") == null)
						ucitajIstorijat();
					ArrayList<IstorijaKupovine> istorijat = (ArrayList<IstorijaKupovine>) ctx.getAttribute("istorijat");
					ArrayList<Proizvod> proizvodi = (ArrayList<Proizvod>) ctx.getAttribute("proizvodi");
					
					ArrayList<Proizvod> preporuke = new ArrayList<>();
					ArrayList<Proizvod> kupljeniProizvodi = new ArrayList<>();
					IstorijaKupovine istorija = null;
					
					for (IstorijaKupovine ik : istorijat) {
						if(ik.getKorisnik().equals(korisnik.getKorisnickoIme())){
							istorija = ik;
							break;
						}
					}
					
					if(istorija==null){
						return null;
					}
					
					ArrayList<Kupovina> kupovina = istorija.getListaKupovina();
					
					for (Kupovina k : kupovina) {
						for (ProizvodKorpa p : k.getProizvodi()) {
								boolean postoji = false;
								for (Proizvod pro : kupljeniProizvodi) {
									
									if(pro.getSifra().equals(p.getProizvod().getSifra())){
										postoji=true;
										break;
									}
								}
								if(postoji==false)
									kupljeniProizvodi.add(p.getProizvod());
						}
					}
					
			
					for (Proizvod p : proizvodi) {
						for (Proizvod k : kupljeniProizvodi) {
							if(p.getKategorija().getNaziv().equals(k.getKategorija().getNaziv()) ){
								if(!preporuke.contains(p))
									preporuke.add(p);
							}
						}
					}

					if(preporuke.size()==0){
						return null;
					}else{
						return preporuke;
					}
					
				}
			}
}


