package es.onisama.business.model;

import es.onisama.business.model.enumerated.GenerosEnum;
import es.onisama.business.model.enumerated.StatusEnum;
import es.onisama.business.model.enumerated.TipoEnum;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.*;

@Entity
@Table(name = "animes")
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Date getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(Date fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Date getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(Date fechaFin) {
        this.fechaFin = fechaFin;
    }

    public int getCapitulosEmitidos() {
        return capitulosEmitidos;
    }

    public void setCapitulosEmitidos(int capitulosEmitidos) {
        this.capitulosEmitidos = capitulosEmitidos;
    }

    public int getCapitulosTotales() {
        return capitulosTotales;
    }

    public void setCapitulosTotales(int capitulosTotales) {
        this.capitulosTotales = capitulosTotales;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public String getUrlAflv() {
        return urlAflv;
    }

    public void setUrlAflv(String urlAflv) {
        this.urlAflv = urlAflv;
    }

    public StatusEnum getStatusEnum() {
        return statusEnum;
    }

    public void setStatusEnum(StatusEnum statusEnum) {
        this.statusEnum = statusEnum;
    }

    public TipoEnum getTipoEnum() {
        return tipoEnum;
    }

    public void setTipoEnum(TipoEnum tipoEnum) {
        this.tipoEnum = tipoEnum;
    }

    public Collection<GenerosEnum> getGeneros() {
        return generos;
    }

    public void setGeneros(Collection<GenerosEnum> generos) {
        this.generos = generos;
    }

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
