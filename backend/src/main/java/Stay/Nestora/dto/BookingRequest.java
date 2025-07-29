package Stay.Nestora.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingRequest {
    private Long propertyId;
    private String mode; // DAILY or MONTHLY
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String addressProofPath;
}
