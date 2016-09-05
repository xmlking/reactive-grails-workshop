import trustbroker.CustomUserDetailsService

// Place your Spring DSL code here
beans = {
    userDetailsService(CustomUserDetailsService)
    // TODO
    // customClaimProvider(MultiTenantCustomClaimProvider)
}
