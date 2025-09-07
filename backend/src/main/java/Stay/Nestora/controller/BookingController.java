package Stay.Nestora.controller;


import Stay.Nestora.dto.ApiResponse;
import Stay.Nestora.dto.BookingRequest;
import Stay.Nestora.dto.DashboardResponse;
import Stay.Nestora.model.Booking;
import Stay.Nestora.model.User;
import Stay.Nestora.repository.BookingRepository;
import Stay.Nestora.repository.UserRepository;
import Stay.Nestora.service.BookingService;
import Stay.Nestora.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;
    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final UserService userService;

    @PostMapping("/upload-proof")
    public ApiResponse<?> uploadProof(@RequestParam("file") MultipartFile file) throws IOException {
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path path = Paths.get("uploads/" + fileName);
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        return new ApiResponse<>(true, fileName, "Proof has been uploaded successfully");
    }

    @GetMapping("/my-bookings")
    public ApiResponse<?> getUserBookings(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
        List<Booking> bookings = bookingRepository.findByUser(user);
        return new ApiResponse<>(true, user, "Bookings have been found");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ApiResponse<?> getAllBookings() {
        return new ApiResponse<>(true, bookingRepository.findAll(), "Bookings have been found");
    }

    @PostMapping("/book-property")
    public ApiResponse<?> createBooking(@RequestBody BookingRequest request) {
        Booking booking = bookingService.bookProperty(request);
        if(booking != null) {
            return new ApiResponse<>(true, booking, "Booking has been created successfully");
        }
        return new ApiResponse<>(false, null, "Rooms not Available");
    }

    @GetMapping("/owner-bookings")
    public ApiResponse<?> getOwnerBookings(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        ApiResponse<User> apiResponse = userService.checkUserAuthentication(authHeader);

        if (!apiResponse.isSuccess()) {
            return new ApiResponse<>(false,apiResponse.getMessage(),null);
        }

        User owner = apiResponse.getData();

        List<Booking> bookings = bookingService.getBookingsByOwner(owner.getId());
        return new ApiResponse<>(true, bookings, "Owner's property bookings fetched successfully");
    }

    @GetMapping("/owner-dashboard")
    public ApiResponse<?> getOwnerDashboard(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        ApiResponse<User> apiResponse = userService.checkUserAuthentication(authHeader);

        if (!apiResponse.isSuccess()) {
            return new ApiResponse<>(false,apiResponse.getMessage(),"Dashboard Data Not Fetched");
        }
        User owner = apiResponse.getData();
        DashboardResponse dashboardResponse = bookingService.getOwnerDashboardData(owner.getId(), owner.getEmail());
        return new ApiResponse<>(true, dashboardResponse, "Owner's dashboard fetched successfully");
    }
    @PostMapping("/change-status")
    public ApiResponse<?> changeBookingStatus(@RequestParam Long id, @RequestParam String status) {
        Booking updatedBooking = bookingService.updateBookingStatus(id, status);

        return new ApiResponse<>(true, updatedBooking, "Booking status updated successfully");
    }

    @GetMapping("/user")
    public ApiResponse<?> getUserBooking(@RequestParam Long id){
        List<Booking> bookings = bookingRepository.findByUser_Id(id);
        return new ApiResponse<>(true, bookings, "User's booking fetched successfully");
    }
}
