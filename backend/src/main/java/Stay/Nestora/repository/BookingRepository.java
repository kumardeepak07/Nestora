package Stay.Nestora.repository;

import Stay.Nestora.model.Booking;
import Stay.Nestora.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking,Long> {
    List<Booking> findByUser_Id(Long id);
    List<Booking> findByUser(User user);
    List<Booking> findByPropertyOwnerId(Long ownerId);

    @Query("SELECT b from Booking b where b.property.id = :propertyId and b.checkOutDate > :checkIn and b.checkInDate < :checkOut")
    List<Booking> findByPropertyIdAndCheckOutDateAfterAndCheckInDateBefore(
            @Param("propertyId") Long propertyId,
            @Param("checkIn") LocalDate checkIn,
            @Param("checkOut") LocalDate checkOut
            );

    List<Booking> findByPropertyOwnerIdAndStatus(Long ownerId, String status);

    List<Booking> findTop5ByPropertyOwnerEmailOrderByCheckInDateDesc(String email);


}
