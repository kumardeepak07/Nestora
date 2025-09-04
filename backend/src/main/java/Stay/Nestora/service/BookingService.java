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
        Property property = propertyRepository.findById(bookingRequest.getPropertyId()).orElseThrow();

        long days = 0; double totalRoomsRequired = 0;
        if (bookingRequest.getCheckInDate() != null &&
                bookingRequest.getCheckOutDate() != null && bookingRequest.getGuests() != 0) {
            days = ChronoUnit.DAYS.between(bookingRequest.getCheckInDate(), bookingRequest.getCheckOutDate());
            totalRoomsRequired = Math.ceil((double) bookingRequest.getGuests()/2);
        }
        if(days == 0){
            return null;
        }
        if(property.getTotal_rooms_available() < totalRoomsRequired){
            return null;
        }

        Double monthlyPrice = property.getMonthly_price();
        Double dailyPrice = property.getDaily_price();

        double price = "MONTHLY".equals(bookingRequest.getMode())
                ? (monthlyPrice != null ? monthlyPrice : 0.0)
                : (dailyPrice != null ? dailyPrice : 0.0);
        if (bookingRequest.getCheckInDate() != null &&
                bookingRequest.getCheckOutDate() != null && bookingRequest.getGuests() != 0) {
            price = price * totalRoomsRequired * days;
        }
        if (price > 0.0) {
            price += (price / 100) * 18;
            price = Math.round(price);
        }

        Booking booking = Booking.builder()
                .fullName(bookingRequest.getFullName())
                .email(bookingRequest.getEmail())
                .mobileNumber(bookingRequest.getMobileNumber())
                .guests(bookingRequest.getGuests())
                .mode(bookingRequest.getMode())
                .checkInDate(bookingRequest.getCheckInDate())
                .checkOutDate(bookingRequest.getCheckOutDate())
                .property(property)
                .bookingAmount(price)
                .guests(bookingRequest.getGuests())
                .status(bookingRequest.getStatus())
                .createdOn(LocalDate.now())
                .user(user)
                .build();
        Booking saved = bookingRepository.save(booking);

        return saved;
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

        double revenue = calculateRevenue(bookingsByOwner);
        dashboardResponse.setTotalRevenue(revenue);
        return dashboardResponse;
    }
    public double calculateRevenue(List<Booking> bookings) {

        double totalRevenue = 0;
        for (Booking booking : bookings) {
            if(booking.getStatus().equals("CONFIRMED") ||  booking.getStatus().equals("COMPLETED")) {
                totalRevenue +=  booking.getBookingAmount();
            }
        }
        return totalRevenue;
    }

    public Booking updateBookingStatus(Long bookingId, String status) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found!"));
        booking.setStatus(status);
        return bookingRepository.save(booking);
    }

}
