package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Rental;
import com.mycompany.myapp.domain.Truck;
import com.mycompany.myapp.service.dto.RentalDTO;
import com.mycompany.myapp.service.dto.TruckDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Rental} and its DTO {@link RentalDTO}.
 */
@Mapper(componentModel = "spring")
public interface RentalMapper extends EntityMapper<RentalDTO, Rental> {
    @Mapping(target = "rentals", source = "rentals", qualifiedByName = "truckId")
    RentalDTO toDto(Rental s);

    @Named("truckId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    TruckDTO toDtoTruckId(Truck truck);
}
