package Stay.Nestora.controller;

import Stay.Nestora.dto.ApiResponse;
import Stay.Nestora.dto.PageResponse;
import Stay.Nestora.model.Property;
import Stay.Nestora.model.User;
import Stay.Nestora.repository.PropertyRepository;
import Stay.Nestora.service.ImageStorageService;
import Stay.Nestora.service.PropertyService;
import Stay.Nestora.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/properties")
@RequiredArgsConstructor
public class PropertyController {
    private final PropertyRepository propertyRepository;
    private final PropertyService propertyService;
    private final ImageStorageService imageStorageService;
    private final UserService userService;

    //CREATE
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> addProperty(
            @RequestPart("property") Property property,
            @RequestPart("image") MultipartFile imageFile,
            HttpServletRequest request) {
        try {
            String authHeader = request.getHeader("Authorization");
            ApiResponse<User> apiResponse = userService.checkUserAuthentication(authHeader);

            if (!apiResponse.isSuccess()) {
                return ResponseEntity.status(401).build(); // unauthorized
            }

            User loggedInUser = apiResponse.getData();
            // Upload image (you can use your ImageKit or other service here)
            String imageUrl = imageStorageService.uploadImage(
                    imageFile.getBytes(),
                    imageFile.getOriginalFilename(),
                    "property_image"
            );

            // attach image url to property
            property.setImage(imageUrl);
            property.setOwner(loggedInUser);

            // save property
            Property createdProperty = propertyService.createProperty(property);

            return ResponseEntity.ok(new ApiResponse<Property>(true,createdProperty,"Property Added"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }


    //READ ALL
    @GetMapping
    public ApiResponse<?> getAllProperties(Pageable pageable) {
        Page<Property> page = propertyRepository.findAll(pageable);

        PageResponse<Property> response = new PageResponse<>(
                page.getContent(),
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isLast()
        );

        return new ApiResponse<>(true, response, "Property");
    }

    @GetMapping("/my-properties")
    public ApiResponse<?> getMyProperties(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        ApiResponse<User> apiResponse = userService.checkUserAuthentication(authHeader);

        if (!apiResponse.isSuccess()) {
            return new ApiResponse<>(false,apiResponse.getMessage(),null);
        }

        User owner = apiResponse.getData();
        List<Property> properties = propertyService.getPropertiesByOwner(owner);

        return new ApiResponse<List<Property>>(true, properties,"Property List");
    }
    //READ ONE
    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Long id) {
        Optional<Property> property = propertyRepository.findById(id);
        return property.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Property> updateProperty(@PathVariable Long id, @RequestBody Property updated) {
        return propertyRepository.findById(id).map(existing -> {
            existing.setTitle(updated.getTitle());
            existing.setDescription(updated.getDescription());
            existing.setImage(updated.getImage());
            existing.setDaily_price(updated.getDaily_price());
            existing.setMonthly_price(updated.getMonthly_price());
            existing.setAddress(updated.getAddress());
            return ResponseEntity.ok(propertyRepository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    // DELETE
    @DeleteMapping("/delete-property/{id}")
    public ApiResponse<?> deleteProperty(@PathVariable Long id) {
        if (propertyRepository.existsById(id)) {
            propertyRepository.deleteById(id);
            return new ApiResponse<>(true,true,"Property Deleted");
        }
        return new ApiResponse<>(true,false,"Property Deletion Failed");
    }
    @PostMapping("/update-availablity")
    public ApiResponse<?> updateAvailable(@RequestBody Map<String, Object> request) {
        Long id = Long.valueOf(request.get("propertyId").toString());
        boolean available = Boolean.parseBoolean(request.get("availablity").toString());

        Property updateAvailabilityproperty = propertyService.updateAvailability(id, available);
        if (updateAvailabilityproperty != null) {
            return new ApiResponse<>(true, updateAvailabilityproperty, "Property Availability Updated");
        }
        return new ApiResponse<>(false, null, "Updation Failed");
    }
}
