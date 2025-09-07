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

    @Column(name = "description", columnDefinition = "VARCHAR(65535)")
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
    private boolean isParkingAvailable;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;


    public Long get_id() {
        return _id;
    }

    public void set_id(Long _id) {
        this._id = _id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getProperty_type() {
        return property_type;
    }

    public void setProperty_type(String property_type) {
        this.property_type = property_type;
    }

    public Double getDaily_price() {
        return daily_price;
    }

    public void setDaily_price(Double daily_price) {
        this.daily_price = daily_price;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Double getMonthly_price() {
        return monthly_price;
    }

    public void setMonthly_price(Double monthly_price) {
        this.monthly_price = monthly_price;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }

    public PropertyCategory getCategory() {
        return category;
    }

    public void setCategory(PropertyCategory category) {
        this.category = category;
    }

    public String getRoom_capacity() {
        return room_capacity;
    }

    public void setRoom_capacity(String room_capacity) {
        this.room_capacity = room_capacity;
    }

    public int getTotal_rooms_available() {
        return total_rooms_available;
    }

    public void setTotal_rooms_available(int total_rooms_available) {
        this.total_rooms_available = total_rooms_available;
    }

    public boolean isSwimmingPoolAvailable() {
        return isSwimmingPoolAvailable;
    }

    public void setSwimmingPoolAvailable(boolean swimmingPoolAvailable) {
        isSwimmingPoolAvailable = swimmingPoolAvailable;
    }

    public boolean isGymAvailable() {
        return isGymAvailable;
    }

    public void setGymAvailable(boolean gymAvailable) {
        isGymAvailable = gymAvailable;
    }

    public String getHospital_distance() {
        return hospital_distance;
    }

    public void setHospital_distance(String hospital_distance) {
        this.hospital_distance = hospital_distance;
    }

    public String getAirport_distance() {
        return airport_distance;
    }

    public void setAirport_distance(String airport_distance) {
        this.airport_distance = airport_distance;
    }

    public boolean isParkingAvailable() {
        return isParkingAvailable;
    }

    public void setParkingAvailable(boolean parkingAvailable) {
        isParkingAvailable = parkingAvailable;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }




}
