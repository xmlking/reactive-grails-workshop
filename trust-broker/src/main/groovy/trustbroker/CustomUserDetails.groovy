package trustbroker

import grails.plugin.springsecurity.userdetails.GrailsUser
import org.springframework.security.core.GrantedAuthority

class CustomUserDetails extends GrailsUser {
    final String organizationId
    final String firstName
    final String lastName
    final String email

    CustomUserDetails(String username, String password, boolean enabled,
                      boolean accountNonExpired, boolean credentialsNonExpired,
                      boolean accountNonLocked,
                      Collection<GrantedAuthority> authorities,
                      long id, String organizationId,
                      String firstName,  String lastName,  String email) {
        super(username, password, enabled, accountNonExpired,
                credentialsNonExpired, accountNonLocked, authorities, id)

        this.organizationId = organizationId
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
    }
}
