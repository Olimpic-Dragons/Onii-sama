package es.onisama.business.repository;

import es.onisama.business.model.Anime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimeRepository extends JpaRepository<Anime, Long> {

    Anime findAnimeById(Long id);

}