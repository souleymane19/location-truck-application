package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.Truck;
import com.mycompany.myapp.repository.TruckRepository;
import com.mycompany.myapp.service.TruckService;
import com.mycompany.myapp.service.dto.TruckDTO;
import com.mycompany.myapp.service.mapper.TruckMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.Truck}.
 */
@Service
@Transactional
public class TruckServiceImpl implements TruckService {

    private static final Logger LOG = LoggerFactory.getLogger(TruckServiceImpl.class);

    private final TruckRepository truckRepository;

    private final TruckMapper truckMapper;

    public TruckServiceImpl(TruckRepository truckRepository, TruckMapper truckMapper) {
        this.truckRepository = truckRepository;
        this.truckMapper = truckMapper;
    }

    @Override
    public TruckDTO save(TruckDTO truckDTO) {
        LOG.debug("Request to save Truck : {}", truckDTO);
        Truck truck = truckMapper.toEntity(truckDTO);
        truck = truckRepository.save(truck);
        return truckMapper.toDto(truck);
    }

    @Override
    public TruckDTO update(TruckDTO truckDTO) {
        LOG.debug("Request to update Truck : {}", truckDTO);
        Truck truck = truckMapper.toEntity(truckDTO);
        truck = truckRepository.save(truck);
        return truckMapper.toDto(truck);
    }

    @Override
    public Optional<TruckDTO> partialUpdate(TruckDTO truckDTO) {
        LOG.debug("Request to partially update Truck : {}", truckDTO);

        return truckRepository
            .findById(truckDTO.getId())
            .map(existingTruck -> {
                truckMapper.partialUpdate(existingTruck, truckDTO);

                return existingTruck;
            })
            .map(truckRepository::save)
            .map(truckMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TruckDTO> findAll() {
        LOG.debug("Request to get all Trucks");
        return truckRepository.findAll().stream().map(truckMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TruckDTO> findOne(Long id) {
        LOG.debug("Request to get Truck : {}", id);
        return truckRepository.findById(id).map(truckMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete Truck : {}", id);
        truckRepository.deleteById(id);
    }
}
