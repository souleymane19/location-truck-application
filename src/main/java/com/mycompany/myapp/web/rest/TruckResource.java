package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.repository.TruckRepository;
import com.mycompany.myapp.service.TruckService;
import com.mycompany.myapp.service.dto.TruckDTO;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Truck}.
 */
@RestController
@RequestMapping("/api/trucks")
public class TruckResource {

    private static final Logger LOG = LoggerFactory.getLogger(TruckResource.class);

    private static final String ENTITY_NAME = "truck";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TruckService truckService;

    private final TruckRepository truckRepository;

    public TruckResource(TruckService truckService, TruckRepository truckRepository) {
        this.truckService = truckService;
        this.truckRepository = truckRepository;
    }

    /**
     * {@code POST  /trucks} : Create a new truck.
     *
     * @param truckDTO the truckDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new truckDTO, or with status {@code 400 (Bad Request)} if the truck has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<TruckDTO> createTruck(@RequestBody TruckDTO truckDTO) throws URISyntaxException {
        LOG.debug("REST request to save Truck : {}", truckDTO);
        if (truckDTO.getId() != null) {
            throw new BadRequestAlertException("A new truck cannot already have an ID", ENTITY_NAME, "idexists");
        }
        truckDTO = truckService.save(truckDTO);
        return ResponseEntity.created(new URI("/api/trucks/" + truckDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, truckDTO.getId().toString()))
            .body(truckDTO);
    }

    /**
     * {@code PUT  /trucks/:id} : Updates an existing truck.
     *
     * @param id the id of the truckDTO to save.
     * @param truckDTO the truckDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated truckDTO,
     * or with status {@code 400 (Bad Request)} if the truckDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the truckDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<TruckDTO> updateTruck(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TruckDTO truckDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update Truck : {}, {}", id, truckDTO);
        if (truckDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, truckDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!truckRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        truckDTO = truckService.update(truckDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, truckDTO.getId().toString()))
            .body(truckDTO);
    }

    /**
     * {@code PATCH  /trucks/:id} : Partial updates given fields of an existing truck, field will ignore if it is null
     *
     * @param id the id of the truckDTO to save.
     * @param truckDTO the truckDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated truckDTO,
     * or with status {@code 400 (Bad Request)} if the truckDTO is not valid,
     * or with status {@code 404 (Not Found)} if the truckDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the truckDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TruckDTO> partialUpdateTruck(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TruckDTO truckDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Truck partially : {}, {}", id, truckDTO);
        if (truckDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, truckDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!truckRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TruckDTO> result = truckService.partialUpdate(truckDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, truckDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /trucks} : get all the trucks.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of trucks in body.
     */
    @GetMapping("")
    public List<TruckDTO> getAllTrucks() {
        LOG.debug("REST request to get all Trucks");
        return truckService.findAll();
    }

    /**
     * {@code GET  /trucks/:id} : get the "id" truck.
     *
     * @param id the id of the truckDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the truckDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<TruckDTO> getTruck(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Truck : {}", id);
        Optional<TruckDTO> truckDTO = truckService.findOne(id);
        return ResponseUtil.wrapOrNotFound(truckDTO);
    }

    /**
     * {@code DELETE  /trucks/:id} : delete the "id" truck.
     *
     * @param id the id of the truckDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTruck(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Truck : {}", id);
        truckService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
