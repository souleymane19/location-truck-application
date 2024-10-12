package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class TruckTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Truck getTruckSample1() {
        return new Truck().id(1L).regionName("regionName1").licensePlate("licensePlate1").imageUrl("imageUrl1");
    }

    public static Truck getTruckSample2() {
        return new Truck().id(2L).regionName("regionName2").licensePlate("licensePlate2").imageUrl("imageUrl2");
    }

    public static Truck getTruckRandomSampleGenerator() {
        return new Truck()
            .id(longCount.incrementAndGet())
            .regionName(UUID.randomUUID().toString())
            .licensePlate(UUID.randomUUID().toString())
            .imageUrl(UUID.randomUUID().toString());
    }
}
