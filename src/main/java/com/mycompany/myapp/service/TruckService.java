package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.TruckDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.mycompany.myapp.domain.Truck}.
 */
public interface TruckService {
    /**
     * Save a truck.
     *
     * @param truckDTO the entity to save.
     * @return the persisted entity.
     */
    TruckDTO save(TruckDTO truckDTO);

    /**
     * Updates a truck.
     *
     * @param truckDTO the entity to update.
     * @return the persisted entity.
     */
    TruckDTO update(TruckDTO truckDTO);

    /**
     * Partially updates a truck.
     *
     * @param truckDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<TruckDTO> partialUpdate(TruckDTO truckDTO);

    /**
     * Get all the trucks.
     *
     * @return the list of entities.
     */
    List<TruckDTO> findAll();

    /**
     * Get the "id" truck.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TruckDTO> findOne(Long id);

    /**
     * Delete the "id" truck.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
