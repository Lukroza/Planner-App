package com.PlannerApp.PlannerApp.Services;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public class SqlProvider {
    public static String deleteEventsByUserIds(Map<String, Object> params) {
        @SuppressWarnings("unchecked")
        List<UUID> userIds = (List<UUID>) params.get("userIds");
        StringBuilder sql = new StringBuilder();
        sql.append("DELETE FROM event WHERE user_id IN (");
        for (int i = 0; i < userIds.size(); i++) {
            if (i > 0) {
                sql.append(",");
            }
            sql.append("#{userIds[").append(i).append("]}");
        }
        sql.append(")");
        return sql.toString();
    }
}

