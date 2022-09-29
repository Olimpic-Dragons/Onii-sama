package es.onisama.business.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "year")
@Getter
@Setter
public class Year implements Serializable {

    @Serial
    private static final long serialVersionUID = -8521378719285967073L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(length = 100, nullable = false)
    private String year;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "year")
    private List<Season> seasons;
}
