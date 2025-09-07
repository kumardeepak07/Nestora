package Stay.Nestora.service;

import Stay.Nestora.dto.AuthResponse;
import Stay.Nestora.dto.RegisterRequest;
import Stay.Nestora.jwt.JwtService;
import Stay.Nestora.model.Role;
import Stay.Nestora.model.User;
import Stay.Nestora.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepo;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authManager;

    public AuthResponse register(RegisterRequest req) {
        User user = User.builder()
                .name(req.getName())
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .role(Role.USER)
                .build();
        userRepo.save(user);
        String jwt = jwtService.generateToken((UserDetails) user);
        return new AuthResponse(jwt);
    }
}

