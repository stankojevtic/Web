function prikaziIstorijuKupovine(){
	$.ajax({
		url: 'rest/proizvodi/preuzmiListuIstorijeKorisnika'	,
		dataType: 'json',
		type : "POST",		
		contentType:"application/json; charset=utf-8"
	}).then(function(data){
		if(data == null )
		{
			$("#unesiZalbu").hide();
			$("#tabelaDiv").hide();
			$("#listaDiv").hide();
			$("#korpaDiv").hide();
		    $("#tabelaKorpa").hide();
		    $("#korpaPrazna").hide();
		    $("#korpaDugmici").hide();
		    $("#divRacun").hide();
		    $("#dostavaText").hide();
		    $("#istorijaDiv").show();
		    $("#tabelaIstorija").hide();
		    $("#istorijaPrazna").show();
		    $("#poljaZaKupovine").hide();
		    $("#nalogDiv").hide();
		}else {
			$("#unesiZalbu").hide();
			$("#tabelaDiv").hide();
			$("#listaDiv").hide();
			$("#korpaDiv").hide();
		    $("#tabelaKorpa").hide();
		    $("#korpaPrazna").hide();
		    $("#korpaDugmici").hide();
		    $("#divRacun").hide();
		    $("#dostavaText").hide();
		    $("#istorijaDiv").show();
		    $("#tabelaIstorija").show();
		    $("#istorijaPrazna").hide();
		    $("#poljaZaKupovine").show();
		    $("#nalogDiv").hide();
		    //popuniTabeluIstorijat();
		}
	});	
	
	
}




function prikaziKorpu(){
	
	$.ajax({
		url: 'rest/proizvodi/preuzmiKorpu'	,
		dataType: 'json',
		type : "POST",		
		contentType:"application/json; charset=utf-8"
	}).then(function(data){
		if(data == null )	//ako se niko nije ulogovao
		{
			$("#tabelaDiv").hide();
			$("#listaDiv").hide();
			$("#korpaDiv").show();
		    $("#tabelaKorpa").hide();
		    $("#korpaPrazna").show();
		    $("#korpaDugmici").hide();
		    $("#divRacun").hide();
		    $("#dostavaText").hide();
		    $("#istorijaDiv").hide();
		    $("#nalogDiv").hide();
		    popuniDostavljace();
		}else {
			$("#tabelaDiv").hide();
			 $("#listaDiv").hide();
			$("#korpaDiv").show();
		    $("#tabelaKorpa").show();
		    $("#korpaPrazna").hide();
		    $("#korpaDugmici").show();
		    $("#divRacun").hide();
		    $("#dostavaText").hide();
		    $("#istorijaDiv").hide();
		    $("#nalogDiv").hide();
		    popuniDostavljace();
		}
		total();
	});	
	
	 
}
function prikaziListu(){
	 $("#tabelaDiv").hide();
     $("#korpaDiv").hide();
     $("#listaDiv").show();
     $("#istorijaDiv").hide();
     $("#nalogDiv").hide();
}

function prikaziTabele(){
	 $("#tabelaDiv").show();
     $("#korpaDiv").hide();
     $("#listaDiv").hide();
     $("#istorijaDiv").hide();
     $("#nalogDiv").hide();
}

function prikaziNalog(){
	 $("#tabelaDiv").hide();
    $("#korpaDiv").hide();
    $("#listaDiv").hide();
    $("#istorijaDiv").hide();
    $("#nalogDiv").show();

}

function nalog(){
	prikaziNalog();
	$.ajax
	({
		url: 'rest/proizvodi/proveraLogovanja',
		dataType: 'json',
		type : "POST",		
		contentType:"application/json; charset=utf-8",
		
	}).then(function(data){
		
		$("#korisnickoIme").val(data.korisnickoIme);
		$('#korisnickoIme').prop('readonly', true);
		$("#sifra").val(data.lozinka);
		$("#ime").val(data.ime);
		$("#prezime").val(data.prezime);
		$("#telefon").val(data.telefon);
		$("#email").val(data.email);
		$("#adresa").val(data.adresa);
		$("#drzava").val(data.drzava);
		
	});
}


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
			window.location= "admin.html";
		}else if(data.uloga=="Prodavac"){			
			window.location= "prodavac.html";
		}else if(data.uloga=="Kupac"){
			$("#korisnikNaslov").append("<br><br>"+data.ime+" " + data.prezime);
		}
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
					str="<tr class=\"record\"  id=\""+item.sifra+"\"  >"+
					"<td class=\"overflow\"  id=\"tdSifra"+item.sifra +"\" onclick=\"myFunClick(this)\" ><span id=\"span"+item.sifra +"\"></span>"+"</td>"+
					"<td class=\"overflow\" id=\"td"+item.sifra +"\" onclick=\"myFunClick(this)\">" + item.naziv + "</td>"+
					"<td class=\"overflow\" id=\"td"+item.sifra +"\" onclick=\"myFunClick(this)\">" + item.nazivProizvodjaca + "</td>"+
					"<td class=\"overflow\" id=\"td"+item.sifra +"\" onclick=\"myFunClick(this)\">" + item.kategorija.naziv + "</td>"+
					"<td class=\"overflow\" id=\"td"+item.sifra +"\" onclick=\"myFunClick(this)\">" + item.prodavnica.naziv + "</td>"+
					"<td class=\"overflow\" id=\"td"+item.sifra +"\" onclick=\"myFunClick(this)\">" + item.jedinicnaCena.toFixed(2) + "</td>"+
					"<td class=\"overflow\" id=\"td"+item.sifra +"\" onclick=\"myFunClick(this)\">" + popust + datumPopusta+"</td>"+
					"<td class=\"overflow\" id=\"td"+item.sifra +"\" onclick=\"myFunClick(this)\">" + item.kolicinaUMagacinu + "</td>"+
					"<td class=\"overflow\"> " + "<input  type=\"number\" value=\"\"  id=\""+item.sifra+"Count\" style=\"width:80%;\"> " + "</td>"+
					
					
					"<td> <button  onclick=\"kupiProizvod(this);\" id=\""+item.sifra+"\"> " +
							"<span class=\"glyphicon glyphicon-shopping-cart\"></span>Dodaj u korpu </button></td>"+
					"</tr>" +
					"<tr class=\"companion\">"+
						"<td class=\"output\" style=\"height:100px;\"  colspan=\"10\">"+
						"<div style=\"height:230px;overflow-y: scroll;\">"+
							"<div   style=\"height:230px;\">" +
								"<span >" +
								"<font   size=\"2\"> " +
								"</br> </br> Boja: "+item.boja +" <br><br>"+
								"<img align=\"right\"  src=\""+item.slika+"\"  style=\"width:150px;height:150px;border-radius: 10px;\"   />"+
								" Dimenzije: "+item.dimenzije +" m2 <br><br>"+
								" Težina: "+item.tezina +" kg <br><br>"+
								" Zemlja: "+item.zemljaProizvodnje +"<br><br>"+
								"<br>&nbsp;&nbsp<button onclick=\"dodajUListuZelja(this);\" id=\""+item.sifra+"\"> " +
								"<span class=\"glyphicon glyphicon-heart\"></span>Dodaj</button>"+
										"</font>";
					
								str+="</span>"+
							"</div>";
							
							item.recenzije.forEach(function(item2){
								
							});
							
						
			
					str+="</div></td>"+
					"</tr>"
				
					
					
						
					$("#tabelaPrikaz").append( str);
					proizvodPreporucen(item);

					}
				});
				
				

			});

		}
		
	});

}


function dodajUListuZelja(btn){
	$.ajax
	({
		url: 'rest/proizvodi/dodajListuZelja',
		type : "POST",		
		contentType:"application/json; charset=utf-8",
		dataType : 'json',
		
		data: JSON.stringify({
			sifra : btn.id
		})
	}).then(function(data){
			if(data==true)
			{
				popuniTabeluZelja();
				$().toastmessage('showSuccessToast', "Uspešno ste dodali proizvod u listu želja.");
			}
			else
			{
				$().toastmessage('showWarningToast', "Ovaj proizvod već postoji u listi želja!");
			}
	});
}

function popuniTabeluZelja(){
	$.ajax({
		url: 'rest/proizvodi/preuzmiListuZelja'	,
		type : "POST",		
		contentType:"application/json; charset=utf-8",
		dataType : 'json',
	}).then(function(data){
		if(data==null){
			$("#listaZeljaPrazna").show();
			$("#tabelaListaZelja").hide();
			
		}else{
			$("#listaZeljaPrazna").hide();
			$("#tabelaListaZelja").show();

			$("#tabelaListaZelja tbody").remove();
			
			data.forEach(function(item){
				
					
					if(item.akcija!=0){
						var popust=item.akcija;
						var datumi=item.datumAkcije.split("&");
						var odDatuma=datumi[0];
						var doDatuma=datumi[1];
						var datumPopusta="%<br>od "+odDatuma+"<br>do "+doDatuma;
						$().toastmessage('showNoticeToast', item.naziv + " je u listi želja i na akciji je!");
						$("#tabelaListaZelja").append("<tr class=\"record\">"+
								"<td class=\"overflow\">" + item.sifra + "</td>"+
								"<td class=\"overflow\">" + item.naziv + "</td>"+
								"<td class=\"overflow\">" + item.nazivProizvodjaca + "</td>"+
								"<td class=\"overflow\">" + item.kategorija.naziv + "</td>"+
								"<td class=\"overflow\">" + item.prodavnica.naziv + "</td>"+
								"<td class=\"overflow\">" + item.jedinicnaCena.toFixed(2) + "</td>"+
								"<td class=\"overflow\"> " + "<input  type=\"number\" value=\"\"   id=\"listaDodaj"+item.sifra+"Count\" style=\"width:80%;\"> " + "</td>"+
								"<td class=\"overflow\">" + item.akcija+""+datumPopusta + "</td>"+
								"<td> <button  onclick=\"kupiProizvod(this);\" id=\"listaDodaj?"+item.sifra+"\"> " +
								
								"<span></span>Dodaj u korpu </button></td>"+
								"<td> <button class=\"btn btn-danger \" onclick=\"ukloniProizvodListaZelja(this);\" id=\""+item.sifra+"\"> " +
								"<span class=\"glyphicon glyphicon-remove\"></span></button></td>"+		
								
								"</tr>" 
						);
					}else{
						$("#tabelaListaZelja").append("<tr class=\"record\">"+
								"<td class=\"overflow\">" + item.sifra + "</td>"+
								"<td class=\"overflow\">" + item.naziv + "</td>"+
								"<td class=\"overflow\">" + item.nazivProizvodjaca + "</td>"+
								"<td class=\"overflow\">" + item.kategorija.naziv + "</td>"+
								"<td class=\"overflow\">" + item.prodavnica.naziv + "</td>"+
								"<td class=\"overflow\">" + item.jedinicnaCena.toFixed(2) + "</td>"+
								"<td class=\"overflow\"> " + "<input  type=\"number\" value=\"\"   id=\"listaDodaj"+item.sifra+"Count\" style=\"width:80%;\"> " + "</td>"+
								"<td class=\"overflow\">" + "Nema Akcije" + "</td>"+
								"<td> <button onclick=\"kupiProizvod(this);\" id=\"listaDodaj?"+item.sifra+"\"> " +
								
								"<span class=\"glyphicon glyphicon-shopping-cart\"></span>Dodaj u korpu </button></td>"+
								"<td> <button onclick=\"ukloniProizvodListaZelja(this);\" id=\""+item.sifra+"\"> " +
								"<span class=\"glyphicon glyphicon-remove\"></span>Ukloni</button></td>"+		
								
								"</tr>" 
								 );
					}
				
					
					
			});
			
			
		}
		

	});	
}

function ukloniProizvodListaZelja(btn){
	$.ajax
	({
		url: 'rest/proizvodi/ukloniSaListeZelja',
		type : "POST",		
		contentType:"application/json; charset=utf-8",
		dataType : 'json',
		
		data: JSON.stringify({
			sifra : btn.id
		})
	}).then(function(data){
		$().toastmessage('showSuccessToast', "Proizvod uklonjen sa liste želja.");
		if(data===false){
			$("#listaZeljaPrazna").show();
			$("#tabelaListaZelja").hide();	
		}else{
			popuniTabeluZelja();
		}
		
//		if(data==false){
//			$("#listaZeljaPrazna").show();
//			$("#tabelaListaZelja").hide();
//		}else{
//			$("#listaZeljaPrazna").hide();
//			$("#tabelaListaZelja").show();
//		}
			
		
	});
	
}



	


function popuniDostavljace(){
	$.ajax({
		url: 'rest/proizvodi/preuzmiDostavljace'	,
		type : "POST",		
		contentType:"application/json; charset=utf-8",
		dataType : 'json',
	}).then(function(data){
		$("#dostavaSelect").remove();
		$("#dostavaSpan").append("<select id=\"dostavaSelect\" onchange=\"changeSelectDostava()\">");
		$("#dostavaSelect").append("<option value=\""+"izaberi"+"\">"+"Pogledajte cene dostavljača"+"</option>");
		data.forEach(function(item){
				$("#dostavaSelect").append("<option value=\""+item.sifra+"\">"+item.naziv+"</option>");
		});
		$("#dostavaSpan").append("</select>");
	});	
}



function kupiProizvod(btn)
{
	var komanda;
	var sifra;

	if (btn.id.match("^listaDodaj")) {
		var kljucevi = btn.id.split('?');
		sifra=kljucevi[1];
		komanda = $("#listaDodaj"+sifra+"Count").val().trim();
		
	}else{
		komanda = $("#"+btn.id+"Count").val().trim();
		sifra=btn.id;
	}
	check_num = /^[1-9_]{1}[0-9_]{0,20}$/;
	if(!check_num.test(komanda))
	{
		$().toastmessage('showWarningToast', "Polje za količinu nije validno!");

	}else
	{	
		
		$.ajax
		({
			url: 'rest/proizvodi/kupiProizvod',
			type : "POST",		
			contentType:"application/json; charset=utf-8",
			dataType : 'json',
			
			data: JSON.stringify({
				sifra : sifra,
				kolicinaUMagacinu : komanda
			})
		}).then(function(data){
				if(data!=null)
				{

					popuniTabeluProizvoda();
					popuniTabeluProizvodaKorpe();
					
					total();
					$("#listaDodaj"+sifra+"Count").val("");
					//showSuccessToast();
					$().toastmessage('showSuccessToast', "Uspesno ste dodali proizvod u korpu...");
				}
				else
				{
					//showErrorToast();
					$().toastmessage('showWarningToast', "Nema dovoljno proizvoda u magacinu!");
				}
		});
	
	}
}

function total()
{
	$.ajax
	({
		url: 'rest/proizvodi/getTotal',
		type : "POST",		
		dataType : 'json',
		contentType:"application/json; charset=utf-8",
		
	}).then(function(data){
			$("#total2").text(data.toFixed(2));

	});
}

function otkaziKupovinu(){
	$.ajax
	({
		url: 'rest/proizvodi/otkaziKupovinu',
		type : "POST",				
	}).then(function(){
		
		total();
		popuniTabeluProizvodaKorpe();
		popuniTabeluProizvoda();
		prikaziKorpu();
	});
}

function ukloniProizvodKorpa(btn)
{
	$.ajax
	({
		url: 'rest/proizvodi/ukloniProizvodIzKorpe',
		type : "POST",		
		contentType:"application/json; charset=utf-8",
		dataType : 'json', 
		data: JSON.stringify({
			sifra : btn.id,
		})
		
	}).then(function(data){
		
		total();
		
		popuniTabeluProizvodaKorpe();
		popuniTabeluProizvoda();
		prikaziKorpu();
		
		$().toastmessage('showSuccessToast', "Uspešno ste obrisali proizvod iz korpe.");
		
	});
}


function popuniTabeluProizvodaKorpe(){
	
	$.ajax
	({
		url: 'rest/proizvodi/preuzmiKorpu',
		dataType : 'json',
		type : "POST"		
	}).then(function(data)
	{	
		if(data == null)
		{
			
		}
		else
		{
	
			$("#tabelaKorpa tbody").remove();
		
			data.forEach(function(item){
//				if(uslovFilteraKN(item, filter, cenaOd, cenaDo))
//				{
				
//					count++;
//					var popust;
//					if(item.akcija == null)
//						popust = "Nema popusta";
//					else
//						popust = ((1-item.akcija.popust/100)*item.jedinicnaCena).toFixed(2);
						/*+", od " + item.akcija.odDana + "."+ item.akcija.odMeseca + "."+ item.akcija.odGodine + "."+
						" do " + item.akcija.doDana + "."+ item.akcija.doMeseca + "."+ item.akcija.doGodine + ".";*/ 
//					var popust;
//					var datumPopusta;
					$.ajax
					({
						url: 'rest/proizvodi/dostavljaciZaProivod',
						type : "POST",		
						contentType:"application/json; charset=utf-8",
						dataType : 'json', 
						data: JSON.stringify({
							sifra : item.proizvod.sifra,
							prodavnica : item.proizvod.prodavnica
						})
					}).then(function(data2){
					
					var cenaSaPopustom = "/";

					var strDostava="";
					strDostava+="<select id=\"dostavaProizvodaZqWx"+item.proizvod.sifra+"\" onchange=\"promenaDostaveProizvod(this)\" >" + 
					"<option value=\""+"izaberi"+"\" >"+"Izaberite dostavu"+"</option>";
					data2.forEach(function(item2){
						strDostava+="<option id=\"dostavljacZqWx"+item2.sifra+"\">" +item2.naziv+"</option>";
								
					});
					strDostava+="</select>";
				
					$("#tabelaKorpa").append("<tr class=\"record\">"+
							"<td class=\"overflow\">" + item.proizvod.sifra + "</td>"+
							"<td class=\"overflow\">" + item.proizvod.naziv + "</td>"+
							"<td class=\"overflow\">" + item.proizvod.jedinicnaCena.toFixed(2) + "</td>"+
							"<td class=\"overflow\">" + item.kolicina.toFixed(2) + "</td>"+
							"<td class=\"overflow\">" + cenaSaPopustom + "</td>"+
							
							"<td class=\"overflow\">" + strDostava + "</td>"+
							"<td class=\"overflow\"><span id=\"cenaDostave"+item.proizvod.sifra+"\">"+item.cenaDostave.toFixed(2)+"</span>" + "" + "</td>"+
							"<td> <button onclick=\"ukloniProizvodKorpa(this);\" id=\""+item.proizvod.sifra+"\"> " +
									"<span class=\"glyphicon glyphicon-shopping-cart\"></span>Ukloni</button></td>"+
							
							"</tr>" 
							 );
					
//				}
					});
			});
		}
		
	});
}

function promenaDostaveProizvod(data){
	var kljucevi = data.id.split("ZqWx");
	var selected = $("#"+data.id).find('option:selected').val();
	//alert($("#"+data.id).find('option:selected').attr('id'))
	
	if(selected==="izaberi"){
		$("#cenaDostave"+kljucevi[1]).text("0.00");
		
		
		$.ajax
		({
			url: 'rest/proizvodi/postaviDostavuNula',
			type : "POST",		
			contentType:"application/json; charset=utf-8",
			dataType : 'json', 
			data: JSON.stringify({
				sifra : kljucevi[1]
			})
		}).then(function(data){
			
			$.ajax
			({
				url: 'rest/proizvodi/getTotal',
				type : "POST",		
				contentType:"application/json; charset=utf-8"
				
			}).then(function(data){
				$("#total2").text(data.toFixed(2));
				
			});
			
		});
		
		
		
		
	}else{
		var parseDostavljac = $("#"+data.id).find('option:selected').attr('id');
		var splits = parseDostavljac.split("ZqWx");
		var sifraDostavljaca = splits[1];
		
		$.ajax
		({
			url: 'rest/proizvodi/racunajCenuKorpeZaDostavu',
			type : "POST",		
			contentType:"application/json; charset=utf-8",
			dataType : 'json', 
			data: JSON.stringify({
				sifra : kljucevi[1],
				naziv : sifraDostavljaca
			})
		}).then(function(data){
//			var cenaDostave = data[0];
//			alert(cenaDostave.toFixed(2));
//			alert(data[1]);
			//var cenaSvega = data[1].toFixed(2);
			//alert(cenaSvega);
			$("#cenaDostave"+kljucevi[1]).text(data[0].toFixed(2));
			
			$.ajax
			({
				url: 'rest/proizvodi/getTotal',
				type : "POST",		
				contentType:"application/json; charset=utf-8"
				
			}).then(function(data2){
				$("#total2").text(data2.toFixed(2));
			});
		});
	}
}

function myFunClick(myTd){
	var str = "#"+myTd.id;
	$(str).parent().next('.companion').toggle();
}
//************************************************
function showSuccessToast() {
    $().toastmessage('showSuccessToast', "Uspesno ste dodali proizvod u korpu...");
}
function showStickySuccessToast() {
    $().toastmessage('showToast', {
        text: 'Success Dialog which is sticky',
        sticky: true,
        position: 'top-right',
        type: 'success',
        closeText: '',
        close: function () {
            console.log("toast is closed ...");
        }
    });

}
function showNoticeToast() {
    $().toastmessage('showNoticeToast', "Notice  Dialog which is fading away ...");
}
function showStickyNoticeToast() {
    $().toastmessage('showToast', {
        text: 'Notice Dialog which is sticky',
        sticky: true,
        position: 'top-left',
        type: 'notice',
        closeText: '',
        close: function () { console.log("toast is closed ..."); }
    });
}
function showWarningToast() {
    $().toastmessage('showWarningToast', "Warning Dialog which is fading away ...");
}
function showStickyWarningToast() {
    $().toastmessage('showToast', {
        text: 'Warning Dialog which is sticky',
        sticky: true,
        position: 'middle-right',
        type: 'warning',
        closeText: '',
        close: function () {
            console.log("toast is closed ...");
        }
    });
}
function showErrorToast() {
    $().toastmessage('showErrorToast', "Error Dialog which is fading away ...");
}
function showStickyErrorToast() {
    $().toastmessage('showToast', {
        text: 'Error Dialog which is sticky',
        sticky: true,
        position: 'center',
        type: 'error',
        closeText: '',
        close: function () {
            console.log("toast is closed ...");
        }
    });
}
//******************************************
function changeSelectDostava(){
	var pom = $("#dostavaSelect").find('option:selected').val();
	if(pom==="izaberi"){
		$("#dostavaText").hide();
	}else{
		$.ajax({
			url: 'rest/proizvodi/preuzmiDostavljace'	,
			type : "POST",		
			contentType:"application/json; charset=utf-8",
			dataType : 'json',
		}).then(function(data){
			
			data.forEach(function(item){
					if (item.sifra===pom) {
						var string = "Države poslovanja: ";
						
						item.drzavePoslovanja.forEach(function(item2){
							string+=item2+", ";
						});
						string=string.substring(0,string.length-2);
						string+=".\n";
						
						string += "Cene dostavljača za težine:\n   Za proizvod lakši od 1kg dostava je " + item.tarifaKg[0] +
						" evra\n   Za proizvod lakši od 5kg dostava je " + item.tarifaKg[1] +
						" evra\n   Za proizvod teži od 5kg dostava je " + item.tarifaKg[2] +"evra";
						
						string += "\nCene dostavljača za dimenzije:\n   Za dimenzije manje od 0.5m2 dostava je " + item.tarifaDim[0] +
						" evra\n   Za dimenzije manje od 1.0m2 dostava je " + item.tarifaDim[1] +
						" evra\n   Za dimenzije veće od 1.0m2 dostava je " + item.tarifaDim[2]+"evra";
						
						$("#dostavaTextParagraf").text(string);
						$("#dostavaText").show();
					}
			});
			
		});	
		
	}
	
	
}

function kupi(){
	
	$.ajax
	({
		url: 'rest/proizvodi/proveriDaLiSviImajuDostavu',
		dataType : 'json',
		type : "POST"		
	}).then(function(data2)
	{
		if(data2!=null){
			$().toastmessage('showErrorToast',"Morate izabrati dostavu za svaki proizvod");
		}else{
			$.ajax
			({
				url: 'rest/proizvodi/preuzmiProizvodeRacun',
				dataType : 'json',
				type : "POST"		
			}).then(function(data)
			{
				
				$.ajax
				({
					url: 'rest/proizvodi/proveraLogovanja',
					dataType : 'json',
					type : "POST"		
				}).then(function(korisnik)
				{
					
				
					
			
				
				$("#ulParent ul").remove();
				
				var str="<ul id=\"racunUl\">";
				str+="</ul>"
				$("#ulParent").append(str);
				str="";
				var cena=0.0;
				var ukupno=0;
				
				
				data.forEach(function(item){
					
					str="";
					str+="<li >\r\n" + 
							"        <span>"+item.kolicina +"x <a href=\"javascript:void(0);\">"+item.proizvod.naziv +", Prodavnica: "+item.proizvod.prodavnica.naziv+" </a></span> <strong>€"+cenaSPopustom +" + €"+item.cenaDostave+"("+item.dostavljac.naziv +" -"+item.trajanjeDostave +" dana) + 20% PDV</strong>\r\n" + 
							"        </li>";
					$("#racunUl").append(str);
					
					
					cena+=(item.proizvod.jedinicnaCena )*item.kolicina;
					cena+=item.cenaDostave;
					ukupno+=item.kolicina;
				});
				
				cena=cena.toFixed(2);
				var cenaSaPdv = cena*1.2;
				cenaSaPdv = cenaSaPdv.toFixed(2);
				str="";
				str+="<p>\r\n" + 
						"            <span>Proizvoda: <strong>"+ukupno +"</strong></span> <span>Ukupna cena: <strong>€"+ cena+"</strong><br>Cena sa PDV: <strong>€"+cenaSaPdv+"</strong></span>\r\n" + 
						"         </p>";
				
				str+="<span><a onclick=\"zatvoriRacun()\" class=\"checkout\" href=\"javascript:void(0);\">Zatvori</a></span>";
				$("#racunUl").append(str);
				
				$.ajax
				({
					url: 'rest/proizvodi/hocuSifruKupovine',
					dataType : 'json',
					type : "POST"		
				}).then(function(sifraKupovine)
				{
					$("#naslovH4 span").remove();
					$("#naslovH4").append("<span>Kupovina #"+sifraKupovine+"<br>Naziv kupca: "+korisnik.ime +" " + korisnik.prezime+"</span>");
					popuniTabeluIstorijat();
					popuniTabeluProizvoda();
				});	
				
			
				
				
				
				
				});
			
			});
			
			
			
			$("#tabelaDiv").hide();
		    $("#tabelaKorpa").hide();
		    $("#korpaPrazna").hide();
		    $("#korpaDugmici").hide();
		    $("#dostavaText").hide();
			$("#divRacun").show();
			$("#istorijaDiv").hide();
			
			
		}
	});
	
	
}

function popuniTabeluIstorijat(){
	$.ajax
	({
		url: 'rest/proizvodi/preuzmiListuIstorijeKorisnika',
		dataType : 'json',
		type : "POST"		
	}).then(function(data)
	{
		if(data==null){
			$("#istorijaPrazna").show();
			$("#istorijaDiv").hide();
		}else{
			
			$("#poljaZaKupovine").remove();
			$("#istorijaPrazna").remove();
			$("#unesiZalbu").remove();
			
			// $("#istorijaDiv").append("<div id=\"unesiZalbu\"><h4 ><span id=\"nazivZalbe\"></span></h4>" +
					// "<br><h5>Unesite vašu žalbu: </h5><br>" +
					// "<textarea style=\"width:600px;height:100px;\" id=\"zalbaText\"></textarea><br>"+
					// "<button class=\"btn btn-warning last\" onclick=\"posaljiZalbu(this)\"> " +
					// "<span class=\"glyphicon glyphicon-pencil\"></span>Pošalji žalbu</button>"+
					// "</div>" +
					// "<div id=\"poljaZaKupovine\"> \r\n" + 
					// "    	   </div>" +
					// "<div class=\"alert alert-danger\" id=\"istorijaPrazna\">Još uvek niste kupili ni jedan proizvod!</div>");
			
			data.forEach(function(kupovina){
				//alert(item.sifra);
				
				var str="";
				str+="<div  class=\"centriran col-sm-12\">" + 
						"				<section id=\"content\">" + 
						"			      <details class=\"shoppingCart\" >" + 
						"			         <summary>" + 
						"			            <h4 ><span>Kupovina #"+kupovina.sifra+"<br>Naziv kupca: "+kupovina.kupac.ime+" "+kupovina.kupac.prezime +"</span></h4>" + 
						"			         </summary>" + 
						"			         <ul>\r\n";
				
				var cena=0.0;
				var ukupno=0;
				kupovina.proizvodi.forEach(function(item){
							//str="";
							
					
							str+="<li >\r\n" + 
									"        <span>"+item.kolicina +"x <a href=\"javascript:void(0);\">"+item.proizvod.naziv +", Prodavnica: "+item.proizvod.prodavnica.naziv+" </a></span> <strong>€ + €"+item.cenaDostave+"("+item.dostavljac.naziv +" -"+item.trajanjeDostave +" dana) + 20% PDV</strong>\r\n" + 
									"        </li>";
							//$("#racunUl").append(str);
							
							
							cena+=(item.proizvod.jedinicnaCena)*item.kolicina;
							cena+=item.cenaDostave;
							ukupno+=item.kolicina;
				});
						
				cena=cena.toFixed(2);
				var cenaSaPdv = cena*1.2;
				cenaSaPdv = cenaSaPdv.toFixed(2);
				str+="<p>\r\n" + 
						"            <span>Proizvoda: <strong>"+ukupno +"</strong></span> <span>Ukupna cena: <strong>€"+ cena+"</strong><br>Cena sa PDV: <strong>€"+cenaSaPdv+"</strong></span>\r\n" + 
						"         </p>";
						
				str+="<span><a onclick=\"prikazZalbe(this)\" id=\""+kupovina.sifra+"?"+kupovina.kupac.korisnickoIme+"\" class=\"checkout\" href=\"javascript:void(0);\">Žalba</a></span>";
						
						
						
						
				str+="			         </ul>" +  
				"			      </details>" + 
				"				</section>" + 
				"		    </div>";
				
						
				$("#poljaZaKupovine").append(str);
				
				
			});
		}
	});
}

function prikazZalbe(data){
	$("#poljaZaKupovine").hide();
	$("#unesiZalbu").show();
	$("#zalbaText").val("");
	var kljucevi=data.id.split('?');
	var sifraKupovine=kljucevi[0];
	var sifraKupca=kljucevi[1];
	$("#nazivZalbe").text("Kupovina #"+sifraKupovine+",šifra kupca:"+sifraKupca);
}

function posaljiZalbu(){
	var textZalbe = $("#zalbaText").val();
	
	if(textZalbe.length==0)
		$().toastmessage('showWarningToast', "Žalba ne sme da bude prazna...");
	else{
			var text = $("#nazivZalbe").text();
			var pom  = text.split('#');
			var kljucevi = pom[1].split(",šifra kupca:");
			var sifraKupovine=kljucevi[0];
			var sifraKupca=kljucevi[1];
			var textZalbe = $("#zalbaText").val();
			alert(textZalbe);
			$("#poljaZaKupovine").show();
			$("#unesiZalbu").hide();
			$.ajax
			({
				url: 'rest/proizvodi/posaljiZalbuAdminu',
				type : "POST",		
				contentType:"application/json; charset=utf-8",
				dataType : 'json', 
				data: JSON.stringify({
					sifra : sifraKupovine,
					naziv : sifraKupca,
					boja : textZalbe,
				})
			}).then(function(data){
				$().toastmessage('showSuccessToast', "Uspešno ste poslali žalbu..");
			});
			
			
	}
	
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
		|| (item.boja.indexOf(filter) != -1 && $('#cbBoja').is(':checked')));
		
}

function zatvoriRacun(){
	$("#divRacun").hide();
	$("#tabelaDiv").show();
	$("#listaDiv").hide();
	$("#korpaDiv").hide();
	$("#istorijaDiv").hide();
}

function proizvodPreporucen(item) {
	
	$.ajax({
		url: 'rest/proizvodi/preuzmiPreporuke'	,
		dataType: 'json',
		type : "POST",		
		contentType:"application/json; charset=utf-8"
	}).then(function(data){

		if(data!=null){			
			data.forEach(function(pro){
				
				if(pro.sifra==item.sifra){
					var temp = $("#span"+item.sifra).html();
					
					if(temp==""){
						$("#span"+item.sifra).remove();
						$("#tdSifra"+item.sifra).append("<span id=\"span"+item.sifra+"\"><font id=\"myfont"+item.sifra+"\" color=\"orange\">"+item.sifra+ "<br>(PREPORUKA)</font></span>");
						$("#tdSifra"+item.sifra).css( "background-color", "#5175C0");  
					}else{
						if(temp.indexOf("PREPORUKA")==-1){
							
							$("#span"+item.sifra).remove();
							$("#tdSifra"+item.sifra).append("<span id=\"span"+item.sifra+"\"><font id=\"myfont"+item.sifra+"\" color=\"orange\">"+item.sifra+ "<br>(PREPORUKA)</font></span>");
							$("#tdSifra"+item.sifra).css( "background-color", "#5175C0");  
						}
					}
					
					
				}else{
					var temp = $("#span"+item.sifra).html();
					
					if(temp==""){
						$("#span"+item.sifra).remove();
						$("#tdSifra"+item.sifra).append("<span id=\"span"+item.sifra+"\">"+item.sifra+"</span>");
						
					}
				}
			});
		}else{
			$("#tdSifra"+item.sifra).append("<span id=\"span"+item.sifra+"\">"+item.sifra+"</span>");
		}


		
	});	

	
}

function sakrijGreskuReg(){
	  $("#greskaReg").hide();
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
	
	
	
	

  $.ajax
	({
		url: 'rest/proizvodi/izmenaNaloga',
		dataType: 'json',
		type : "POST",		
		contentType:"application/json; charset=utf-8",
		data: JSON.stringify({
			korisnickoIme : $("#korisnickoIme").val().trim(),
			lozinka : $("#sifra").val(),
			ime : $("#ime").val(),
			prezime : $("#prezime").val(),
			telefon : $("#telefon").val(),
			email : $("#email").val(),
			adresa : $("#adresa").val(),
			drzava : $("#drzava").val(),
		}),
	}).then(function(data){	
		$().toastmessage('showSuccessToast', "Uspešno ste izmenili podatke!");
		prikaziTabele();
		
	});
  return true;
}


