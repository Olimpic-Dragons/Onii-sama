package es.onisama.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Tag(description = "Provee los animes del dia actual", name= "Animes diarios")
public class AnimesDiariosController {

    /**
     * @return List<Anime>
     * @Autor: Daniel Guttman
     * El metodo esta puesto como void temporalmente hasta que se creen las clases
     */
    @Operation(summary = "Devuelve los animes del dia actual", description = "Devuelve una lista de tipo Anime con todos los animes que estan previstos emitir el dia de hoy")
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/animes/dia")
    public void getAnimes(){

    }

}
