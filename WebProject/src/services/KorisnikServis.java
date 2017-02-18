package services;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;

@Path("/korisnici")
public class KorisnikServis {

	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;
}
