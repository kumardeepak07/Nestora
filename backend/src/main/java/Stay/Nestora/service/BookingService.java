package Stay.Nestora.service;

import Stay.Nestora.dto.BookingRequest;
import Stay.Nestora.dto.DashboardResponse;
import Stay.Nestora.model.Booking;
import Stay.Nestora.model.Property;
import Stay.Nestora.model.User;
import Stay.Nestora.repository.BookingRepository;
import Stay.Nestora.repository.PropertyRepository;
import Stay.Nestora.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository;
    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PaymentService paymentService;

    public Booking bookProperty(BookingRequest bookingRequest) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow();
        Property property = propertyRepository.findById(bookingRequest.getProperty().get_id()).orElseThrow();

        if (isBookingConflict(property.get_id(), bookingRequest.getCheckInDate(), bookingRequest.getCheckOutDate())) {
            throw new IllegalStateException("Booking conflict: Property is already booked for selected dates.");
        }

        Double monthlyPrice = property.getMonthly_price();
        Double dailyPrice = property.getDaily_price();

        double price = "MONTHLY".equals(bookingRequest.getMode())
                ? (monthlyPrice != null ? monthlyPrice : 0.0)
                : (dailyPrice != null ? dailyPrice : 0.0);
        if (!paymentService.processPayment(bookingRequest.getMode(), price)) {
            throw new RuntimeException("Payment failed");
        }

        Booking booking = Booking.builder()
                .checkInDate(bookingRequest.getCheckInDate())
                .checkOutDate(bookingRequest.getCheckOutDate())
                .property(property)
                .user(user)
                .build();
        Booking saved = bookingRepository.save(booking);

        emailService.sendBookingConfirmation(booking.getUser().getEmail(),
                booking.getUser().getName(),
                booking.getProperty().getTitle());

        return saved;
    }
    public boolean isBookingConflict(Long propertyId, LocalDate checkInDate, LocalDate checkOutDate) {
        List<Booking> existingBookings = bookingRepository
                .findByPropertyIdAndCheckOutDateAfterAndCheckInDateBefore(propertyId, checkInDate, checkOutDate);
        return !existingBookings.isEmpty();
    }

    public List<Booking> getBookingsByOwner(Long ownerId) {
        return bookingRepository.findByPropertyOwnerId(ownerId);
    }
    public List<Booking> getOwnerBookingsByStatus(Long ownerId, String status) {
        return bookingRepository.findByPropertyOwnerIdAndStatus(ownerId, status);
    }
    public DashboardResponse getOwnerDashboardData(Long ownerId, String email) {
        DashboardResponse dashboardResponse = new DashboardResponse();
        List<Booking> bookingsByOwner = getBookingsByOwner(ownerId);
        dashboardResponse.setTotalBookings(bookingsByOwner.size());
        dashboardResponse.setAllBookings(bookingsByOwner);
        dashboardResponse.setRecentBookings(bookingRepository.findTop5ByPropertyOwnerEmailOrderByCheckInDateDesc(email));
        List<Property> properties = propertyRepository.findByOwnerId(ownerId);
        dashboardResponse.setTotalProperties(properties.size());
        List<Booking> confirmedBookings = getOwnerBookingsByStatus(ownerId, "CONFIRMED");
        dashboardResponse.setConfirmedBookings(confirmedBookings.size());
        List<Booking> pendingBookings = getOwnerBookingsByStatus(ownerId, "CONFIRMED");
        dashboardResponse.setPendingBookings(pendingBookings.size());
        List<Booking> cancelledBookings = getOwnerBookingsByStatus(ownerId, "PENDING");
        dashboardResponse.setCancelledBookings(cancelledBookings.size());

        Map<String, Double> revenue = calculateRevenue(bookingsByOwner,null);
        dashboardResponse.setTotalRevenue(revenue.get("totalRevenue"));
        dashboardResponse.setTotalRevenuePerMonth(revenue.get("monthlyRevenue"));

        return dashboardResponse;
    }
    public Map<String, Double> calculateRevenue(List<Booking> bookings, YearMonth month) {
        if(month == null) {
            month = YearMonth.now();
        }

        double monthlyRevenue = 0;
        double totalRevenue = 0;
        for (Booking booking : bookings) {
            double bookingRevenue = calculateBookingRevenue(booking);
            totalRevenue += bookingRevenue;

            if(isBookingInMonth(booking, month)) {
                monthlyRevenue += bookingRevenue;
            }
        }
        Map<String, Double> revenue = new HashMap<>();
        revenue.put("monthlyRevenue", monthlyRevenue);
        revenue.put("totalRevenue", totalRevenue);
        return revenue;
    }
    public boolean isBookingInMonth(Booking booking, YearMonth month) {
        return (booking.getCheckInDate() != null &&
                YearMonth.from(booking.getCheckInDate()).equals(month) ||
                (YearMonth.from(booking.getCheckOutDate()).equals(month)));
    }
    public double calculateBookingRevenue(Booking booking) {
        Property property = booking.getProperty();

        if("DAILY".equalsIgnoreCase(booking.getMode())){
            long days = ChronoUnit.DAYS.between(booking.getCheckInDate(), booking.getCheckOutDate());
            return days * property.getDaily_price();
        }else if("MONTHLY".equalsIgnoreCase(booking.getMode())){
            return property.getMonthly_price();
        }
        return 0.0;
    }

    public Booking updateBookingStatus(Long bookingId, String status) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found!"));
        booking.setStatus(status);
        return bookingRepository.save(booking);
    }

}
