package es.api.business.service;

import es.api.business.dto.AnimeCrearDto;
import es.api.business.model.Anime;

import java.util.List;

public interface AnimesDiariosService {

    List<Anime> getAnimesDiarios() throws Exception;

    void agregarAnime(AnimeCrearDto animeCrear) throws Exception;

}
