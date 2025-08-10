package Stay.Nestora.config;

import io.imagekit.sdk.ImageKit;
import io.imagekit.sdk.config.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;

@org.springframework.context.annotation.Configuration
public class ImageKitConfig {

    private Environment environment;
    public ImageKitConfig(Environment environment) {
        this.environment = environment;
    }


    @Bean
    public ImageKit imageKit() {
        ImageKit imageKit = ImageKit.getInstance();
        Configuration config = new Configuration(
                environment.getProperty("PublicKey"),
                environment.getProperty("PrivateKey"),
                environment.getProperty("UrlEndpoint"));
        imageKit.setConfig(config);
        return ImageKit.getInstance();
    }

}
