package es.api.business.repository;

import es.api.business.model.Anime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimeRepository extends JpaRepository<Anime, Long> {

    Anime findAnimeByTitulo(String titulo);

    List<Anime> findAnimeByDiaSemana(String dia);
}