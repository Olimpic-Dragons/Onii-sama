package es.api.business.model;

import es.api.business.model.enumerated.GenerosEnum;
import es.api.business.model.enumerated.SeasonsEnum;
import es.api.business.model.enumerated.StatusEnum;
import es.api.business.model.enumerated.TipoEnum;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

@Entity
@Table(name = "animes")
@Getter
@Setter
@EqualsAndHashCode
public class Anime implements Serializable {

    private static final long serialVersionUID = 8788311634307919232L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(length = 100, nullable = false)
    private String titulo;

    @Column(length = 256, columnDefinition = "longtext")
    private String descripcion;

    @Column
    private String diaSemana;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date fechaInicio;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date fechaFin;

    @Column
    private String capitulosEmitidos;

    @Column
    private String capitulosTotales;

    @Column
    private String imagen;

    @Column
    private String urlAflv;

    @Column
    private StatusEnum statusEnum;

    @Column
    private TipoEnum tipoEnum;

    @ElementCollection(targetClass = GenerosEnum.class)
    @Enumerated(EnumType.STRING)
    private Collection<GenerosEnum> generos;

    @Enumerated(EnumType.STRING)
    private SeasonsEnum season;

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("Anime{");
        sb.append("id=").append(id);
        sb.append(", titulo='").append(titulo).append('\'');
        sb.append(", descripcion='").append(descripcion).append('\'');
        sb.append(", diaSemana='").append(diaSemana).append('\'');
        sb.append(", fechaInicio=").append(fechaInicio);
        sb.append(", fechaFin=").append(fechaFin);
        sb.append(", capitulosEmitidos='").append(capitulosEmitidos).append('\'');
        sb.append(", capitulosTotales='").append(capitulosTotales).append('\'');
        sb.append(", imagen='").append(imagen).append('\'');
        sb.append(", urlAflv='").append(urlAflv).append('\'');
        sb.append(", statusEnum=").append(statusEnum);
        sb.append(", tipoEnum=").append(tipoEnum);
        sb.append(", generos=").append(generos);
        sb.append(", season=").append(season);
        sb.append('}');
        return sb.toString();
    }
}
