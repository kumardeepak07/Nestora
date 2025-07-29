package Stay.Nestora.dto;

import lombok.Data;

@Data
public class PropertyRequest {
    private String name;
    private Double dailyPrice;
    private Double monthlyPrice;

    private String street;
    private String city;
    private String state;
    private String country;
    private String zipCode;
}
