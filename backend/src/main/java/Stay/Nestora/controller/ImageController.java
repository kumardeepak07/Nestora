package Stay.Nestora.controller;

import Stay.Nestora.dto.ApiResponse;
import Stay.Nestora.model.User;
import Stay.Nestora.repository.UserRepository;
import Stay.Nestora.service.ImageStorageService;
import Stay.Nestora.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageController {
    private final ImageStorageService imageStorageService;
    private final UserService userService;
    private final UserRepository userRepository;

    @PostMapping("/user-profile")
    public ApiResponse<?> uploadImage(HttpServletRequest request, @RequestParam("file") MultipartFile file) {
        try {
            String token = request.getHeader("Authorization");
            if (token != null) {
                token = token.replace("Bearer ", "");
                ApiResponse<User> apiResponse = userService.checkUserAuthentication(token);
                if (apiResponse.isSuccess()) {
                    User user = apiResponse.getData();
                    String imageUrl = imageStorageService.uploadImage(file.getBytes(), file.getOriginalFilename(), "/users");
                    user.setImage(imageUrl);
                    userRepository.save(user);
                    ApiResponse<User> updatedResponse = new ApiResponse<>(true, user, "Profile image updated successfully");
                    return updatedResponse;
                }
            }
        } catch (Exception e) {
            return new ApiResponse<>(false, null, "Image upload failed: " + e.getMessage());
        }
        return new ApiResponse<>(false, null, "Image upload failed");
    }
}
