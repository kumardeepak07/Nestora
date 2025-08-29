package Stay.Nestora.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Property {
    @jakarta.persistence.Id
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long _id;

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


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    public String getTitle() {
        return title;
    }
    public Double getDaily_price() {
        return daily_price;
    }
    public Double getMonthly_price() {
        return monthly_price;
    }
}
