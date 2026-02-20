/**
 * Admin authentication - JWT-based
 * Verifies admin token from Authorization header or cookie
 */

import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-dev-secret-min-32-chars";

export interface AdminPayload {
  adminId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export function createAdminToken(payload: Omit<AdminPayload, "iat" | "exp">): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyAdminToken(token: string): AdminPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminPayload;
    return decoded;
  } catch {
    return null;
  }
}

export function getAdminFromRequest(req: NextRequest): AdminPayload | null {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : req.cookies.get("admin_token")?.value;

  if (!token) return null;
  return verifyAdminToken(token);
}
