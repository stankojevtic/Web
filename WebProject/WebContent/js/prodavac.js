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

function prikaziProdavnice(){
	$("#prodavniceDiv").show();
	$("#akcijeProizvodaDiv").hide();
	$("#akcijeKategorijaDiv").hide();
	$("#proizvodiDiv").hide();
	$("#izmenaProdavniceDiv").hide();
	$("#tabelaProdavnice").show();
}
function prikaziProzivode(){
	$("#prodavniceDiv").hide();
	$("#akcijeProizvodaDiv").hide();
	$("#akcijeKategorijaDiv").hide();
	$("#proizvodiDiv").show();
	//pod divovi
	$("#dodajIzmeniProizvodDiv").hide();
	$("#divPretragaProizvoda").show();
	$("#tabelaPrikaz").show();
}
function prikaziAkcijePoizvoda(){
	$("#prodavniceDiv").hide();
	$("#akcijeProizvodaDiv").show();
	//praznimo polja
	$("#datumProOd").val("");
	$("#datumProDo").val("");
	$("#popustPro").val("");
	$('#proizvodiComboSelect option').eq(0).prop('selected', true);
	
	$("#akcijeKategorijaDiv").hide();
	$("#proizvodiDiv").hide();
}

function prikaziAkcijeKategorija(){
	$("#prodavniceDiv").hide();
	$("#akcijeProizvodaDiv").hide();
	$("#akcijeKategorijaDiv").show();
	//praznimo polja
	$("#datumKatOd").val("");
	$("#datumKatDo").val("");
	$("#popustKat").val("");
	$('#kategorijaComboSelect option').eq(0).prop('selected', true);
	
	$("#proizvodiDiv").hide();
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
			//$("#korisnikNaslov").text("Admin: " +data.ime+" " + data.prezime);
			window.location= "admin.html";
		}else if(data.uloga=="Kupac"){
			window.location= "korisnik.html";
			//$("#korisnikNaslov").text("Kupac: "+data.ime+" " + data.prezime);
		}else if(data.uloga=="Prodavac"){
			$("#prodavacNaslov").append("Prodavac:<br>"+data.ime+" " + data.prezime);
		}
	});	
}
function popuniTabeluProizvoda(){
	
	$.ajax
	({
		url: 'rest/proizvodi/preuzmiProizvodeProdavca',
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
								"<img   src=\""+item.slika+"\"  style=\"border:2px solid lightblue;width:200px;height:200px;border-radius: 10px;\"  align=\"left\"  />"+
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
								if(trenKorisnik===item2.korisnik.korisnickoIme){
									str+="<button type=\"button\" class=\"btn btn-danger active\" id=\""+item2.sifra+"?"+item.sifra+"\" onclick=\"obrisiRecenziju(this)\" style=\"float: right;\">\r\n" + 
									"          <span class=\"glyphicon glyphicon-remove\"></span>\r\n" + 
									"</button>";
								}
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

function pretragaProizvodi(){
	popuniTabeluProizvoda();
	
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

function popuniTabeluProdavnica(){
	$.ajax
	({
		url: 'rest/proizvodi/preuzmiProdavniceProdavac',
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
					"<td class=\"overflow\" id=\"td"+item.sifra +"\" onclick=\"myFunClick(this)\">" + item.recenzija + "</td>"+
					"<td class=\"overflow\" id=\"td"+item.sifra +"\" onclick=\"myFunClick(this)\">" + item.telefon + "</td>"+
					"<td> <button class=\"btn btn-warning last\" onclick=\"izmeniProdavnicu(this);\" id=\""+item.sifra+"\"> " +
					"<span class=\"glyphicon glyphicon-pencil\"></span>Izmeni</button></td>";
				}
				
			});
			$("#tabelaProdavnice").append( str);
		}
		
	});
}

function izmeniProdavnicu(btn){
	
	$("#izmenaProdavniceDiv").show();
	$("#tabelaProdavnice").hide();
	
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
		$("#nazivProdavnice").val(data.naziv);
		$("#adresaProdavnice").val(data.adresa);
		$("#drzavaProdavnice").val(data.drzava);
		$("#emailProdavnice").val(data.email);
		$("#ocenaProdavnice").val(data.ocena);
		$("#telefonProdavnice").val(data.telefon);
			
	});
	
}

function sacuvajIzmenuProdavnice(){
	var ret= $("#sifraProdavnice").val().trim().length != 0
	&& $("#nazivProdavnice").val().trim().length != 0
	&& $("#adresaProdavnice").val().trim().length != 0
	&& $("#drzavaProdavnice").val().trim().length != 0
	&& $("#emailProdavnice").val().trim().length != 0
    && $("#ocenaProdavnice").val().trim().length != 0
	&& $("#telefonProdavnice").val().trim().length != 0;
    
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
		})
	}).then(function(data)
	{
		$().toastmessage('showSuccessToast', "Uspešno ste izmenili prodavnicu");
		popuniTabeluProdavnica();
		prikaziProdavnice();
	});
	
}

function popuniDostavljaceCombo(){
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
	});		
}
function popuniProdavniceCombo(){
	
	$.ajax
	({
		url: 'rest/proizvodi/preuzmiProdavniceProdavac',
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

function popuniProizvodAkcijaCombo(){
	
	$.ajax
	({
		url: 'rest/proizvodi/preuzmiProizvodeProdavca',
		dataType : 'json',
		type : "POST"		
	}).then(function(data)
	{	if(data!=null){
			$("#proizvodiComboSelect").remove();
			
			$("#proizvodiComboDiv").append("<select onchange=\"promenaProizvodAkcija(this)\" id=\"proizvodiComboSelect\" style=\"width: 280px\">");
			$("#proizvodiComboSelect").append("<option value=\""+"izaberi"+"\">"+"Izaberite proizvod..."+"</option>");
			data.forEach(function(item){
					$("#proizvodiComboSelect").append("<option value=\""+item.sifra+"\">"+item.naziv+"</option>");
			});
			$("#proizvodiComboDiv").append("</select>");
		}
	});
}
function popuniKategorijaAkcijaCombo(){
	
	$.ajax
	({
		url: 'rest/proizvodi/preuzmiKategorije',
		dataType : 'json',
		type : "POST"		
	}).then(function(data)
	{	if(data!=null){
			$("#kategorijaComboSelect").remove();
			
			$("#kategorijaComboDiv").append("<select onchange=\"promenaKatAkcija(this)\" id=\"kategorijaComboSelect\" style=\"width: 280px\">");
			$("#kategorijaComboSelect").append("<option value=\""+"izaberi"+"\">"+"Izaberite proizvod..."+"</option>");
			data.forEach(function(item){
					$("#kategorijaComboSelect").append("<option value=\""+item.naziv+"\">"+item.naziv+"</option>");
			});
			$("#kategorijaComboDiv").append("</select>");
		}
	});
}


//za akcije 
function dodajAkcijuProizvod(btn){
	if(btn.name=="izaberi"){
		$().toastmessage('showErrorToast', "Proizvod nije izabran!");
		return false;
	}
	check_date = /^[0-9_]{1,2}[.]{1}[0-9_]{1,2}[.]{1}[0-9_]{4}[.]{1}$/;
	if(!check_date.test($("#datumProOd").val().trim())){
		$().toastmessage('showErrorToast', "Formati datuma od mora biti: DD.MM.GGGG.");
		return false;
	}
	var datumOd =$("#datumProOd").val().trim();
	var pom1 = datumOd.split('.');
	
	if(pom1[0]=="0" || pom1[0]=="00"){
		$().toastmessage('showErrorToast', "Ne može dan da bude 0!");
		return false;
	}
	if(pom1[1]=="0" || pom1[1]=="00"){
		$().toastmessage('showErrorToast', "Ne može mesec da bude 0!");
		return false;
	}
	if( pom1[2]=="0000"){
		$().toastmessage('showErrorToast', "Ne može godina da bude 0000!");
		return false;
	}
	
	
	check_date = /^[0-9_]{1,2}[.]{1}[0-9_]{1,2}[.]{1}[0-9_]{4}[.]{1}$/;
	if(!check_date.test($("#datumProDo").val().trim())){
		$().toastmessage('showErrorToast', "Formati datuma do mora biti: DD.MM.GGGG.");
		return false;
	}
	
	var datumDo =$("#datumProDo").val().trim();
	var pom2 = datumDo.split('.');
	if(pom2[0]=="0" || pom2[0]=="00"){
		$().toastmessage('showErrorToast', "Ne može dan da bude 0!");
		return false;
	}
	if(pom2[1]=="0" || pom2[1]=="00"){
		$().toastmessage('showErrorToast', "Ne može mesec da bude 0!");
		return false;
	}
	if( pom2[2]=="0000"){
		$().toastmessage('showErrorToast', "Ne može godina da bude 0000!");
		return false;
	}
	
	if(parseFloat(pom1[2])>parseFloat(pom2[2])){
		$().toastmessage('showErrorToast', "Prvi datum mora biti veći od drugog!");
		return false;
	}else if(parseFloat(pom1[2])==parseFloat(pom2[2])){
		if(parseFloat(pom1[1])>parseFloat(pom2[1])){
			$().toastmessage('showErrorToast', "Prvi datum mora biti veći od drugog!");
			return false;
		}else if(parseFloat(pom1[1])==parseFloat(pom2[1])){
			if(parseFloat(pom1[0])>parseFloat(pom2[0])){
				$().toastmessage('showErrorToast', "Prvi datum mora biti veći od drugog!");
				return false;
			}
		}
	}
	
	check_action = /^[0-9_]{1,2}$/;
	
	if($("#popustPro").val().trim()=="0" ||$("#popustPro").val().trim()=="00" ){
		$().toastmessage('showErrorToast', "Popust mora da bude od 1 do 99%!");
		return false;
	}
	
	if(!check_action.test($("#popustPro").val().trim())){
		$().toastmessage('showErrorToast', "Popust mora da bude od 1 do 99%!");
		return false;
	}	
	
	var selektovaniProizvod=$("#proizvodiComboSelect").find('option:selected').val();
	var datumi = datumOd+"&"+datumDo;
	var akcija1 = $("#popustPro").val().trim();
	$.ajax
	({
		url: 'rest/proizvodi/dodajPopustNaProizvod',
		dataType : 'json',
		type : "POST",
		contentType:"application/json; charset=utf-8",
		data: JSON.stringify({
			sifra : selektovaniProizvod,
			datumAkcije : datumi,
			akcija: akcija1,
		})
	}).then(function(data)
	{
		$().toastmessage('showSuccessToast', "Uspešno ste dodali akciju!");
		popuniTabeluProizvoda();
		$("#datumProOd").val("");
		$("#datumProDo").val("");
		$("#popustPro").val("");
		$('#proizvodiComboSelect option').eq(0).prop('selected', true);
	});

}

function dodajAkcijuKategorija(btn){
	if(btn.name=="izaberi"){
		$().toastmessage('showErrorToast', "Kategorija nije izabran!");
		return false;
	}
	check_date = /^[0-9_]{1,2}[.]{1}[0-9_]{1,2}[.]{1}[0-9_]{4}[.]{1}$/;
	if(!check_date.test($("#datumKatOd").val().trim())){
		$().toastmessage('showErrorToast', "Formati datuma od mora biti: DD.MM.GGGG.");
		return false;
	}
	var datumOd =$("#datumKatOd").val().trim();
	var pom1 = datumOd.split('.');
	
	if(pom1[0]=="0" || pom1[0]=="00"){
		$().toastmessage('showErrorToast', "Ne može dan da bude 0!");
		return false;
	}
	if(pom1[1]=="0" || pom1[1]=="00"){
		$().toastmessage('showErrorToast', "Ne može mesec da bude 0!");
		return false;
	}
	if( pom1[2]=="0000"){
		$().toastmessage('showErrorToast', "Ne može godina da bude 0000!");
		return false;
	}
	
	
	check_date = /^[0-9_]{1,2}[.]{1}[0-9_]{1,2}[.]{1}[0-9_]{4}[.]{1}$/;
	if(!check_date.test($("#datumKatDo").val().trim())){
		$().toastmessage('showErrorToast', "Formati datuma do mora biti: DD.MM.GGGG.");
		return false;
	}
	
	var datumDo =$("#datumKatDo").val().trim();
	var pom2 = datumDo.split('.');
	if(pom2[0]=="0" || pom2[0]=="00"){
		$().toastmessage('showErrorToast', "Ne može dan da bude 0!");
		return false;
	}
	if(pom2[1]=="0" || pom2[1]=="00"){
		$().toastmessage('showErrorToast', "Ne može mesec da bude 0!");
		return false;
	}
	if( pom2[2]=="0000"){
		$().toastmessage('showErrorToast', "Ne može godina da bude 0000!");
		return false;
	}
	
	if(parseFloat(pom1[2])>parseFloat(pom2[2])){
		$().toastmessage('showErrorToast', "Prvi datum mora biti veći od drugog!");
		return false;
	}else if(parseFloat(pom1[2])==parseFloat(pom2[2])){
		if(parseFloat(pom1[1])>parseFloat(pom2[1])){
			$().toastmessage('showErrorToast', "Prvi datum mora biti veći od drugog!");
			return false;
		}else if(parseFloat(pom1[1])==parseFloat(pom2[1])){
			if(parseFloat(pom1[0])>parseFloat(pom2[0])){
				$().toastmessage('showErrorToast', "Prvi datum mora biti veći od drugog!");
				return false;
			}
		}
	}
	
	check_action = /^[0-9_]{1,2}$/;
	
	if($("#popustKat").val().trim()=="0" ||$("#popustKat").val().trim()=="00" ){
		$().toastmessage('showErrorToast', "Popust mora da bude od 1 do 99%!");
		return false;
	}
	
	if(!check_action.test($("#popustKat").val().trim())){
		$().toastmessage('showErrorToast', "Popust mora da bude od 1 do 99%!");
		return false;
	}	
	
	var selektovanaKategorija=$("#kategorijaComboSelect").find('option:selected').val();
	var datumi = datumOd+"&"+datumDo;
	var akcija1 = $("#popustKat").val().trim();
	$.ajax
	({
		url: 'rest/proizvodi/dodajKategorijuNaPopust',
		dataType : 'json',
		type : "POST",
		contentType:"application/json; charset=utf-8",
		data: JSON.stringify({
			sifra : selektovanaKategorija,
			datumAkcije : datumi,
			akcija: akcija1,

		})
	}).then(function(data)
	{
		if(data==false){
			$().toastmessage('showWarningToast', "Nemate proizvoda sa izabranom kategorijom...");
		}else{
			$().toastmessage('showSuccessToast', "Uspešno ste dodali akciju.");
			popuniTabeluProizvoda();
			$("#datumKatOd").val("");
			$("#datumKatDo").val("");
			$("#popustKat").val("");
			$('#kategorijaComboSelect option').eq(0).prop('selected', true);
		}
		
	});
}


function promenaProizvodAkcija(data){
	var selektovaniProizvod=$("#proizvodiComboSelect").find('option:selected').val();
	$("#btnAkcijaPro").prop('name', selektovaniProizvod);
}
function promenaKatAkcija(data){
	var selektovanaKat=$("#kategorijaComboSelect").find('option:selected').val();
	$("#btnAkcijaKat").prop('name', selektovanaKat);	
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

