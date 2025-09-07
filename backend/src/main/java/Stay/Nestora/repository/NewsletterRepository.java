package Stay.Nestora.repository;

import Stay.Nestora.model.NewsLetter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NewsletterRepository extends JpaRepository<NewsLetter,Long> {
    List<NewsLetter> findByEmail(String email);
}
