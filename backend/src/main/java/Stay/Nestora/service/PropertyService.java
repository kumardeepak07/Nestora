package Stay.Nestora.service;

import Stay.Nestora.model.Address;
import Stay.Nestora.model.Property;
import Stay.Nestora.model.User;
import Stay.Nestora.repository.PropertyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PropertyService {

    @Autowired
    private final PropertyRepository propertyRepository;

    public Property createProperty(Property propertyInput) {
        Address inputAddress = propertyInput.getAddress();
        Address address = Address.builder()
                .street(inputAddress.getStreet())
                .city(inputAddress.getCity())
                .state(inputAddress.getState())
                .country(inputAddress.getCountry())
                .zipCode(inputAddress.getZipCode())
                .build();

        Property property = Property.builder()
                .title(propertyInput.getTitle())
                .description(propertyInput.getDescription())
                .image(propertyInput.getImage())
                .category(propertyInput.getCategory())
                .total_rooms_available(propertyInput.getTotal_rooms_available())
                .room_capacity(propertyInput.getRoom_capacity())
                .isSwimmingPoolAvailable(propertyInput.isSwimmingPoolAvailable())
                .isGymAvailable(propertyInput.isGymAvailable())
                .property_type(propertyInput.getProperty_type())
                .hospital_distance(propertyInput.getHospital_distance())
                .airport_distance(propertyInput.getAirport_distance())
                .owner(propertyInput.getOwner())
                .daily_price(propertyInput.getDaily_price())
                .monthly_price(propertyInput.getMonthly_price())
                .address(address)
                .isAvailable(true)
                .build();

        return propertyRepository.save(property);
    }
    public Page<Property> getAllProperties(Pageable pageable) {

        return propertyRepository.findAll(pageable);
    }

    public List<Property> getPropertiesByOwner(User owner) {
        return propertyRepository.findByOwner(owner);
    }
    public Property updateAvailability(Long propertyId, boolean available) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found with id: " + propertyId));
        property.setAvailable(available);
        return propertyRepository.save(property);
    }
}
