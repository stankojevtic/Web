function prikaziReg(){
    
	$("#korisnickoIme").val("");
	$("#sifra").val("");
	$("#ime").val("");
	$("#prezime").val("");
	$("#telefon").val("");
	$("#email").val("");
	$("#adresa").val("");
	$("#drzava").val("");
	
    $("#registerForm").show();
    $("#loginForm").hide();
    sakrijGreskuReg();
}

function prikaziLogin(){
   
	$("#korisnickoImeLogin").val("");
	$("#sifraLogin").val("");
	
    $("#registerForm").hide();
    $("#loginForm").show();
    
    sakrijGreskuLogin();
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
	check_num = /^[0-9_]{5,12}$/;

	if(!check_num.test($("#telefon").val().trim())){
		$().toastmessage('showErrorToast', "Nevalidan unos. Telefon mora da sadrzi od 5 do 12 cifara");
		return false;
	}
	if(!check_mail.test($("#email").val().trim())){
		$().toastmessage('showErrorToast', "Ne valja email.");
		return false;
	}
	
 
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
		}),
	}).then(function(data)
	{
		if(data == true){
			$().toastmessage('showSuccessToast', "Uspesna registracija.");
			prikaziLogin();
		}else{
			$().toastmessage('showErrorToast', "VeÄ‡ postoji takvo korisniÄ�ko ime, molimo Vas da unesete ponovo...");
		}
	});
    return true;
}


function validacijaLogin() {
	 var ret= $("#korisnickoImeLogin").val().trim().length != 0
		&& $("#sifraLogin").val().trim().length != 0;
	
	 if(ret == false)
	    {
			$().toastmessage('showWarningToast', "Polja ne smeju biti prazna!");
	        return false;
	    }
	 
	 $.ajax
		({
			url: 'rest/proizvodi/login',
			dataType: 'json',
			type : "POST",		
			contentType:"application/json; charset=utf-8",
			data: JSON.stringify({
				korisnickoIme : $("#korisnickoImeLogin").val(),
				lozinka : $("#sifraLogin").val()
			}),
		}).then(function(data)
				{				
				if(data == null)
				{				
					$("#greskaLogin").show();
					return false;
				}else if(data.uloga=="Kupac" ){
					window.location = "korisnik.html";	
				}
				else if(data.uloga=="Admin"){
					window.location = "korisnik.html";	
				}
				else if(data.uloga=="Prodavac"){
					window.location = "korisnik.html";	
				}
		});
	return true;
}

function sakrijGreskuLogin(){
	 $("#greskaLogin").hide();
}

function proveraLogovanja(){
	
	$.ajax({
		url: 'rest/proizvodi/proveraLogovanja'	,
		dataType: 'json',
		type : "POST",		
		contentType:"application/json; charset=utf-8"
	}).then(function(data){
		if(data != null )
			if( data.uloga=="Admin"){
				window.location= "admin.html";
			}else if(data.uloga=="Prodavac"){
				window.location= "prodavac.html";
			}else{
				window.location= "korisnik.html";
			}
	});
	
}



