package Stay.Nestora.service;

import io.imagekit.sdk.ImageKit;
import io.imagekit.sdk.models.FileCreateRequest;
import io.imagekit.sdk.models.results.Result;
import org.springframework.stereotype.Service;

import java.util.Base64;

@Service
public class ImageStorageService {
    private final ImageKit imageKit;

    public ImageStorageService(ImageKit imageKit) {
        this.imageKit = imageKit;
    }

    public String uploadImage(byte[] fileBytes, String fileName) {
        try {
            String base64File = Base64.getEncoder().encodeToString(fileBytes);

            FileCreateRequest request = new FileCreateRequest(
                    base64File, fileName
            );
            request.setFolder("/properties"); // Optional folder

            Result result = imageKit.upload(request);
            return result.getUrl(); // Returns uploaded image URL
        } catch (Exception e) {
            throw new RuntimeException("Image upload failed", e);
        }
    }
}
