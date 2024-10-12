package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.Rental;
import com.mycompany.myapp.repository.RentalRepository;
import com.mycompany.myapp.service.RentalService;
import com.mycompany.myapp.service.dto.RentalDTO;
import com.mycompany.myapp.service.mapper.RentalMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.Rental}.
 */
@Service
@Transactional
public class RentalServiceImpl implements RentalService {

    private static final Logger LOG = LoggerFactory.getLogger(RentalServiceImpl.class);

    private final RentalRepository rentalRepository;

    private final RentalMapper rentalMapper;

    public RentalServiceImpl(RentalRepository rentalRepository, RentalMapper rentalMapper) {
        this.rentalRepository = rentalRepository;
        this.rentalMapper = rentalMapper;
    }

    @Override
    public RentalDTO save(RentalDTO rentalDTO) {
        LOG.debug("Request to save Rental : {}", rentalDTO);
        Rental rental = rentalMapper.toEntity(rentalDTO);
        rental = rentalRepository.save(rental);
        return rentalMapper.toDto(rental);
    }

    @Override
    public RentalDTO update(RentalDTO rentalDTO) {
        LOG.debug("Request to update Rental : {}", rentalDTO);
        Rental rental = rentalMapper.toEntity(rentalDTO);
        rental = rentalRepository.save(rental);
        return rentalMapper.toDto(rental);
    }

    @Override
    public Optional<RentalDTO> partialUpdate(RentalDTO rentalDTO) {
        LOG.debug("Request to partially update Rental : {}", rentalDTO);

        return rentalRepository
            .findById(rentalDTO.getId())
            .map(existingRental -> {
                rentalMapper.partialUpdate(existingRental, rentalDTO);

                return existingRental;
            })
            .map(rentalRepository::save)
            .map(rentalMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<RentalDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all Rentals");
        return rentalRepository.findAll(pageable).map(rentalMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<RentalDTO> findOne(Long id) {
        LOG.debug("Request to get Rental : {}", id);
        return rentalRepository.findById(id).map(rentalMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete Rental : {}", id);
        rentalRepository.deleteById(id);
    }
}
