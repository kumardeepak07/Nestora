package Stay.Nestora.dto;

import Stay.Nestora.model.Role;

public class ChangeRoleRequest {
    private Role role;


    public void setRole(Role role) {
        this.role = role;
    }

    public Role getRole() {
        return role;
    }
}
