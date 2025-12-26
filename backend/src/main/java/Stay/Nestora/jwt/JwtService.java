package Stay.Nestora.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Service
public class JwtService {
    private static final String SECRET_KEY = environment.getProperty("JwtSecretKey");

    public String generateToken(UserDetails userDetails) {
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("authorities", userDetails.getAuthorities())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Key getSignInKey() {
        byte[] keyBytes = SECRET_KEY.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUsername(String token) {
        try{
            Claims claims = Jwts.parserBuilder()
                    .setAllowedClockSkewSeconds(60)
                    .setSigningKey(getSignInKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return claims.getSubject();
        }
        catch (Exception e){
            System.out.println("JWT expired at: " + e.getMessage());
        }
        return null;
    }

    public boolean isValid(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        return username != null && username.equals(userDetails.getUsername());
    }
}
