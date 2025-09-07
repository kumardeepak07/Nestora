package Stay.Nestora.service;

import Stay.Nestora.model.NewsLetter;
import Stay.Nestora.repository.NewsletterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NewsLetterService {

    private final NewsletterRepository newsletterRepository;

    public NewsLetter subscribe(String email) {
        List<NewsLetter> newsLetters = newsletterRepository.findByEmail(email);
        if (newsLetters.isEmpty()) {
            NewsLetter newsLetter = NewsLetter.builder()
                    .email(email)
                    .build();
            newsletterRepository.save(newsLetter);
            return newsLetter;
        }
        return null;
    }
}
