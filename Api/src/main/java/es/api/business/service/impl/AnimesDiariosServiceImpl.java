package es.api.business.service.impl;

import es.api.business.model.Anime;
import es.api.business.repository.AnimeRepository;
import es.api.business.service.AnimesDiariosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnimesDiariosServiceImpl implements AnimesDiariosService {

    @Autowired
    private AnimeRepository animeRepository;

    @Override
    public List<Anime> getAnimesDiarios() {
        try {
            this.animeRepository.findAnimeByTitulo("toradora");
        } catch (Exception ex) {
            throw ex;
        }
        return null;
    }
}
