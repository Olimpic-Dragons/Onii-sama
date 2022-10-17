package es.api.business.service.impl;

import es.api.business.model.Anime;
import es.api.business.repository.AnimeRepository;
import es.api.business.service.AnimesDiariosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class AnimesDiariosServiceImpl implements AnimesDiariosService {

    @Autowired
    private AnimeRepository animeRepository;

    @Override
    public List<Anime> getAnimesDiarios() {
        Date date;
        String hoy;
        try{
            date = new Date();
            hoy = String.valueOf(date.getDay());
        } catch (Exception ex){
            throw ex;
        }
        try {
            return this.animeRepository.findAnimeByDiaSemana(hoy);
        } catch (Exception ex) {
            throw ex;
        }
    }
}
