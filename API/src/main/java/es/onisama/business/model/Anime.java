package es.onisama.business.model;

import es.onisama.business.model.enumerated.GenerosEnum;
import es.onisama.business.model.enumerated.StatusEnum;
import es.onisama.business.model.enumerated.TipoEnum;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.*;

@Entity
@Table(name = "animes")
@Getter @Setter
public class Anime implements Serializable {

    @Serial
    private static final long serialVersionUID = 8788311634307919232L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(length = 100, nullable = false)
    private String titulo;

    @Column(length = 256, nullable = true, columnDefinition = "longtext")
    private String descripcion;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date fechaInicio;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date fechaFin;

    @Column(nullable = true)
    private int capitulosEmitidos;

    @Column(nullable = true)
    private int capitulosTotales;

    @Column(nullable = true)
    private String imagen;

    @Column(nullable = true)
    private String urlAflv;

    @Column(nullable = true)
    private StatusEnum statusEnum;

    @Column(nullable = true)
    private TipoEnum tipoEnum;

    @ElementCollection(targetClass = GenerosEnum.class)
    @Enumerated(EnumType.STRING)
    private Collection<GenerosEnum> generos;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "season_id")
    private Season season;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Anime anime = (Anime) o;
        return capitulosEmitidos == anime.capitulosEmitidos && capitulosTotales == anime.capitulosTotales && Objects.equals(id, anime.id) && Objects.equals(titulo, anime.titulo) && Objects.equals(descripcion, anime.descripcion) && Objects.equals(fechaInicio, anime.fechaInicio) && Objects.equals(fechaFin, anime.fechaFin) && Objects.equals(imagen, anime.imagen) && Objects.equals(urlAflv, anime.urlAflv) && statusEnum == anime.statusEnum && tipoEnum == anime.tipoEnum && Objects.equals(generos, anime.generos);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, titulo, descripcion, fechaInicio, fechaFin, capitulosEmitidos, capitulosTotales, imagen, urlAflv, statusEnum, tipoEnum, generos);
    }
}
