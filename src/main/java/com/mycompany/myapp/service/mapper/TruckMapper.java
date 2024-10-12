package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Truck;
import com.mycompany.myapp.service.dto.TruckDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Truck} and its DTO {@link TruckDTO}.
 */
@Mapper(componentModel = "spring")
public interface TruckMapper extends EntityMapper<TruckDTO, Truck> {}
