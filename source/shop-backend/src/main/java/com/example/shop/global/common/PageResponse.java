package com.example.shop.global.common;

import java.util.List;

public class PageResponse<T> {
    private List<T> content;
    private int page;
    private int totalPages;
    private long totalElements;
    private boolean last;

    public PageResponse(List<T> content, int page, int totalPages, long totalElements, boolean last) {
        this.content = content;
        this.page = page;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
        this.last = last;
    }

    public List<T> getContent() {
        return content;
    }

    public int getPage() {
        return page;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public long getTotalElements() {
        return totalElements;
    }

    public boolean isLast() {
        return last;
    }

    public static <T> PageResponse<T> of(List<T> content, int page, int totalPages, long totalElements, boolean last) {
        return new PageResponse<>(content, page, totalPages, totalElements, last);
    }
}
