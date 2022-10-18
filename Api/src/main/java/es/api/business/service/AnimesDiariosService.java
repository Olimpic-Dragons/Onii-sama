package es.api.business.service;

import es.api.business.dto.AnimeCrearDto;
import es.api.business.dto.AnimeDto;
import es.api.business.model.Anime;

import java.util.List;

public interface AnimesDiariosService {

    List<AnimeDto> getAnimesDiarios() throws Exception;

    void agregarAnime(AnimeCrearDto animeCrear) throws Exception;

}
