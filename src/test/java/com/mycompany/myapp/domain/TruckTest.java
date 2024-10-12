package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.RentalTestSamples.*;
import static com.mycompany.myapp.domain.TruckTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class TruckTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Truck.class);
        Truck truck1 = getTruckSample1();
        Truck truck2 = new Truck();
        assertThat(truck1).isNotEqualTo(truck2);

        truck2.setId(truck1.getId());
        assertThat(truck1).isEqualTo(truck2);

        truck2 = getTruckSample2();
        assertThat(truck1).isNotEqualTo(truck2);
    }

    @Test
    void rentalTest() {
        Truck truck = getTruckRandomSampleGenerator();
        Rental rentalBack = getRentalRandomSampleGenerator();

        truck.addRental(rentalBack);
        assertThat(truck.getRentals()).containsOnly(rentalBack);
        assertThat(rentalBack.getRentals()).isEqualTo(truck);

        truck.removeRental(rentalBack);
        assertThat(truck.getRentals()).doesNotContain(rentalBack);
        assertThat(rentalBack.getRentals()).isNull();

        truck.rentals(new HashSet<>(Set.of(rentalBack)));
        assertThat(truck.getRentals()).containsOnly(rentalBack);
        assertThat(rentalBack.getRentals()).isEqualTo(truck);

        truck.setRentals(new HashSet<>());
        assertThat(truck.getRentals()).doesNotContain(rentalBack);
        assertThat(rentalBack.getRentals()).isNull();
    }
}
