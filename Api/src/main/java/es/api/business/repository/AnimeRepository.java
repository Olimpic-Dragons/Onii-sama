package es.api.business.repository;

import es.api.business.model.Anime;
import es.api.business.model.enumerated.StatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimeRepository extends JpaRepository<Anime, Long> {

    List<Anime> findAnimeByDiaSemanaAndStatusEnum(String diaSemana, StatusEnum statusEnum);

    List<Anime> findAllByStatusEnumAndDiaSemana(StatusEnum statusEnum, String diaSemana);

}