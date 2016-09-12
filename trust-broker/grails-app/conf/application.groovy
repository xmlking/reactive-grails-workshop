// For spring security rest
grails.plugin.springsecurity.rest.token.storage.jwt.expiration = 3600
grails.plugin.springsecurity.rest.token.storage.jwt.secret = 'qrD6h8K6S9503Q06Y6Rfk21TErImPYqa'
//grails.plugin.springsecurity.rest.token.storage.jwt.useEncryptedJwt = true
//grails.plugin.springsecurity.rest.token.storage.jwt.privateKeyPath = '/path/to/private_key.der'
//grails.plugin.springsecurity.rest.token.storage.jwt.publicKeyPath = '/path/to/public_key.der'

// Added by the Spring Security Core plugin:
grails.plugin.springsecurity.userLookup.userDomainClassName = 'trustbroker.User'
grails.plugin.springsecurity.userLookup.authorityJoinClassName = 'trustbroker.UserRole'
grails.plugin.springsecurity.authority.className = 'trustbroker.Role'

grails.plugin.springsecurity.roleHierarchy = '''
   ROLE_SUPERADMIN > ROLE_ADMIN
   ROLE_ADMIN > ROLE_USER
'''

grails.plugin.springsecurity.controllerAnnotations.staticRules = [
        [pattern: '/',               access: ['permitAll']],
        [pattern: '/error',          access: ['permitAll']],
        [pattern: '/index',          access: ['permitAll']],
        [pattern: '/index.gsp',      access: ['permitAll']],
        [pattern: '/shutdown',       access: ['permitAll']],
        [pattern: '/assets/**',      access: ['permitAll']],
        [pattern: '/**/js/**',       access: ['permitAll']],
        [pattern: '/**/css/**',      access: ['permitAll']],
        [pattern: '/**/images/**',   access: ['permitAll']],
        [pattern: '/**/favicon.ico', access: ['permitAll']]
]

grails.plugin.springsecurity.filterChain.chainMap = [
        [pattern: '/assets/**',      filters: 'none'],
        [pattern: '/**/js/**',       filters: 'none'],
        [pattern: '/**/css/**',      filters: 'none'],
        [pattern: '/**/images/**',   filters: 'none'],
        [pattern: '/**/favicon.ico', filters: 'none'],
        // a stateless chain for guests that allows anonymous access when no token is sent. If however a token is on the request, it will be validated.
        [pattern: '/api/guest/**',   filters: 'anonymousAuthenticationFilter,restTokenValidationFilter,restExceptionTranslationFilter,filterInvocationInterceptor'],
        // a stateless chain that doesn’t allow anonymous access. Thus, the token will always be required
        [pattern: '/api/**',         filters: 'JOINED_FILTERS,-anonymousAuthenticationFilter,-exceptionTranslationFilter,-authenticationProcessingFilter,-securityContextPersistenceFilter,-rememberMeAuthenticationFilter'],
]
