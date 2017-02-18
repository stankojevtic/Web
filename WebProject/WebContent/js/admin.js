function odjava(){
	$.ajax
	({
		url: 'rest/proizvodi/logout',
		type : "POST",
	}).then(function()
	{					
		
		window.location = "index.html";
	});	
}
function myFunClick(myTd){
	var str = "#"+myTd.id;
	$(str).parent().next('.companion').toggle();
}

function proveraLogin(){
	
	$.ajax({
		url: 'rest/proizvodi/proveraLogovanja'	,
		dataType: 'json',
		type : "POST",		
		contentType:"application/json; charset=utf-8"
	}).then(function(data){
		if(data == null )	//ako se niko nije ulogovao
		{
			window.location= "index.html";
		}else if( data.uloga=="Admin"){
			$("#prodavacNaslov").append("Admin:<br>"+data.ime+" " + data.prezime);
		}else if(data.uloga=="Kupac"){
			window.location= "korisnik.html";
		}else if(data.uloga=="Prodavac"){
			window.location= "prodavac.html";
		}
	});	
}

function prikaziProdavnice(){
	$("#proizvodiDiv").hide();
	$("#prodavniceDiv").show();
	$("#kategorijeDiv").hide();
	$("#dostavljaciDiv").hide();
	$("#zalbeDiv").hide();
	$("#korisniciDiv").hide();
	
	//pod divovi
	$("#izmenaProdavniceDiv").hide();
	$("#pretragaProdavniceDiv").show();
	$("#tabelaProdavnice").show();
}
function prikaziProzivode(){
	$("#prodavniceDiv").hide();
	$("#proizvodiDiv").show();
	$("#kategorijeDiv").hide();
	$("#dostavljaciDiv").hide();
	$("#zalbeDiv").hide();
	$("#korisniciDiv").hide();
	//pod divovi
	$("#dodajIzmeniProizvodDiv").hide();
	$("#divPretragaProizvoda").show();
	$("#tabelaPrikaz").show();
}
function prikaziKategorije(){
	$("#prodavniceDiv").hide();
	$("#proizvodiDiv").hide();
	$("#kategorijeDiv").show();
	$("#dostavljaciDiv").hide();
	$("#zalbeDiv").hide();
	$("#korisniciDiv").hide();
	//pod divovi
	$("#dodajIzmeniKategorijuDiv").hide();
	$("#tabelaKategorije").show();
	$("#btnKategorijaDiv").show();
	
}
function prikaziDostavljace(){
	$("#prodavniceDiv").hide();
	$("#proizvodiDiv").hide();
	$("#kategorijeDiv").hide();
	$("#dostavljaciDiv").show();
	$("#zalbeDiv").hide();
	$("#korisniciDiv").hide();
	//
	
	$("#btnDostavljacDiv").show();
	$("#tabelaDostavljaci").show();
	$("#dodajIzmeniDostavljacaDiv").hide();
	
}
function prikaziZalbe(){
	$("#prodavniceDiv").hide();
	$("#proizvodiDiv").hide();
	$("#kategorijeDiv").hide();
	$("#dostavljaciDiv").hide();
	$("#zalbeDiv").show();
	$("#korisniciDiv").hide();
}

function prikaziKorisnike(){
	$("#prodavniceDiv").hide();
	$("#proizvodiDiv").hide();
	$("#kategorijeDiv").hide();
	$("#dostavljaciDiv").hide();
	$("#zalbeDiv").hide();
	$("#korisniciDiv").show();
	//pod divovi
	$("#btnKorisnikDiv").show();
	$("#tabelaKorisnici").show();
	$("#dodajKorisnikaDiv").hide();
	
}

function obrisiRecenziju(btn){
	var buttonId = btn.id;
	kljucevi = buttonId.split('?');
	kljucProizvod = kljucevi[1];
	kljucRecenzija = kljucevi[0];
	$.ajax
	({
		url: 'rest/proizvodi/obrisiRecenziju',
		type : "POST",		
		contentType:"application/json; charset=utf-8",
		dataType : 'json',
		
		data: JSON.stringify({
			sifra : kljucProizvod,
			boja : kljucRecenzija
		})
	}).then(function(data){
		$().toastmessage('showSuccessToast', "Uspesno ste obrisali recenziju...");
		popuniTabeluProizvoda();
		
	});
	
}

function popuniTabeluProizvoda(){
	
	$.ajax
	({
		url: 'rest/proizvodi/preuzmiProizvode',
		dataType : 'json',
		type : "POST"	
	}).then(function(data)
	{	
		if(data == null)
		{
			

		}
		else
		{
		
			var filter = $("#ostaloPretraga").val().trim();
			var cenaOd1 = $("#proizvodCenaOd").val().trim();
			var cenaDo1 = $("#proizvodCenaDo").val().trim();
			
			var cenaOd = $.isNumeric(cenaOd1) ? parseFloat(cenaOd1) : 0;
			var cenaDo = $.isNumeric(cenaDo1) ? parseFloat(cenaDo1) : 1000000000;
			
			var count = 0;
			
			
			$.ajax({
				url: 'rest/proizvodi/proveraLogovanja'	,
				dataType: 'json',
				type : "POST",		
				contentType:"application/json; charset=utf-8"
			}).then(function(data2){
				
				trenKorisnik=data2.korisnickoIme;
				
				
			
			$("#tabelaPrikaz tbody").remove();

			
			data.forEach(function(item){
				if(uslovFilteraProizvodi(item, filter, cenaOd, cenaDo))
				{
				

					var popust;
					var datumPopusta;
					if(item.akcija===0){
						popust="Nema";
						datumPopusta="";
					}else{
						popust=item.akcija;
						var datumi=item.datumAkcije.split("&");
						var odDatuma=datumi[0];
						var doDatuma=datumi[1];
						datumPopusta="%<br>od "+odDatuma+"<br>do "+doDatuma;
					}
					
					var str="";
					str="<tr class=\"record\" id=\""+item.sifra+"\"  >"+
					"<td class=\"overflow\" id=\"td"+item.sifra +"\" onclick=\"myFunClick(this)\" >" + item.sifra + "</td>"+
					"<td class=\"overflow\" id=\"td"+item.sifra +"\" onclick=\"myFunClick(this)\">" + item.naziv + "</td>"+
					"<td class=\"overflow\" id=\"td"+item.sifra +"\" onclick=\"myFunClick(this)\">" + item.nazivProizvodjaca + "</td>"+
					"<td class=\"overflow\" id=\"td"+item.sifra +"\" onclick=\"myFunClick(this)\">" + item.kategorija.naziv + "</td>"+
					"<td class=\"overflow\" id=\"td"+item.sifra +"\" onclick=\"myFunClick(this)\">" + item.prodavnica.naziv + "</td>"+
					"<td class=\"overflow\" id=\"td"+item.sifra +"\" onclick=\"myFunClick(this)\">" + item.jedinicnaCena.toFixed(2) + "</td>"+
					"<td class=\"overflow\" id=\"td"+item.sifra +"\" onclick=\"myFunClick(this)\">" + popust + datumPopusta+"</td>"+
					"<td class=\"overflow\" id=\"td"+item.sifra +"\" onclick=\"myFunClick(this)\">" + item.kolicinaUMagacinu + "</td>"+
					"<td> <button class=\"btn btn-warning last\" onclick=\"return dodajIzmeniProizvod(this);\" id=\""+item.sifra+"\"> " +
					"<span class=\"glyphicon glyphicon-pencil\"></span>Izmeni</button></td>"+
					
					
					"<td> <button class=\"btn btn-danger last\" onclick=\"obrisiProizvod(this);\" id=\""+item.sifra+"\"> " +
							"<span class=\"glyphicon glyphicon-remove\"></span>Obrisi </button></td>"+
					"</tr>" +
					"<tr class=\"companion\">"+
						"<td class=\"output\" style=\"height:200px;\"  colspan=\"10\">"+
						"<div style=\"height:450px;overflow-y: scroll;\">"+
							"<div class=\"alert alert-info\"  style=\"height:300px;\">" +
								"<span >" +
								"<font   size=\"3\"> " +
								"<iframe align=\"right\" src=\""+item.video+"\" frameborder=\"0\" allowfullscreen style=\"border:2px solid lightblue;border-radius: 10px;width:400px;height:230px;\"></iframe>" +
								"<img   src=\""+item.slika+"\" style=\"border:2px solid lightblue;width:200px;height:200px;border-radius: 10px;\"  align=\"left\"  />"+
								" &nbsp;&nbsp;Boja proizvoda: "+item.boja +" <br><br>"+
								" &nbsp;&nbsp;Dimenzije proizvoda: "+item.dimenzije +" m2 <br><br>"+
								" &nbsp;&nbsp;Težina proizvoda: "+item.tezina +" kg <br><br>"+
								" &nbsp;&nbsp;Zemlja proizvodnje: "+item.zemljaProizvodnje +"<br><br>"+
								" &nbsp;&nbsp;Ocena proizvoda: <span id=\"ocena"+item.sifra+"\" >"+item.ocena.toFixed(2) +"</span><br><br> "+
								"";
								
							
							
								str+="</span>"+
								
							"<br><br><br></div>";
							
							item.recenzije.forEach(function(item2){
								str+="<div style=\"background-color: #d9edf7;padding: 15px; margin-bottom: 20px;  border: 1px solid transparent; border-radius: 4px;\">" +
								
								
								"<h5>Recenzija: "+item2.sifra+", korisnik: "+item2.korisnik.ime+", datum: "+item2.datum+", ocena:  "+item2.ocena;
								
									str+="<button type=\"button\" class=\"btn btn-danger active\" id=\""+item2.sifra+"?"+item.sifra+"\" onclick=\"obrisiRecenziju(this)\" style=\"float: right;\">\r\n" + 
									"          <span class=\"glyphicon glyphicon-remove\"></span>\r\n" + 
									"</button>";
								
								str+="</h5><br>";
								
								item2.komentari.forEach(function(item3){
									
									str+="<div style=\"background-color: #F6FFAA;padding: 15px; margin-bottom: 10px; margin-left: 20px;  border: 1px solid transparent; border-radius: 10px;\"> \r\n"; 
										if(trenKorisnik===item3.korisnik){
											str+="<button type=\"button\" class=\"btn btn-danger active\" style=\"float: right;\">\r\n" + 
												"          <span class=\"glyphicon glyphicon-remove\"></span>\r\n" + 
												"</button>";
										}
									   str+="<font size=\"2\">"+item3.korisnik+", datum: "+item3.datum+"<br><br>"+item3.sadrzaj+"</font>\r\n" + 
											
											"</div>";
								
								});
//								
								
								
								str+="</div>";
							});
							
							
							
			
					str+="</div></td>"+
					"</tr>"
				
					
					
						
					$("#tabelaPrikaz").append( str);
					}
				});
					

			});

		}
		
	});
}

function pretragaProizvodi(){
	popuniTabeluProizvoda();
	
}

function uslovFilteraProizvodi(item, filter, cenaOd, cenaDo)
{
	return (item.jedinicnaCena >= cenaOd && item.jedinicnaCena <= cenaDo)
		&& (item.sifra.indexOf(filter) != -1  
		|| (item.naziv.indexOf(filter) != -1 && $('#cbNaziv').is(':checked'))
		|| (item.kolicinaUMagacinu.toString().indexOf(filter) != -1 && $('#cbKolicina').is(':checked'))
		|| (item.kategorija.naziv.indexOf(filter) != -1 && $('#cbKategorija').is(':checked'))
		|| (item.zemljaProizvodnje.indexOf(filter) != -1 && $('#cbZemlja').is(':checked'))
		|| (item.ocena.toString().indexOf(filter) != -1 && $('#cbOcena').is(':checked'))
		|| (item.boja.indexOf(filter) != -1 && $('#cbBoja').is(':checked'))
		
		|| (item.recenzije.length.toString().indexOf(filter) != -1 && $('#cbBrojRecenzija').is(':checked')));
		
}

function proveraPoljaZaProizvod(){
	var ret=$("#sifraPro").val().trim().length !=0 
	&& $("#nazivPro").val().trim().length !=0 
	&& $("#proizvodjacPro").val().trim().length !=0 
	&& $("#cenaPro").val().trim().length !=0 
	&& $("#magacinPro").val().trim().length !=0 
	&& $("#bojaPro").val().trim().length !=0 
	&& $("#dimenzijePro").val().trim().length !=0 
	&& $("#tezinaPro").val().trim().length !=0 
	&& $("#zemljaPro").val().trim().length !=0
	&& $("#slikaPro").attr("name")!="slikaPro" 
	&& $("#videoPro").val().trim().length !=0 ;
	
	
	
	if(ret==false){
		$().toastmessage('showErrorToast', "Sva polja moraju biti popunjena!");
		return false;
	}
	
	check_num = /^[0-9_]{0,20}[.]{0,1}[0-9_]{0,20}$/;
	check_num1 = /^[0-9_]{0,20}$/;
	if(!check_num.test($("#cenaPro").val().trim())){
		$().toastmessage('showErrorToast', "Cena mora biti decimalni broj!");
		return false;
	}
	if(!check_num1.test($("#magacinPro").val().trim())){
		$().toastmessage('showErrorToast', "Količina u magacinu mora biti prirodni broj!");
		return false;
	}
	if(!check_num.test($("#dimenzijePro").val().trim())){
		$().toastmessage('showErrorToast', "Dimenzija mora biti decimalni broj!");
		return false;
	}
	if(!check_num.test($("#tezinaPro").val().trim())){
		$().toastmessage('showErrorToast', "Težina mora biti decimalni broj!");
		return false;
	}
	if($("#slikaPro").attr("name")=="slikaPro"){
		$().toastmessage('showErrorToast', "Niste učitali sliku!");
		return false;
	}
	
	return true;
}

function dodajIzmeniProizvod(btn){
	if(btn.id=="dodajProizvodBtn"){
		$("#dodajIzmeni").attr('name',"dodajPro");
		
		$("#dodajIzmeniProizvodDiv").show();
		$("#divPretragaProizvoda").hide();
		$("#tabelaPrikaz").hide();
		//praznjenje polja	
		$("#sifraPro").val("");
		$('#sifraPro').prop('readonly', false);
		$("#nazivPro").val("");
		$("#proizvodjacPro").val("");
		$('#kategorijaProSelect option').eq(0).prop('selected', true);
		$('#prodavnicaProSelect option').eq(0).prop('selected', true);
		$("#cenaPro").val("");
		$("#magacinPro").val("");
		$("#bojaPro").val("");
		$("#dimenzijePro").val("");
		$("#tezinaPro").val("");
		$("#zemljaPro").val("");
		$("#slikaPro").val("");
		$("#videoPro").val("");
		$("#slikaPro").attr('name',"slikaPro");
		
	}else{
		$.ajax
		({
			url: 'rest/proizvodi/preuzmiProizvodZaIzmenu',
			dataType : 'json',
			type : "POST",
			contentType:"application/json; charset=utf-8",
			data: JSON.stringify({
				sifra : btn.id
			})	
		}).then(function(data)
		{
			$("#dodajIzmeniProizvodDiv").show();
			$("#divPretragaProizvoda").hide();
			$("#tabelaPrikaz").hide();
			$("#dodajIzmeni").attr('name',"izmeniPro");
			//praznjenje polja	
			$("#sifraPro").val(data.sifra);
			$('#sifraPro').prop('readonly', true);
			$("#nazivPro").val(data.naziv);
			$("#proizvodjacPro").val(data.nazivProizvodjaca);
			$("#kategorijaProSelect option[value="+data.kategorija.naziv +"]").attr('selected','selected');
//			$('#kategorijaProSelect option').eq(0).prop('selected', true);
//			$('#prodavnicaProSelect option').eq(0).prop('selected', true);
			$("#kategorijaProSelect option[value="+data.prodavnica.naziv +"]").attr('selected','selected');
			$("#cenaPro").val(data.jedinicnaCena);
			$("#magacinPro").val(data.kolicinaUMagacinu);
			$("#bojaPro").val(data.boja);
			$("#dimenzijePro").val(data.dimenzije);
			$("#tezinaPro").val(data.tezina);
			$("#zemljaPro").val(data.zemljaProizvodnje);
			$("#slikaPro").attr('name',data.slika);
			$("#videoPro").val(data.video);
		});
	}
}

function sacuvajDodajIzmeniPro(btn){
	
	var provera = proveraPoljaZaProizvod();
	if(provera==false)
		return false;
	
	var sifrPro=$("#sifraPro").val().trim();
	var nazivPro=$("#nazivPro").val().trim();
	var proizvodjacPro=$("#proizvodjacPro").val().trim();
	var kategorijaProSelect=$("#kategorijaProSelect").find('option:selected').val();
	var prodavnicaProSelect=$("#prodavnicaProSelect").find('option:selected').val();
	var cenaPro=$("#cenaPro").val().trim();
	var magacinPro=$("#magacinPro").val().trim();
	var bojaPro=$("#bojaPro").val().trim();
	var dimenzijePro=$("#dimenzijePro").val().trim();
	var tezinaPro=$("#tezinaPro").val().trim();
	var zemljaPro=$("#zemljaPro").val().trim();
	var slikaPro=$("#slikaPro").attr("name");
	var videoPro=$("#videoPro").val().trim();
	
	var prodavnicaIKategorija = kategorijaProSelect+"_"+prodavnicaProSelect;
	if(btn.name=="dodajPro"){
		$.ajax
		({
			url: 'rest/proizvodi/dodajNoviProizvod',
			dataType : 'json',
			type : "POST",
			contentType:"application/json; charset=utf-8",
			data: JSON.stringify({
				sifra : sifrPro,
				naziv : nazivPro,
				boja : bojaPro,
				dimezije : dimenzijePro,
				tezina: tezinaPro,
				zemljaProizvodnje: zemljaPro,
				jedinicnaCena: cenaPro,
				nazivProizvodjaca: proizvodjacPro,
				slika: slikaPro,
				video: videoPro,
				datumAkcije: prodavnicaIKategorija,
				kolicinaUMagacinu: magacinPro,		
			})
		}).then(function(data)
		{
			if(data==true){
				popuniTabeluProizvoda();
				$().toastmessage('showSuccessToast', "Uspešno ste dodali proizvod.");
				prikaziProzivode();
			}else{
				$().toastmessage('showErrorToast', "Sifra proizvoda već postoji!");
			}
		});
	}else{
		$.ajax
		({
			url: 'rest/proizvodi/izmeniProizvod',
			dataType : 'json',
			type : "POST",
			contentType:"application/json; charset=utf-8",
			data: JSON.stringify({
				sifra : sifrPro,
				naziv : nazivPro,
				boja : bojaPro,
				dimezije : dimenzijePro,
				tezina: tezinaPro,
				zemljaProizvodnje: zemljaPro,
				jedinicnaCena: cenaPro,
				nazivProizvodjaca: proizvodjacPro,
				slika: slikaPro,
				video: videoPro,
				datumAkcije: prodavnicaIKategorija,
				kolicinaUMagacinu: magacinPro,		
			})
		}).then(function(data)
		{
			
			popuniTabeluProizvoda();
			$().toastmessage('showSuccessToast', "Uspešno ste izmenili proizvod.");
			prikaziProzivode();
		});
	}
}

function popuniKategorijeCombo(){
	$.ajax({
		url: 'rest/proizvodi/preuzmiKategorije'	,
		type : "POST",		
		contentType:"application/json; charset=utf-8",
		dataType : 'json',
	}).then(function(data){
		$("#kategorijaProSelect").remove();
		$("#kategorijaProDiv").append("<select id=\"kategorijaProSelect\" style=\"width: 280px\">");
//		$("#kategorijaProSelect").append("<option value=\""+"izaberi"+"\">"+"Pogledajte cene dostavljača"+"</option>");
		data.forEach(function(item){
				$("#kategorijaProSelect").append("<option value=\""+item.naziv+"\">"+item.naziv+"</option>");
		});
		$("#kategorijaProDiv").append("</select>");
		
		$("#kategorijaPodSelect").remove();
		$("#kategorijaPodDiv").append("<select id=\"kategorijaPodSelect\" style=\"width: 250px\">");
		$("#kategorijaPodSelect").append("<option value=\""+"izaberi"+"\">"+"Izaberi kategoriju..."+"</option>");
		data.forEach(function(item){
				$("#kategorijaPodSelect").append("<option value=\""+item.naziv+"\">"+item.naziv+"</option>");
		});
		$("#kategorijaPodDiv").append("</select>");
		
//		$("#kategorijaPodSelect option").each(function(){
//			alert($(this).val())
//		});
		
	});		
}
function popuniProdavniceCombo(){
	
	$.ajax
	({
		url: 'rest/proizvodi/preuzmiProdavnice',
		dataType : 'json',
		type : "POST"		
	}).then(function(data)
	{
		$("#prodavnicaProSelect").remove();
		$("#prodavnicaProDiv").append("<select id=\"prodavnicaProSelect\" style=\"width: 280px\">");
//		$("#kategorijaProSelect").append("<option value=\""+"izaberi"+"\">"+"Pogledajte cene dostavljača"+"</option>");
		data.forEach(function(item){
				$("#prodavnicaProSelect").append("<option value=\""+item.sifra+"\">"+item.naziv+"</option>");
		});
		$("#prodavnicaProDiv").append("</select>");
	});
}
function obrisiProizvod(btn){
	$.ajax
	({
		url: 'rest/proizvodi/obrisiProizvod',
		dataType : 'json',
		type : "POST",
		contentType:"application/json; charset=utf-8",
		data: JSON.stringify({
			sifra : btn.id,
		})
	}).then(function(data)
	{
		$().toastmessage('showSuccessToast', "Uspešno ste obrisali proizvod.");
		popuniTabeluProizvoda();
		prikaziProzivode();
	});
}

function pretragaProdavnice(){
	popuniTabeluProdavnica();
}

function uslovFilteraProdavnice(item, filter)
{
	if(filter=="")
		return true;
	return (item.naziv.indexOf(filter) != -1 && $('#cbProdavnicaNaziv').is(':checked') )
		|| (item.ocena.toString().indexOf(filter) != -1 && $('#cbProdavnicaOcena').is(':checked'))
		|| (item.drzava.indexOf(filter) != -1 && $('#cbZemlja').is(':checked'));		
}

function popuniTabeluProdavnica(){
	$.ajax
	({
		url: 'rest/proizvodi/preuzmiProdavnice',
		dataType : 'json',
		type : "POST"		
	}).then(function(data)
	{
		if(data==null){
			$("#prodavnicePrazne").show();
			$("#tabelaProdavnice").hide();
		}else{
			$("#prodavnicePrazne").hide();
			$("#tabelaProdavnice").show();
			
			$("#tabelaProdavnice tbody").remove();

			var filter = $("#prodavnicaPretraga").val().trim();
			
			var str="";
			data.forEach(function(item){
				if(uslovFilteraProdavnice(item, filter))
				{
					str+="<tr class=\"record\" id=\""+item.sifra+"\"  >"+
					"<td class=\"overflow\" id=\"td"+item.sifra +"\" onclick=\"myFunClick(this)\" >" + item.sifra + "</td>"+
					"<td class=\"overflow\" id=\"td"+item.sifra +"\" onclick=\"myFunClick(this)\">" + item.naziv + "</td>"+
					"<td class=\"overflow\" id=\"td"+item.sifra +"\" onclick=\"myFunClick(this)\">" + item.adresa + "</td>"+
					"<td class=\"overflow\" id=\"td"+item.sifra +"\" onclick=\"myFunClick(this)\">" + item.drzava + "</td>"+
					"<td class=\"overflow\" id=\"td"+item.sifra +"\" onclick=\"myFunClick(this)\">" + item.email + "</td>"+
					"<td class=\"overflow\" id=\"td"+item.sifra +"\" onclick=\"myFunClick(this)\">" + item.ocena + "</td>"+
					"<td class=\"overflow\" id=\"td"+item.sifra +"\" onclick=\"myFunClick(this)\">" +item.odgovorniProdavac+"</td>"+
					"<td class=\"overflow\" id=\"td"+item.sifra +"\" onclick=\"myFunClick(this)\">" + item.telefon + "</td>"+
					"<td> <button class=\"btn btn-warning last\" onclick=\"izmeniProdavnicu(this);\" id=\""+item.sifra+"\"> " +
					"<span class=\"glyphicon glyphicon-pencil\"></span>Izmeni</button></td>"+
					"<td> <button class=\"btn btn-danger last\" onclick=\"obrisiProdavnicu(this);\" id=\""+item.sifra+"\"> " +
					"<span class=\"glyphicon glyphicon-remove\"></span>Obriši</button></td>";
				}
				
			});
			$("#tabelaProdavnice").append( str);
		}
		
	});
}

function obrisiProdavnicu(btn){
	$.ajax
	({
		url: 'rest/proizvodi/obrisiProdavnicu',
		dataType : 'json',
		type : "POST",
		contentType:"application/json; charset=utf-8",
		data: JSON.stringify({
			sifra : btn.id
		})
	}).then(function(data)
	{
		
		popuniTabeluProizvoda();
     	popuniTabeluProdavnica();
     	$().toastmessage('showSuccessToast', "Uspešno ste obrisali prodavnicu!");
	});
}

function izmeniProdavnicu(btn){
	
	$("#izmenaProdavniceDiv").show();
	$("#pretragaProdavniceDiv").hide();
	$("#tabelaProdavnice").hide();
	
	if(btn.id=="dodajProdavnicuBtn"){
		$("#sacuvanProdavnicuBtn").attr('name',"dodajProdavnicu");
		//praznjenje polja	
		$("#sifraProdavnice").val("");
		$('#sifraProdavnice').prop('readonly', false);
		$("#nazivProdavnice").val("");
		$("#adresaProdavnice").val("");
		$("#drzavaProdavnice").val("");
		$("#emailProdavnice").val("");
		$("#ocenaProdavnice").val("");
		$('#ocenaProdavnice').prop('readonly', true);
		$("#telefonProdavnice").val("");
		$("#prodavacSelect option[value=izaberi]").attr('selected','selected');
	
	}else{
		
		$("#sacuvanProdavnicuBtn").attr('name',btn.id);
	
		$.ajax
		({
			url: 'rest/proizvodi/preuzmiProdavnicuZaIzmenu',
			dataType : 'json',
			type : "POST",
			contentType:"application/json; charset=utf-8",
			data: JSON.stringify({
				sifra : btn.id
			})
		}).then(function(data)
		{
			
			$("#sifraProdavnice").val(data.sifra);
			$('#sifraProdavnice').prop('readonly', true);
			$("#nazivProdavnice").val(data.naziv);
			$("#adresaProdavnice").val(data.adresa);
			$("#drzavaProdavnice").val(data.drzava);
			$("#emailProdavnice").val(data.email);
			$("#ocenaProdavnice").val(data.ocena);
			$('#ocenaProdavnice').prop('readonly', true);
			$("#telefonProdavnice").val(data.telefon);
			$("#prodavacSelect option[value="+data.odgovorniProdavac+"]").attr('selected','selected');
				
		});
	}
	
}

function sacuvajIzmenuProdavnice(btn){
	var kategorijaProSelect=$("#prodavacSelect").find('option:selected').val();
	
	var ret= $("#sifraProdavnice").val().trim().length != 0
	&& $("#nazivProdavnice").val().trim().length != 0
	&& $("#adresaProdavnice").val().trim().length != 0
	&& $("#drzavaProdavnice").val().trim().length != 0
	&& $("#emailProdavnice").val().trim().length != 0
	&& $("#telefonProdavnice").val().trim().length != 0
	&& kategorijaProSelect!="izaberi";
	
	
    
    if(ret == false)
    {
    	$().toastmessage('showErrorToast', "Ne smete imati praznih polja!");
        return false;
    }
    
    check_mail = /^[A-Za-z]{1}[A-Za-z0-9_]{0,20}[@]{1}[a-z.]{1,20}$/;
	check_num = /^[0-9_]{8,12}$/;

	if(!check_num.test($("#telefonProdavnice").val().trim())){
		$().toastmessage('showErrorToast', "Telefon mora da sadrži samo brojeve [8-12]");
		return false;
	}
	if(!check_mail.test($("#emailProdavnice").val().trim())){
		$().toastmessage('showErrorToast', "Email nije validan!");
		return false;
	}
	
	var sifra1= $("#sifraProdavnice").val().trim();
	var naziv1= $("#nazivProdavnice").val().trim();
	var adresa1=	$("#adresaProdavnice").val().trim();
	var drzava1=$("#drzavaProdavnice").val().trim();
	var email1=$("#emailProdavnice").val().trim();
	var telefon1=$("#telefonProdavnice").val().trim();
	
	if(btn.name=="dodajProdavnicu"){
		$.ajax
		({
			url: 'rest/proizvodi/dodajNovuProdavnice',
			dataType : 'json',
			type : "POST",
			contentType:"application/json; charset=utf-8",
			data: JSON.stringify({
				sifra : sifra1,
				naziv : naziv1,
				adresa : adresa1,
				drzava : drzava1,
				email: email1,
				telefon: telefon1,
				odgovorniProdavac : kategorijaProSelect,
			})
		}).then(function(data)
		{
			if(data==true){
				$().toastmessage('showSuccessToast', "Uspešno ste dodali prodavnicu");
				popuniTabeluProdavnica();
				prikaziProdavnice();
			}else{
				$().toastmessage('showErrorToast', "Prodavnica sa tom šifrom ili nazivom već postoji!");
				
			}
			
			
		});
	}else{
		$.ajax
		({
			url: 'rest/proizvodi/sacuvajIzmeneProdavnice',
			dataType : 'json',
			type : "POST",
			contentType:"application/json; charset=utf-8",
			data: JSON.stringify({
				sifra : sifra1,
				naziv : naziv1,
				adresa : adresa1,
				drzava : drzava1,
				email: email1,
				telefon: telefon1,
				odgovorniProdavac : kategorijaProSelect,
			})
		}).then(function(data)
		{
			
			$().toastmessage('showSuccessToast', "Uspešno ste izmenili prodavnicu");
			popuniTabeluProdavnica();
			prikaziProdavnice();
		});
		
	}
	
	
}

function popuniProdavceCombo(){
	
	$.ajax
	({
		url: 'rest/proizvodi/preuzmiProdavce',
		dataType : 'json',
		type : "POST"		
	}).then(function(data)
	{	if(data!=null){
			$("#prodavacSelect").remove();
			
			$("#prodavacDiv").append("<select onchange=\"promenaProdavciAkcija(this)\" id=\"prodavacSelect\" style=\"width: 280px\">");
			$("#prodavacSelect").append("<option value=\""+"izaberi"+"\">"+"Izaberite prodavca..."+"</option>");
			data.forEach(function(item){
					$("#prodavacSelect").append("<option value=\""+item.korisnickoIme+"\">"+item.korisnickoIme+"</option>");
			});
			$("#prodavacDiv").append("</select>");
		}
	});
}


function popuniTabeluKategorija(){
	$.ajax
	({
		url: 'rest/proizvodi/preuzmiKategorije',
		dataType : 'json',
		type : "POST"		
	}).then(function(data)
	{
		if(data==null){
			$("#kategorijePrazne").show();
			$("#tabelaKategorije").hide();
		}else{
			$("#kategorijePrazne").hide();
			$("#tabelaKategorije").show();
			
			$("#tabelaKategorije tbody").remove();

			
			
			var str="";
			data.forEach(function(item){
					var pod="Nema";
					if(item.podKategorija.naziv!=null)
						pod=item.podKategorija.naziv;
				
					str+="<tr class=\"record\" id=\""+item.naziv+"\"  >"+
					"<td class=\"overflow\" id=\"td"+item.naziv +"\" onclick=\"myFunClick(this)\" >" + item.naziv + "</td>"+
					"<td class=\"overflow\" id=\"td"+item.naziv +"\" onclick=\"myFunClick(this)\">" + item.opis + "</td>"+
					
					"<td class=\"overflow\" id=\"td"+item.naziv +"\" onclick=\"myFunClick(this)\">" + pod+ "</td>"+
					"<td> <button class=\"btn btn-warning last\" onClick=\"dodajIzmeniKategoriju(this)\" id=\""+item.naziv+"\"> " +
					"<span class=\"glyphicon glyphicon-pencil\"></span>Izmeni</button></td>"+
					"<td> <button class=\"btn btn-danger last\" onclick=\"obrisiKategoriju(this);\" id=\""+item.naziv+"\"> " +
					"<span class=\"glyphicon glyphicon-remove\"></span>Obriši</button></td>";
				
				
			});
			$("#tabelaKategorije").append( str);
		}
		
	});
}

function popuniTabeluDostavljaca(){
	$.ajax
	({
		url: 'rest/proizvodi/preuzmiDostavljace',
		dataType : 'json',
		type : "POST"		
	}).then(function(data)
	{
		if(data==null){
			$("#dostavljaciPrazni").show();
			$("#tabelaDostavljaci").hide();
		}else{
			$("#dostavljaciPrazni").hide();
			$("#tabelaDostavljaci").show();
			
			$("#tabelaDostavljaci tbody").remove();

			
			
			var str="";
			data.forEach(function(item){
				
					str+="<tr class=\"record\" id=\""+item.sifra+"\"  >"+
					"<td class=\"overflow\" id=\"td"+item.sifra +"\" onclick=\"myFunClick(this)\" >" + item.sifra + "</td>"+
					"<td class=\"overflow\" id=\"td"+item.sifra +"\" onclick=\"myFunClick(this)\">" + item.naziv + "</td>"+
					"<td class=\"overflow\" id=\"td"+item.sifra +"\" onclick=\"myFunClick(this)\" >" + item.opis + "</td>"+
					
					"<td class=\"overflow\" id=\"td"+item.sifra +"\" onclick=\"myFunClick(this)\" >";
					item.drzavePoslovanja.forEach(function(drz){
						str+=drz+"<br>";
					});
					str+="</td>";
					
					str+="<td class=\"overflow\" id=\"td"+item.sifra +"\" onclick=\"myFunClick(this)\" >";
					item.trajanjeDostave.forEach(function(dost){
						str+=dost+"-dana<br>";
					});
					str+="</td>";
					
					str+="<td class=\"overflow\" id=\"td"+item.sifra +"\" onclick=\"myFunClick(this)\" >";
					var brojac=0;
					item.tarifaDim.forEach(function(dim){
						if(brojac==0)
							str+="€"+dim+" <0.5m2<br>";
						if(brojac==1)
							str+="€"+dim+" <1m2<br>";
						if(brojac==2)
							str+="€"+dim+" >1m2<br>";
						brojac+=1;
					});
					str+="</td>";
					brojac=0;
					str+="<td class=\"overflow\" id=\"td"+item.sifra +"\" onclick=\"myFunClick(this)\" >";
					item.tarifaKg.forEach(function(kg){
						if(brojac==0)
							str+="€"+kg+" <1kg<br>";
						if(brojac==1)
							str+="€"+kg+" <1kg<br>";
						if(brojac==2)
							str+="€"+kg+" >5kg<br>";
						brojac+=1;
					});
					str+="</td>";
					
					str+="<td> <button class=\"btn btn-warning last\" onclick=\"dodajIzmeniDostavljaca(this);\" id=\""+item.sifra+"\"> " +
					"<span class=\"glyphicon glyphicon-pencil\"></span>Izmeni</button></td>"+
					"<td> <button class=\"btn btn-danger last\" onclick=\"obrisiDostavljaca(this);\" id=\""+item.sifra+"\"> " +
					"<span class=\"glyphicon glyphicon-remove\"></span>Obriši</button></td>";
				
				
			});
			$("#tabelaDostavljaci").append( str);
		}
		
	});
}



//kategorije
function dodajIzmeniKategoriju(btn){
	$("#dodajIzmeniKategorijuDiv").show();
	$("#tabelaKategorije").hide();
	$("#btnKategorijaDiv").hide();
	
	if(btn.id=="dodajKategorijuBtn"){
		$("#sacuvajKategorijuBtn").attr('name',"dodajKat");
		$("#nazivKat").val("");
		$('#nazivKat').prop('readonly', false);
		$("#opisKat").val("");
	}else{
		$("#sacuvajKategorijuBtn").attr('name',btn.id);
		$.ajax
		({
			url: 'rest/proizvodi/preuzmiKategorije',
			dataType : 'json',
			type : "POST"		
		}).then(function(data)
		{
			data.forEach(function(item){
				if(item.naziv==btn.id){
				
					$("#nazivKat").val(item.naziv);
					$('#nazivKat').prop('readonly', true);
					$("#opisKat").val(item.opis);
					if(item.podKategorija.naziv!=null)
						$("#kategorijaPodSelect option[value="+item.podKategorija.naziv+"]").attr('selected','selected');
					else
						$('#kategorijaPodSelect option').eq(0).prop('selected', true);
				}
			});
		});
	}
	
}

function sacuvajDodajIzmeniKat(btn){
	var ret= $("#nazivKat").val().trim().length != 0
	&& $("#opisKat").val().trim().length != 0;
	if(ret==false){
		$().toastmessage('showErrorToast', "Morate popuniti naziv i opis!");
		return false;
	}
	
	var selektovanaNad=$("#kategorijaPodSelect").find('option:selected').val();
	if(selektovanaNad=="izaberi")
		selektovanaNad="Nema";
	var naziv= $("#nazivKat").val().trim();
	var opis= $("#opisKat").val().trim();
	
	
	if(btn.name=="dodajKat"){
		
		$.ajax
		({
			url: 'rest/proizvodi/dodajNovuKategoriju',
			dataType : 'json',
			type : "POST",
			contentType:"application/json; charset=utf-8",
			data: JSON.stringify({
				naziv: naziv,
				opis: opis,
				sifra : selektovanaNad	
			})
		}).then(function(data)
		{
			if(data==true){
				$().toastmessage('showSuccessToast', "Uspešno ste dodali kategoriju...");
				popuniTabeluKategorija();
				popuniKategorijeCombo();
	        	$("#dodajIzmeniKategorijuDiv").hide();
	        	$("#tabelaKategorije").show();
	        	$("#btnKategorijaDiv").show();
			}else{
				$().toastmessage('showErrorToast', "Postoji već takav naziv!");
			}
			
			
		});
	}else{
		$.ajax
		({
			url: 'rest/proizvodi/izmeniKategoriju',
			dataType : 'json',
			type : "POST",
			contentType:"application/json; charset=utf-8",
			data: JSON.stringify({
				naziv: naziv,
				opis: opis,
				sifra : selektovanaNad	
			})
		}).then(function(data)
		{
			
				$().toastmessage('showSuccessToast', "Uspešno ste izmenili kategoriju...");
				popuniTabeluKategorija();
				popuniKategorijeCombo();
	        	$("#dodajIzmeniKategorijuDiv").hide();
	        	$("#tabelaKategorije").show();
	        	$("#btnKategorijaDiv").show();
			
			
			
		});
	}
}
function obrisiKategoriju(btn){
	$.ajax
	({
		url: 'rest/proizvodi/obrisiKategoriju',
		dataType : 'json',
		type : "POST",
		contentType:"application/json; charset=utf-8",
		data: JSON.stringify({
			naziv : btn.id
		})
	}).then(function(data)
	{
		
		popuniTabeluKategorija();
     	
     	popuniKategorijeCombo();
     	popuniTabeluProizvoda();
     	$().toastmessage('showSuccessToast', "Uspešno ste obrisali kategoriju!");
	});
}	
//Zalbe
function popuniTabeluZalbi(){
	$.ajax
	({
		url: 'rest/proizvodi/preuzmiZalbe',
		dataType : 'json',
		type : "POST",
		contentType:"application/json; charset=utf-8",
	}).then(function(data)
	{
		
		if(data!=null){
			$("#tabelaZalbe").show();
			$("#zalbePrazne").hide();
			
			$("#tabelaZalbe tbody").remove();
			var str="";
			data.forEach(function(item){
				
				str+="<tr class=\"record\"  >"+
				"<td class=\"overflow\"  >" + item.sifraKupovine + "</td>"+
				"<td class=\"overflow\"  >" + item.korisnik + "</td>"+
				"<td class=\"overflow\"  >" + item.sadrzajZalbe + "</td>"+
				
				"<td> <button class=\"btn btn-success last\" onclick=\"return prihvatiZalbu(this);\" id=\""+item.korisnik+"_"+item.sifraKupovine+"\"> " +
				"<span class=\"glyphicon glyphicon-success\"></span>Prihvati</button></td>"+
				"<td> <button class=\"btn btn-danger last\" onclick=\"return odbiZalbu(this);\" id=\""+item.korisnik+"_"+item.sifraKupovine+"_"+item.sadrzajZalbe+"\"> " +
				"<span class=\"glyphicon glyphicon-remove\"></span>Odbij</button></td>";
				
				str+="</tr>";
			
			});
			
			$("#tabelaZalbe").append( str);
		}else{
			$("#tabelaZalbe").hide();
			$("#zalbePrazne").show();
		}
		
	});
}

function prihvatiZalbu(btn){
	
	var kk = btn.id.split('_');
	var sifraKupca = kk[0];
	var sifraKupovine1 = kk[1];
	$.ajax
	({
		url: 'rest/proizvodi/prihvatiZalbu',
		dataType : 'json',
		type : "POST",
		contentType:"application/json; charset=utf-8",
		data: JSON.stringify({
			korisnik : sifraKupca,
			sifraKupovine: sifraKupovine1,
		})
	}).then(function(data)
	{
		$().toastmessage('showSuccessToast', "Uspešno ste prihvatili žalbu.");
		popuniTabeluZalbi();
	});
}

function odbiZalbu(btn){
	
	var kk = btn.id.split('_');
	var sifraKupca = kk[0];
	var sifraKupovine1 = kk[1];
	var sadrzaj=kk[2];
	$.ajax
	({
		url: 'rest/proizvodi/odbiZalbu',
		dataType : 'json',
		type : "POST",
		contentType:"application/json; charset=utf-8",
		data: JSON.stringify({
			korisnik : sifraKupca,
			sifraKupovine: sifraKupovine1,
			sadrzajZalbe : sadrzaj,
		})
	}).then(function(data)
	{
		$().toastmessage('showSuccessToast', "Uspešno ste odbili žalbu.");
		popuniTabeluZalbi();
	});
}

function dodajIzmeniDostavljaca(btn){
	$("#btnDostavljacDiv").hide();
	$("#tabelaDostavljaci").hide();
	$("#dodajIzmeniDostavljacaDiv").show();
	if(btn.id=="dodajDostavljacBtn"){
		$("#sifraDos").val("");
		$('#sifraDos').prop('readonly', false);
		$("#nazivDos").val("");
		$("#opisDos").val("");
		$("#zemljaDos").val("");
		$("#daniDos").val("");
		$("#drzaveSelect option").remove();
		$("#drzaveSelect").append("<option>Pogledaj drzave...</option>");
		$("#dimDos").val("");
		$("#kgDos").val("");
		$("#sacuvajDostavljacaBtn").attr('name','dodaj');
	}else{
		$("#sacuvajDostavljacaBtn").attr('name',btn.id);
		$.ajax
		({
			url: 'rest/proizvodi/preuzmiDostavljace',
			dataType : 'json',
			type : "POST"		
		}).then(function(data)
		{
			data.forEach(function(item){
				if(item.sifra==btn.id){
					$("#sifraDos").val(item.sifra);
					$('#sifraDos').prop('readonly', true);
					$("#nazivDos").val(item.naziv);
					$("#opisDos").val(item.opis);
					$("#zemljaDos").val("");
					$("#daniDos").val("");
					$("#drzaveSelect option").remove();
					$("#drzaveSelect").append("<option value=\"Pogledaj drzave...\">Pogledaj drzave...</option>");
					var i =0;
					item.drzavePoslovanja.forEach(function(item2){
						$("#drzaveSelect").append("<option>"+item2+","+item.trajanjeDostave[i]+"</option>");
						i++;
					});
					$("#dimDos").val(item.tarifaDim[0]+","+item.tarifaDim[1]+","+item.tarifaDim[2]);
					
					$("#kgDos").val(item.tarifaKg[0]+","+item.tarifaKg[1]+","+item.tarifaKg[2]);
				}
			});
			
		});
		
		
	}
	
}

function sacuvajDodajIzmeniDos(btn){
	if(proveriComboDrzava()==false)
		return false;
	var sifraDos = $("#sifraDos").val().trim();
	var nazivDos =$("#nazivDos").val().trim();
	var opisDos =$("#opisDos").val().trim();
	var dimenzijeDos =$("#dimDos").val().trim();
	var kgDos =$("#kgDos").val().trim();
	var drzave="";
	var i =0;
	$("#drzaveSelect option").each(function(){
			if(i!=0)
				drzave+=$(this).val()+"&";
			    // Add $(this).val() to your list
			i+=1;
	});
	
	if(btn.name=="dodaj"){
		$.ajax
		({
			url: 'rest/proizvodi/dodajNovoDostavljaca',
			dataType : 'json',
			type : "POST",
			contentType:"application/json; charset=utf-8",
			data: JSON.stringify({
				sifra : sifraDos,
				naziv: nazivDos,
				boja : opisDos,
				slika : dimenzijeDos,
				video :kgDos,
				datumAkcije :drzave
			})
		}).then(function(data)
		{
			if(data==false){
				$().toastmessage('showErrorToast', "Tkva šifra već postoji!");
			}else{
				$().toastmessage('showSuccessToast', "Uspešno ste dodali dostavljača.");
				popuniTabeluDostavljaca();
				prikaziDostavljace();
			}
			
			
		});
	}else{
		$.ajax
		({
			url: 'rest/proizvodi/izmeniDostavljaca',
			dataType : 'json',
			type : "POST",
			contentType:"application/json; charset=utf-8",
			data: JSON.stringify({
				sifra : sifraDos,
				naziv: nazivDos,
				boja : opisDos,
				slika : dimenzijeDos,
				video :kgDos,
				datumAkcije :drzave
			})
		}).then(function(data)
		{
				$().toastmessage('showSuccessToast', "Uspešno ste izmenili dostavljača.");
				popuniTabeluDostavljaca();
				prikaziDostavljace();
		});
	}
		
}

function obrisiDostavljaca(btn){
	$.ajax
	({
		url: 'rest/proizvodi/obrisiDostavljaca',
		dataType : 'json',
		type : "POST",
		contentType:"application/json; charset=utf-8",
		data: JSON.stringify({
			sifra : btn.id
		})
	}).then(function(data)
	{
			$().toastmessage('showSuccessToast', "Uspešno ste obrisali dostavljača.");
			popuniTabeluDostavljaca();
			prikaziDostavljace();
	});
}
function proveriComboDrzava(){
	var ret = $("#sifraDos").val().trim()!=0 
		&& $("#nazivDos").val().trim()!=0
		&& $("#opisDos").val().trim()!=0
		&& $("#dimDos").val().trim()!=0
		&& $("#kgDos").val().trim()!=0;
	if(ret==false){
		$().toastmessage('showErrorToast', "Morate popuniti sva polja!");
		return false;
	}
	
	var len = $('#drzaveSelect').children('option').length;
	if(len<2){
		$().toastmessage('showErrorToast', "Nemate ni jednu unetu državu");
		return false;
	}
	check_num = /^[0-9_]{1,10}[.]{0,1}[0-9_]{0,10}[,]{1}[0-9_]{1,10}[.]{0,1}[0-9_]{0,10}[,]{1}[0-9_]{1,10}[.]{0,1}[0-9_]{0,10}$/;
	if(!check_num.test($("#dimDos").val().trim())){
		$().toastmessage('showErrorToast', "Cene moraju biti u formatu: x,x,x");
		return false;
	}
	if(!check_num.test($("#kgDos").val().trim())){
		$().toastmessage('showErrorToast', "Cene moraju biti u formatu: x,x,x");
		return false;
	}
}

function dodajDrzavuUCobmo(){
	var drz=$("#zemljaDos").val().trim();
	var dani=$("#daniDos").val().trim();
	if(drz.lenght==0 || dani.length==0){
		$().toastmessage('showErrorToast', "Polja država i dan ne smeju biti prazni!");
		return false;
	}
	check_num = /^[0-9_]{1,20}$/;
	if(!check_num.test(dani)){
		$().toastmessage('showErrorToast', "Dani moraju biti broj!");
		return false;
	}
	
	$("#drzaveSelect").append("<option>"+drz+","+dani+"</option>");
	$("#zemljaDos").val("");
	$("#daniDos").val("");
}
function obrisiSelektovanuDrzavu(){
	 var s= $("#drzaveSelect").find('option:selected').val();
	 if(s!="Pogledaj drzave...")
		 $("#drzaveSelect").find('option:selected').remove();
}




function uploadSlika(files){
	File.prototype.convertToBase64 = function(callback){
	    var reader = new FileReader();
	    reader.onload = function(e) {
	         callback(e.target.result)
	    };
	    reader.onerror = function(e) {
	         callback(null);
	    };        
	    reader.readAsDataURL(this);
	};
	
	files[0].convertToBase64(function(base64){
		$.ajax
		({
			url: 'rest/proizvodi/upload',
			dataType : 'json',
			type : "POST",
			contentType:"application/json; charset=utf-8",
			data: JSON.stringify(base64)
		}).then(function(data)
		{
//			uploadFactory.upload(base64).success(function(data){
//				alert("cao bella");
//			});
			//alert(data.sifra);
			$("#slikaPro").attr('name',data.sifra);
			//alert($("#slikaPro").attr("name"));
		});
//                     
//           $scope.product.slike.push(data);
//        	 alert(data);
//           $scope.status="Complete";
//        });
	});
}
function popuniTabeluKorisnika(){
	$.ajax
	({
		url: 'rest/proizvodi/preuzmiKorisnike',
		dataType : 'json',
		type : "POST"		
	}).then(function(data)
	{
		
			
			$("#tabelaKorisnici tbody").remove();

			
			
			var str="";
			data.forEach(function(item){
					if(item.korisnickoIme!="defaultProdavac"){
						str+="<tr class=\"record\" id=\""+item.korisnickoIme+"\"  >"+
						"<td class=\"overflow\" id=\"td"+item.korisnickoIme +"\" >" + item.korisnickoIme + "</td>"+
						"<td class=\"overflow\" id=\"td"+item.korisnickoIme +"\" >" + item.lozinka + "</td>"+
						"<td class=\"overflow\" id=\"td"+item.korisnickoIme +"\" >" + item.ime + "</td>"+
						"<td class=\"overflow\" id=\"td"+item.korisnickoIme +"\" >" + item.prezime + "</td>"+
						"<td class=\"overflow\" id=\"td"+item.korisnickoIme +"\" >" + item.telefon + "</td>"+
						"<td class=\"overflow\" id=\"td"+item.korisnickoIme +"\" >" + item.email + "</td>"+
						"<td class=\"overflow\" id=\"td"+item.korisnickoIme +"\" >" +item.adresa+"</td>"+
						"<td class=\"overflow\" id=\"td"+item.korisnickoIme +"\" >" + item.drzava + "</td>"+
						"<td class=\"overflow\" id=\"td"+item.korisnickoIme +"\" >" + item.uloga + "</td>"+
						"<td> <button class=\"btn btn-danger last\" onclick=\"obrisiKorisnika(this);\" id=\""+item.korisnickoIme+"\"> " +
						"<span class=\"glyphicon glyphicon-remove\"></span>Obriši</button></td>";
					}
				
			});
			$("#tabelaKorisnici").append( str);
		
		
	});
}

function obrisiKorisnika(user){
	
	$.ajax
	({
		url: 'rest/proizvodi/obrisiKorisnika',
		dataType : 'json',
		type : "POST",
		contentType:"application/json; charset=utf-8",
		data: JSON.stringify({
			korisnickoIme : user.id,
		})
	}).then(function(data)
	{
			$().toastmessage('showSuccessToast', "Uspešno ste obrisali korisnika.");
			popuniTabeluKorisnika();
			if(data==2){
				$().toastmessage('showWarningToast', "Molimo da vas da prometnite prodavce da odgovarajuće prodavnice");
				popuniTabeluProdavnica();
			}
			
	});
}

function dodajKorisnika(btn){
	$("#btnKorisnikDiv").hide();
	$("#tabelaKorisnici").hide();
	$("#dodajKorisnikaDiv").show();
	 $("#greskaReg").hide();
	 resetReg();
}


function validacijaReg(){
	
    var ret= $("#korisnickoIme").val().trim().length != 0
	&& $("#sifra").val().trim().length != 0
	&& $("#ime").val().trim().length != 0
	&& $("#prezime").val().trim().length != 0
	&& $("#telefon").val().trim().length != 0
	&& $("#email").val().trim().length != 0
    && $("#adresa").val().trim().length != 0
	&& $("#drzava").val().trim().length != 0;
    
    if(ret == false)
    {
    	$("#greskaReg").show();
        return false;
    }
    
    check_mail = /^[A-Za-z]{1}[A-Za-z0-9_]{0,20}[@]{1}[a-z.]{1,20}$/;
	check_num = /^[0-9_]{8,12}$/;

	if(!check_num.test($("#telefon").val().trim())){
		$().toastmessage('showErrorToast', "Telefon mora da sadrži samo brojeve [8-12]");
		return false;
	}
	if(!check_mail.test($("#email").val().trim())){
		$().toastmessage('showErrorToast', "Email nije validan!");
		return false;
	}
	var u =$("#ulogaSelect").find('option:selected').val();
 
    $.ajax
	({
		url: 'rest/proizvodi/registracija',
		dataType: 'json',
		type : "POST",		
		contentType:"application/json; charset=utf-8",
		data: JSON.stringify({
			korisnickoIme : $("#korisnickoIme").val(),
			lozinka : $("#sifra").val(),
			ime : $("#ime").val(),
			prezime : $("#prezime").val(),
			telefon : $("#telefon").val(),
			email : $("#email").val(),
			adresa : $("#adresa").val(),
			drzava : $("#drzava").val(),
			uloga: u,
		}),
	}).then(function(data)
	{
		if(data == true){
			$().toastmessage('showSuccessToast', "Uspešno ste se registrovali...");
			popuniTabeluKorisnika();
			prikaziKorisnike();
		}else{
			$().toastmessage('showErrorToast', "Već postoji takvo korisničko ime, molimo Vas da unesete ponovo...");
		}
	});
    return true;
}
function sakrijGreskuReg(){
	  $("#greskaReg").hide();
}

function resetReg(){
    
	$("#korisnickoIme").val("");
	$("#sifra").val("");
	$("#ime").val("");
	$("#prezime").val("");
	$("#telefon").val("");
	$("#email").val("");
	$("#adresa").val("");
	$("#drzava").val("");

}
