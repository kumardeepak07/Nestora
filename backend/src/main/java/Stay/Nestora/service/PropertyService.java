package Stay.Nestora.service;

import Stay.Nestora.model.Address;
import Stay.Nestora.model.Property;
import Stay.Nestora.repository.PropertyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PropertyService {

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
                .daily_price(propertyInput.getDaily_price())
                .monthly_price(propertyInput.getMonthly_price())
                .address(address)
                .build();

        return propertyRepository.save(property);
    }
    public Page<Property> getAllProperties(Pageable pageable) {
        return propertyRepository.findAll(pageable);
    }


}
