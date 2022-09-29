package es.onisama.business.model;

import es.onisama.business.model.enumerated.GenerosEnum;
import es.onisama.business.model.enumerated.SeasonsEnum;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "seasons")
@Getter
@Setter
public class Season {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ElementCollection(targetClass = SeasonsEnum.class)
    @Enumerated(EnumType.STRING)
    private Collection<SeasonsEnum> season;

    @Column(nullable = true)
    private static final List<Anime> anime = new ArrayList<>();
}
