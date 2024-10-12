package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mycompany.myapp.domain.enumeration.Model;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Truck.
 */
@Entity
@Table(name = "truck")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Truck implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "region_name")
    private String regionName;

    @Column(name = "license_plate")
    private String licensePlate;

    @Column(name = "image_url")
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "model")
    private Model model;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "rentals")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "rentals" }, allowSetters = true)
    private Set<Rental> rentals = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Truck id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRegionName() {
        return this.regionName;
    }

    public Truck regionName(String regionName) {
        this.setRegionName(regionName);
        return this;
    }

    public void setRegionName(String regionName) {
        this.regionName = regionName;
    }

    public String getLicensePlate() {
        return this.licensePlate;
    }

    public Truck licensePlate(String licensePlate) {
        this.setLicensePlate(licensePlate);
        return this;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public String getImageUrl() {
        return this.imageUrl;
    }

    public Truck imageUrl(String imageUrl) {
        this.setImageUrl(imageUrl);
        return this;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Model getModel() {
        return this.model;
    }

    public Truck model(Model model) {
        this.setModel(model);
        return this;
    }

    public void setModel(Model model) {
        this.model = model;
    }

    public Set<Rental> getRentals() {
        return this.rentals;
    }

    public void setRentals(Set<Rental> rentals) {
        if (this.rentals != null) {
            this.rentals.forEach(i -> i.setRentals(null));
        }
        if (rentals != null) {
            rentals.forEach(i -> i.setRentals(this));
        }
        this.rentals = rentals;
    }

    public Truck rentals(Set<Rental> rentals) {
        this.setRentals(rentals);
        return this;
    }

    public Truck addRental(Rental rental) {
        this.rentals.add(rental);
        rental.setRentals(this);
        return this;
    }

    public Truck removeRental(Rental rental) {
        this.rentals.remove(rental);
        rental.setRentals(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Truck)) {
            return false;
        }
        return getId() != null && getId().equals(((Truck) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Truck{" +
            "id=" + getId() +
            ", regionName='" + getRegionName() + "'" +
            ", licensePlate='" + getLicensePlate() + "'" +
            ", imageUrl='" + getImageUrl() + "'" +
            ", model='" + getModel() + "'" +
            "}";
    }
}
