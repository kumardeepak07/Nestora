package Stay.Nestora.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Property {
    @jakarta.persistence.Id
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String price;
    private String imageUrl;
    private Double dailyPrice;
    private Double monthlyPrice;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;

    @ManyToOne
    private User owner;

    public String getTitle() {
        return title;
    }
    public Double getDailyPrice() {
        return dailyPrice;
    }
    public Double getMonthlyPrice() {
        return monthlyPrice;
    }
}
