package es.api.business.dto;

import es.api.business.model.enumerated.GenerosEnum;
import es.api.business.model.enumerated.SeasonsEnum;
import es.api.business.model.enumerated.StatusEnum;
import es.api.business.model.enumerated.TipoEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class AnimeDto {
    private String titulo;
    private String descripcion;
    private String diaSemana;
    private Date fechaInicio;
    private Date fechaFin;
    private String capitulosEmitidos;
    private String capitulosTotales;
    private String imagen;
    private String urlAflv;
    private StatusEnum statusEnum;
    private TipoEnum tipoEnum;
    private Collection<GenerosEnum> generos;
    private SeasonsEnum season;
}
