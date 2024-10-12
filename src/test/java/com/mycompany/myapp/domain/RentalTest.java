package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.RentalTestSamples.*;
import static com.mycompany.myapp.domain.TruckTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class RentalTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Rental.class);
        Rental rental1 = getRentalSample1();
        Rental rental2 = new Rental();
        assertThat(rental1).isNotEqualTo(rental2);

        rental2.setId(rental1.getId());
        assertThat(rental1).isEqualTo(rental2);

        rental2 = getRentalSample2();
        assertThat(rental1).isNotEqualTo(rental2);
    }

    @Test
    void rentalsTest() {
        Rental rental = getRentalRandomSampleGenerator();
        Truck truckBack = getTruckRandomSampleGenerator();

        rental.setRentals(truckBack);
        assertThat(rental.getRentals()).isEqualTo(truckBack);

        rental.rentals(null);
        assertThat(rental.getRentals()).isNull();
    }
}
