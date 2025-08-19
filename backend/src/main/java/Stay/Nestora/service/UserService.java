package Stay.Nestora.service;

import Stay.Nestora.dto.ApiResponse;
import Stay.Nestora.jwt.JwtService;
import Stay.Nestora.model.Property;
import Stay.Nestora.model.User;
import Stay.Nestora.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    public ApiResponse<User> checkUserAuthentication(String authToken) {
        if (authToken == null) {
            return new ApiResponse<User>(false, null, "User is not authorized");

        }
        String username;
        try {
            username = jwtService.extractUsername(authToken);
        } catch (Exception e) {
            return new ApiResponse<User>(false, null, "User is not authorized");
        }
        User user = userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        return new ApiResponse<User>(true, user, "Authirization successful");

    }

}
