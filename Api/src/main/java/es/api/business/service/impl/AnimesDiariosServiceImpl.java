package es.api.business.service.impl;

import es.api.business.dto.AnimeCrearDto;
import es.api.business.mapper.AnimeMapper;
import es.api.business.model.Anime;
import es.api.business.model.enumerated.StatusEnum;
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

    @Autowired
    private AnimeMapper animeMapper;

    @Override
    public List<Anime> getAnimesDiarios() throws Exception {
        try {
            List<Anime> animesEnEmision = this.animeRepository.findAnimeByStatusEnumAndDiaSemana(StatusEnum.EN_EMISION,String.valueOf(new Date().getDay()));
            return animesEnEmision;
        } catch (Exception ex) {
            throw ex;
        }
    }

    @Override
    public void agregarAnime(AnimeCrearDto animeCrear) throws Exception {
        Anime anime;
        try{
            anime = this.animeMapper.crearToAnime(animeCrear);
        } catch (Exception ex){
            throw ex;
        }
        try{
            this.animeRepository.save(anime);
        }catch (Exception ex){
            throw ex;
        }
    }

}
