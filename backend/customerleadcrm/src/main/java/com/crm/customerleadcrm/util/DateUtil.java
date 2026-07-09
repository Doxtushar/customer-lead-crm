package com.crm.customerleadcrm.util;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public final class DateUtil {

    private DateUtil() {
    }

    public static final String DEFAULT_DATE_PATTERN = "dd-MM-yyyy";
    public static final String DEFAULT_DATE_TIME_PATTERN = "dd-MM-yyyy HH:mm:ss";

    private static final DateTimeFormatter DATE_FORMATTER =
            DateTimeFormatter.ofPattern(DEFAULT_DATE_PATTERN);

    private static final DateTimeFormatter DATE_TIME_FORMATTER =
            DateTimeFormatter.ofPattern(DEFAULT_DATE_TIME_PATTERN);

    public static String formatDate(LocalDate date) {
        return date == null ? "" : date.format(DATE_FORMATTER);
    }

    public static String formatDateTime(LocalDateTime dateTime) {
        return dateTime == null ? "" : dateTime.format(DATE_TIME_FORMATTER);
    }

    public static LocalDate parseDate(String date) {
        return (date == null || date.isBlank())
                ? null
                : LocalDate.parse(date, DATE_FORMATTER);
    }

    public static String today() {
        return LocalDate.now().format(DATE_FORMATTER);
    }

    public static LocalDate currentDate() {
        return LocalDate.now();
    }

    public static LocalDate nextDays(int days) {
        return LocalDate.now().plusDays(days);
    }

    public static boolean isToday(LocalDate date) {
        return LocalDate.now().equals(date);
    }

    public static boolean isPast(LocalDate date) {
        return date != null && date.isBefore(LocalDate.now());
    }

    public static boolean isFuture(LocalDate date) {
        return date != null && date.isAfter(LocalDate.now());
    }
}