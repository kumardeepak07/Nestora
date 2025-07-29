package Stay.Nestora.repository;

import Stay.Nestora.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {

}

