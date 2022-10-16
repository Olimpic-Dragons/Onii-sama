package es.onisama.business.model;

import es.onisama.business.model.enumerated.SeasonsEnum;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "season")
@Getter
@Setter
@EqualsAndHashCode
public class Season implements Serializable {

    @Serial
    private static final long serialVersionUID = -5268664332248964332L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ElementCollection(targetClass = SeasonsEnum.class)
    @Enumerated(EnumType.STRING)
    private Collection<SeasonsEnum> season;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "year_id")
    private Year year;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "season")
    private List<Anime> animes;

}
