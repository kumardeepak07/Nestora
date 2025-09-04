package Stay.Nestora.dto;

import Stay.Nestora.model.Property;
import Stay.Nestora.model.User;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingRequest {
    private String fullName;
    private String mobileNumber;
    private String email;
    private int guests;
    private double bookingAmount;


    private Long propertyId;

    private String addressProofPath;

    private String mode;

    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String status;
    private User user;
}
