package Stay.Nestora.model;

import org.springframework.security.core.GrantedAuthority;

public enum PropertyCategory implements GrantedAuthority {
    VILLA, RESORT, HOTEL, HOSTEL, LODGE, APARTMENT, PG;

    @Override
    public String getAuthority() {
        return name();
    }
}
