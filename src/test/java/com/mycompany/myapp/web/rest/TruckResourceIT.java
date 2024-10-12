package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.domain.TruckAsserts.*;
import static com.mycompany.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Truck;
import com.mycompany.myapp.domain.enumeration.Model;
import com.mycompany.myapp.repository.TruckRepository;
import com.mycompany.myapp.service.dto.TruckDTO;
import com.mycompany.myapp.service.mapper.TruckMapper;
import jakarta.persistence.EntityManager;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link TruckResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TruckResourceIT {

    private static final String DEFAULT_REGION_NAME = "AAAAAAAAAA";
    private static final String UPDATED_REGION_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LICENSE_PLATE = "AAAAAAAAAA";
    private static final String UPDATED_LICENSE_PLATE = "BBBBBBBBBB";

    private static final String DEFAULT_IMAGE_URL = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE_URL = "BBBBBBBBBB";

    private static final Model DEFAULT_MODEL = Model.PETIT;
    private static final Model UPDATED_MODEL = Model.MOYEN;

    private static final String ENTITY_API_URL = "/api/trucks";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private TruckRepository truckRepository;

    @Autowired
    private TruckMapper truckMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTruckMockMvc;

    private Truck truck;

    private Truck insertedTruck;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Truck createEntity() {
        return new Truck()
            .regionName(DEFAULT_REGION_NAME)
            .licensePlate(DEFAULT_LICENSE_PLATE)
            .imageUrl(DEFAULT_IMAGE_URL)
            .model(DEFAULT_MODEL);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Truck createUpdatedEntity() {
        return new Truck()
            .regionName(UPDATED_REGION_NAME)
            .licensePlate(UPDATED_LICENSE_PLATE)
            .imageUrl(UPDATED_IMAGE_URL)
            .model(UPDATED_MODEL);
    }

    @BeforeEach
    public void initTest() {
        truck = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedTruck != null) {
            truckRepository.delete(insertedTruck);
            insertedTruck = null;
        }
    }

    @Test
    @Transactional
    void createTruck() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Truck
        TruckDTO truckDTO = truckMapper.toDto(truck);
        var returnedTruckDTO = om.readValue(
            restTruckMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(truckDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            TruckDTO.class
        );

        // Validate the Truck in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedTruck = truckMapper.toEntity(returnedTruckDTO);
        assertTruckUpdatableFieldsEquals(returnedTruck, getPersistedTruck(returnedTruck));

        insertedTruck = returnedTruck;
    }

    @Test
    @Transactional
    void createTruckWithExistingId() throws Exception {
        // Create the Truck with an existing ID
        truck.setId(1L);
        TruckDTO truckDTO = truckMapper.toDto(truck);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTruckMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(truckDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Truck in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllTrucks() throws Exception {
        // Initialize the database
        insertedTruck = truckRepository.saveAndFlush(truck);

        // Get all the truckList
        restTruckMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(truck.getId().intValue())))
            .andExpect(jsonPath("$.[*].regionName").value(hasItem(DEFAULT_REGION_NAME)))
            .andExpect(jsonPath("$.[*].licensePlate").value(hasItem(DEFAULT_LICENSE_PLATE)))
            .andExpect(jsonPath("$.[*].imageUrl").value(hasItem(DEFAULT_IMAGE_URL)))
            .andExpect(jsonPath("$.[*].model").value(hasItem(DEFAULT_MODEL.toString())));
    }

    @Test
    @Transactional
    void getTruck() throws Exception {
        // Initialize the database
        insertedTruck = truckRepository.saveAndFlush(truck);

        // Get the truck
        restTruckMockMvc
            .perform(get(ENTITY_API_URL_ID, truck.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(truck.getId().intValue()))
            .andExpect(jsonPath("$.regionName").value(DEFAULT_REGION_NAME))
            .andExpect(jsonPath("$.licensePlate").value(DEFAULT_LICENSE_PLATE))
            .andExpect(jsonPath("$.imageUrl").value(DEFAULT_IMAGE_URL))
            .andExpect(jsonPath("$.model").value(DEFAULT_MODEL.toString()));
    }

    @Test
    @Transactional
    void getNonExistingTruck() throws Exception {
        // Get the truck
        restTruckMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingTruck() throws Exception {
        // Initialize the database
        insertedTruck = truckRepository.saveAndFlush(truck);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the truck
        Truck updatedTruck = truckRepository.findById(truck.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedTruck are not directly saved in db
        em.detach(updatedTruck);
        updatedTruck.regionName(UPDATED_REGION_NAME).licensePlate(UPDATED_LICENSE_PLATE).imageUrl(UPDATED_IMAGE_URL).model(UPDATED_MODEL);
        TruckDTO truckDTO = truckMapper.toDto(updatedTruck);

        restTruckMockMvc
            .perform(
                put(ENTITY_API_URL_ID, truckDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(truckDTO))
            )
            .andExpect(status().isOk());

        // Validate the Truck in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedTruckToMatchAllProperties(updatedTruck);
    }

    @Test
    @Transactional
    void putNonExistingTruck() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        truck.setId(longCount.incrementAndGet());

        // Create the Truck
        TruckDTO truckDTO = truckMapper.toDto(truck);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTruckMockMvc
            .perform(
                put(ENTITY_API_URL_ID, truckDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(truckDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Truck in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTruck() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        truck.setId(longCount.incrementAndGet());

        // Create the Truck
        TruckDTO truckDTO = truckMapper.toDto(truck);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTruckMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(truckDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Truck in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTruck() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        truck.setId(longCount.incrementAndGet());

        // Create the Truck
        TruckDTO truckDTO = truckMapper.toDto(truck);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTruckMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(truckDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Truck in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTruckWithPatch() throws Exception {
        // Initialize the database
        insertedTruck = truckRepository.saveAndFlush(truck);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the truck using partial update
        Truck partialUpdatedTruck = new Truck();
        partialUpdatedTruck.setId(truck.getId());

        partialUpdatedTruck.imageUrl(UPDATED_IMAGE_URL);

        restTruckMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTruck.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedTruck))
            )
            .andExpect(status().isOk());

        // Validate the Truck in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertTruckUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedTruck, truck), getPersistedTruck(truck));
    }

    @Test
    @Transactional
    void fullUpdateTruckWithPatch() throws Exception {
        // Initialize the database
        insertedTruck = truckRepository.saveAndFlush(truck);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the truck using partial update
        Truck partialUpdatedTruck = new Truck();
        partialUpdatedTruck.setId(truck.getId());

        partialUpdatedTruck
            .regionName(UPDATED_REGION_NAME)
            .licensePlate(UPDATED_LICENSE_PLATE)
            .imageUrl(UPDATED_IMAGE_URL)
            .model(UPDATED_MODEL);

        restTruckMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTruck.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedTruck))
            )
            .andExpect(status().isOk());

        // Validate the Truck in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertTruckUpdatableFieldsEquals(partialUpdatedTruck, getPersistedTruck(partialUpdatedTruck));
    }

    @Test
    @Transactional
    void patchNonExistingTruck() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        truck.setId(longCount.incrementAndGet());

        // Create the Truck
        TruckDTO truckDTO = truckMapper.toDto(truck);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTruckMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, truckDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(truckDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Truck in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTruck() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        truck.setId(longCount.incrementAndGet());

        // Create the Truck
        TruckDTO truckDTO = truckMapper.toDto(truck);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTruckMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(truckDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Truck in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTruck() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        truck.setId(longCount.incrementAndGet());

        // Create the Truck
        TruckDTO truckDTO = truckMapper.toDto(truck);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTruckMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(truckDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Truck in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTruck() throws Exception {
        // Initialize the database
        insertedTruck = truckRepository.saveAndFlush(truck);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the truck
        restTruckMockMvc
            .perform(delete(ENTITY_API_URL_ID, truck.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return truckRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected Truck getPersistedTruck(Truck truck) {
        return truckRepository.findById(truck.getId()).orElseThrow();
    }

    protected void assertPersistedTruckToMatchAllProperties(Truck expectedTruck) {
        assertTruckAllPropertiesEquals(expectedTruck, getPersistedTruck(expectedTruck));
    }

    protected void assertPersistedTruckToMatchUpdatableProperties(Truck expectedTruck) {
        assertTruckAllUpdatablePropertiesEquals(expectedTruck, getPersistedTruck(expectedTruck));
    }
}
