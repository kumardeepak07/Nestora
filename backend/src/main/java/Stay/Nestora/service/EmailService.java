package Stay.Nestora.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    public void sendBookingConfirmation(String toEmail, String userName, String propertyName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Booking Confirmed: " + propertyName);
        message.setText("Hello " + userName + ",\n\nYour booking for " + propertyName + " has been confirmed!\n\nThank you for choosing StayNestora.");
        message.setFrom("your-email@gmail.com");

        mailSender.send(message);
    }
}
