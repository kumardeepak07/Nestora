package Stay.Nestora.controller;

import Stay.Nestora.service.AuthService;
import Stay.Nestora.dto.*;
import Stay.Nestora.jwt.JwtService;
import Stay.Nestora.model.User;
import Stay.Nestora.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ApiResponse<?> register(@RequestBody RegisterRequest req) {
        Optional<User> user = userRepository.findByEmail(req.getEmail());
        if(user.isPresent()) {
            return new ApiResponse<String>(false, null, "User already exists");
        }
        ApiResponse<String> apiResponse = new ApiResponse<String>(true, authService.register(req).getToken(),"User Added Successfully");
        return apiResponse;
    }

    @PostMapping("/login")
    public ApiResponse<?> login(@RequestBody LoginRequest request) {
        try {
            // Authenticate with Spring Security
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
            UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
            // Generate JWT token
            String token = jwtService.generateToken(userDetails);
            // Return the token
            ApiResponse<String> apiResponse = new ApiResponse<String>(true, token,"User Added Successfully");
            return apiResponse;
        } catch (Exception e) {
            ApiResponse<String> apiResponse = new ApiResponse<String>(false, null, e.getMessage());
            return apiResponse;
        }
    }
}
