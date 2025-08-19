package Stay.Nestora.service;

import Stay.Nestora.dto.BookingRequest;
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
import java.util.List;

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

        if (isBookingConflict(property.getId(), bookingRequest.getCheckInDate(), bookingRequest.getCheckOutDate())) {
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

}
