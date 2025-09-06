package Stay.Nestora.dto;

import Stay.Nestora.model.Booking;
import lombok.Data;

import java.util.List;

@Data
public class DashboardResponse {
    private int totalProperties;
    private int totalBookings;
    private int pendingBookings;
    private int confirmedBookings;
    private int cancelledBookings;
    private int completedBookings;
    private double totalRevenue;

    private List<Booking> recentBookings;
    private List<Booking> allBookings;
}
