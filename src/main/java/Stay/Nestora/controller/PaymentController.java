package Stay.Nestora.controller;

import Stay.Nestora.service.CashfreeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;


@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final CashfreeService cashfreeService;

    @PostMapping("/create")
    public ResponseEntity<String> createPayment(@RequestParam String email, @RequestParam double amount) {
        try {
            String paymentLink = cashfreeService.createOrder(UUID.randomUUID().toString(), amount, email);
            return ResponseEntity.ok(paymentLink);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create payment");
        }
    }
}
