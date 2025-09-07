package Stay.Nestora.repository;

import Stay.Nestora.model.Booking;
import Stay.Nestora.model.Property;
import Stay.Nestora.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property,Long> {

    // Find by owner entity
    List<Property> findByOwner(User owner);

    // Find by Owner ID
    List<Property> findByOwnerId(Long ownerId);

    List<Property> findByAddress_City(String city);
}


