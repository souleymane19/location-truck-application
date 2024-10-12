package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.domain.enumeration.Model;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.Truck} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TruckDTO implements Serializable {

    private Long id;

    private String regionName;

    private String licensePlate;

    private String imageUrl;

    private Model model;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRegionName() {
        return regionName;
    }

    public void setRegionName(String regionName) {
        this.regionName = regionName;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Model getModel() {
        return model;
    }

    public void setModel(Model model) {
        this.model = model;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TruckDTO)) {
            return false;
        }

        TruckDTO truckDTO = (TruckDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, truckDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TruckDTO{" +
            "id=" + getId() +
            ", regionName='" + getRegionName() + "'" +
            ", licensePlate='" + getLicensePlate() + "'" +
            ", imageUrl='" + getImageUrl() + "'" +
            ", model='" + getModel() + "'" +
            "}";
    }
}
