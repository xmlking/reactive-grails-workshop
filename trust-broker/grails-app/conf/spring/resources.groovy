import trustbroker.CorsFilter
import trustbroker.CustomUserDetailsService

// Place your Spring DSL code here
beans = {
    corsFilter(CorsFilter)
    userDetailsService(CustomUserDetailsService)
    // TODO
    // customClaimProvider(MultiTenantCustomClaimProvider)
}
