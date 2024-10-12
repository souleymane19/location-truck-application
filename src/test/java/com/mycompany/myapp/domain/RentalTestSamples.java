package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class RentalTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Rental getRentalSample1() {
        return new Rental().id(1L).streetAddress("streetAddress1").postalCode("postalCode1").city("city1").stateProvince("stateProvince1");
    }

    public static Rental getRentalSample2() {
        return new Rental().id(2L).streetAddress("streetAddress2").postalCode("postalCode2").city("city2").stateProvince("stateProvince2");
    }

    public static Rental getRentalRandomSampleGenerator() {
        return new Rental()
            .id(longCount.incrementAndGet())
            .streetAddress(UUID.randomUUID().toString())
            .postalCode(UUID.randomUUID().toString())
            .city(UUID.randomUUID().toString())
            .stateProvince(UUID.randomUUID().toString());
    }
}
