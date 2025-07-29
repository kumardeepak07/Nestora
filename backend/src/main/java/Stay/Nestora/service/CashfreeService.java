package Stay.Nestora.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class CashfreeService {

    private final String clientId = "TEST107375958d220020a1fff40c180159573701";
    private final String clientSecret = "cfsk_ma_test_eb66a6543327987fc80c30875a278d03_5a62fe43";

    private final String tokenUrl = "https://sandbox.cashfree.com/pg/oauth/token";
    private final String orderUrl = "https://sandbox.cashfree.com/pg/orders";

    private String getAccessToken() throws Exception {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> body = new HashMap<>();
        body.put("client_id", clientId);
        body.put("client_secret", clientSecret);
        body.put("grant_type", "client_credentials");

        HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(tokenUrl, request, Map.class);
        return (String) response.getBody().get("access_token");
    }

    public String createOrder(String orderId, double amount, String customerEmail) throws Exception {
        String token = getAccessToken();

        HttpHeaders headers = new org.springframework.http.HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-api-version", "2022-09-01");

        Map<String, Object> orderPayload = new HashMap<>();
        orderPayload.put("order_id", orderId);
        orderPayload.put("order_amount", amount);
        orderPayload.put("order_currency", "INR");

        Map<String, String> customer = new HashMap<>();
        customer.put("customer_id", UUID.randomUUID().toString());
        customer.put("customer_email", customerEmail);
        customer.put("customer_phone", "9999999999");

        orderPayload.put("customer_details", customer);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(orderPayload, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.postForEntity(orderUrl, entity, Map.class);

        Map orderData = (Map) response.getBody().get("order_token");
        return (String) response.getBody().get("payment_link"); // Or use order_token to load via JS SDK
    }
}
