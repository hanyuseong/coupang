package com.example.shop.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Builder;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddressDto {
    private Long addressId;
    private String receiverName;
    private String receiverPhone;
    private String zipcode;
    private String addr1;
    private String addr2;
    private boolean isDefault;
}
