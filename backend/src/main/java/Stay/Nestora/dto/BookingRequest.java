package Stay.Nestora.dto;

import Stay.Nestora.model.Property;
import Stay.Nestora.model.User;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingRequest {
    private Property property;
    private User user;
    private String mode; // DAILY or MONTHLY
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String addressProofPath;
    private String status;
}
