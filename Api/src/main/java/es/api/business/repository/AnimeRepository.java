package es.api.business.repository;

import es.api.business.model.Anime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimeRepository extends JpaRepository<Anime, Long> {

    Anime findAnimeByTitulo(String titulo);

}