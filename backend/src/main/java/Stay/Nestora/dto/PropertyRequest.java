package Stay.Nestora.dto;

import Stay.Nestora.model.Address;
import Stay.Nestora.model.PropertyCategory;
import Stay.Nestora.model.User;
import lombok.Data;

@Data
public class PropertyRequest {
    private String title;
    private String description;
    private String image;
    private String property_type;
    private String currency;
    private Double daily_price;
    private Double monthly_price;
    private boolean isAvailable;
    private PropertyCategory category;
    private int total_rooms_available;
    private String room_capacity;
    private boolean isSwimmingPoolAvailable;
    private boolean isGymAvailable;
    private String hospital_distance;
    private String airport_distance;

    private Address address;
    private User owner;
}
