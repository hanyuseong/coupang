package com.example.shop.domain.category.service.impl;

import com.example.shop.domain.category.dto.CategoryDto;
import com.example.shop.domain.category.entity.Category;
import com.example.shop.domain.category.repository.CategoryRepository;
import com.example.shop.domain.category.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<CategoryDto> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private CategoryDto convertToDto(Category category) {
        return new CategoryDto(category.getCategoryId(), category.getName(), category.getDepth());
    }
}