package Stay.Nestora.controller;

import Stay.Nestora.dto.ApiResponse;
import Stay.Nestora.model.NewsLetter;
import Stay.Nestora.repository.NewsletterRepository;
import Stay.Nestora.service.NewsLetterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/newsletter")
@RequiredArgsConstructor
public class NewsLetterController {
    private final NewsLetterService newsLetterService;

    @PostMapping("/subscribe")
    public ApiResponse<?> subscribe(@RequestParam String email) {
        NewsLetter newsletter = newsLetterService.subscribe(email);
        if (newsletter != null) {
            return new ApiResponse<NewsLetter>(true, newsletter, "Subscribed successfully");
        }
        return new ApiResponse<NewsLetter>(false, null, "User Already Subscribed");
    }
}
