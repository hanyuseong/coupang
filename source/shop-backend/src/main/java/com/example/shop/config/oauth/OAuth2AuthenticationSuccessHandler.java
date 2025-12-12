package com.example.shop.config.oauth;

import com.example.shop.config.JwtTokenProvider;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;
    // Hardcoded for now, can be moved to application.yml
    private final String FRONTEND_URL = "http://localhost:3000";

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
        log.info("@@@ OAuth2 Login SUCCESS!");
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();
        log.info("@@@ User Attributes: {}", attributes);

        // We put email in the attributes map in CustomOAuth2UserService
        String email = (String) attributes.get("email");
        log.info("@@@ Extracted Email: {}", email);

        String accessToken = jwtTokenProvider.generateAccessToken(email);
        String refreshToken = jwtTokenProvider.generateRefreshToken(email);

        // Add Refresh Token as HttpOnly Cookie
        Cookie refreshCookie = new Cookie("refreshToken", refreshToken);
        refreshCookie.setHttpOnly(true);
        refreshCookie.setSecure(false); // Set true in production (HTTPS)
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(14 * 24 * 60 * 60); // 14 days
        response.addCookie(refreshCookie);

        // Redirect to Frontend with Access Token
        String targetUrl = UriComponentsBuilder.fromUriString(FRONTEND_URL)
                .path("/login/oauth2/callback") // Frontend route to handle callback
                .queryParam("accessToken", accessToken)
                .build().toUriString();

        log.info("@@@ Redirecting to: {}", targetUrl);

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}
