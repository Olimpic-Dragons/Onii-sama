package es.onisama.business.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "seasons")
@Getter
@Setter
public class Año {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(length = 100, nullable = false)
    private String year;

    @Column(nullable = true)
    private static final List<Season> season = new ArrayList<>();
}
