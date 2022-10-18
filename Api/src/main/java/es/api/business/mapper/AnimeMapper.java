package es.api.business.mapper;

import es.api.business.dto.AnimeCrearDto;
import es.api.business.model.Anime;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface AnimeMapper {

    AnimeMapper INSTANCE = Mappers.getMapper(AnimeMapper.class);

    Anime crearToAnime(AnimeCrearDto animeCrear);

}
