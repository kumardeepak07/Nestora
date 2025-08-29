package Stay.Nestora.service;

import io.imagekit.sdk.ImageKit;
import io.imagekit.sdk.models.FileCreateRequest;
import io.imagekit.sdk.models.results.Result;
import org.hibernate.annotations.Array;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ImageStorageService {
    private final ImageKit imageKit;

    public ImageStorageService(ImageKit imageKit) {
        this.imageKit = imageKit;
    }

    public String uploadImage(byte[] fileBytes, String fileName, String folderName) {
        try {
            String base64File = Base64.getEncoder().encodeToString(fileBytes);

            FileCreateRequest request = new FileCreateRequest(
                    base64File, fileName
            );
            request.setFolder("/" + folderName); // Optional folder

            Result result = imageKit.upload(request);

            // Optimization of Image
            List<Map<String, String>> transformation = new ArrayList<>();
            Map<String, String> scale = new HashMap<>();
            scale.put("width","400");
            scale.put("quality","auto");
            scale.put("format", "webp");
            transformation.add(scale);
            Map<String, Object> options = new HashMap();
            options.put("path", result.getFilePath());
            options.put("transformation", transformation);

            String image_url = ImageKit.getInstance().getUrl(options);
            return image_url; // Returns uploaded image URL
        } catch (Exception e) {
            throw new RuntimeException("Image upload failed", e);
        }
    }
}
