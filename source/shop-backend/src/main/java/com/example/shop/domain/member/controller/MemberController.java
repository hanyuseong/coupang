package com.example.shop.domain.member.controller;

import com.example.shop.global.common.ApiResponse;
import com.example.shop.domain.member.dto.MemberDto;
import com.example.shop.domain.member.dto.SignUpRequest;
import com.example.shop.domain.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<MemberDto>> getMyInfo() {
        MemberDto memberDto = memberService.getMyInfo();
        return ResponseEntity.ok(ApiResponse.ok(memberDto));
    }

    @PutMapping("/me")
    public ResponseEntity<ApiResponse<String>> updateMyInfo(@RequestBody MemberDto memberDto) {
        memberService.updateMyInfo(memberDto);
        return ResponseEntity.ok(ApiResponse.ok("?뚯썝 ?뺣낫媛 ?섏젙?섏뿀?듬땲??"));
    }

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<MemberDto>> signUp(@RequestBody SignUpRequest signUpRequest) {
        MemberDto memberDto = memberService.signUp(signUpRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(memberDto));
    }
}
