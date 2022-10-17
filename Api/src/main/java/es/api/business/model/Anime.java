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
import java.io.Serial;
import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

@Entity
@Table(name = "animes")
@Getter
@Setter
@EqualsAndHashCode
public class Anime implements Serializable {

    @Serial
    private static final long serialVersionUID = 8788311634307919232L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(length = 100, nullable = false)
    private String titulo;

    @Column(length = 256, columnDefinition = "longtext")
    private String descripcion;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date fechaInicio;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date fechaFin;

    @Column
    private int capitulosEmitidos;

    @Column
    private int capitulosTotales;

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

}