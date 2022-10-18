package es.api.view.controller;

import es.api.business.dto.AnimeCrearDto;
import es.api.business.model.Anime;
import es.api.business.service.AnimesDiariosService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Tag(description = "Provee los animes del dia actual", name= "Animes diarios")
public class AnimesDiariosController {

    @Autowired
    private AnimesDiariosService animesDiariosService;

    /**
     * @return List<Anime>
     * @Autor: Daniel Guttman
     * El metodo esta puesto como void temporalmente hasta que se creen las clases
     */
    @Operation(summary = "Devuelve los animes del dia actual", description = "Devuelve una lista de tipo Anime con todos los animes que estan previstos emitir el dia de hoy")
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/animes/dia")
    public List<Anime> getAnimesDiarios() throws Exception {
        return this.animesDiariosService.getAnimesDiarios();
    }

    @Operation(summary = "Crea un anime", description = "Crea un anime de tipo Anime")
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/anime/add")
    public void agregarAnime(@RequestBody AnimeCrearDto animeCrear) throws Exception {
        this.animesDiariosService.agregarAnime(animeCrear);
    }

}
