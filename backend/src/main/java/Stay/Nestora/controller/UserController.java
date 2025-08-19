package Stay.Nestora.controller;

import Stay.Nestora.auth.AuthService;
import Stay.Nestora.dto.ApiResponse;
import Stay.Nestora.dto.ChangeRoleRequest;
import Stay.Nestora.jwt.JwtService;
import Stay.Nestora.model.Property;
import Stay.Nestora.model.Role;
import Stay.Nestora.model.User;
import Stay.Nestora.repository.PropertyRepository;
import Stay.Nestora.repository.UserRepository;
import Stay.Nestora.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;
    private final AuthService authService;
    private final JwtService jwtService;
    private final UserService userService;
    private final UserDetailsService userDetailsService;

    @GetMapping
    public ResponseEntity<List<User>> getAll() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @GetMapping("/get-user")
    public ResponseEntity<?> getUserData(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse<User>(false, null, "User is not authorized"));
        }

        String username;
        try {
            username = jwtService.extractUsername(authHeader);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse<User>(false, null, "Invalid token"));
        }
        User user = userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        return ResponseEntity.ok(new ApiResponse<User>(true, user, "User found"));
    }

    @GetMapping("/get-properties")
    public ResponseEntity<?> getProperties(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse<Property>(false, null, "User is not authorized"));
        }

        String username;
        try {
            username = jwtService.extractUsername(authHeader);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse<Property>(false, null, "Invalid token"));
        }
        User user = userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        List<Property> properties = null;
        if(username == null) {
            properties = propertyRepository.findByOwnerId(user.getId());
        }
        return ResponseEntity.ok(new ApiResponse<List<Property>>(true, properties, "User found"));
    }

    @PutMapping("/change-role")
    public ResponseEntity<?> changeUserRole(@RequestBody ChangeRoleRequest role, HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        ApiResponse<User> apiResponse = userService.checkUserAuthentication(authHeader);
        if(apiResponse.isSuccess()) {
            User user = apiResponse.getData();
            user.setRole(role.getRole());
            userRepository.save(user);
        }
        return ResponseEntity.ok(apiResponse);
    }
}
