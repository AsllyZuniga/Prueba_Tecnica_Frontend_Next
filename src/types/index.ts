import type { ReactNode } from "react";

export type FlowId = "incident" | "membership";

export type FlowStep =
  | "container"
  | "incident"
  | "work-order"
  | "membership"
  | "member-profile";

export type IncidentPriority = "low" | "medium" | "high" | "critical";
export type IncidentStatus = "pending" | "in-progress" | "resolved";
export type WorkOrderStatus = "pending" | "in-progress" | "completed";
export type MembershipStatus = "draft" | "active" | "suspended";

export interface RoomContainer {
  id: string;
  name: string;
  code: string;
  status: "review" | "active" | "inactive";
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  room: string;
  priority: IncidentPriority;
  status: IncidentStatus;
  assignee: string;
  slaHours: number;
  createdAt: string;
  updatedAt: string;
}

export interface WorkOrder {
  id: string;
  incidentId: string;
  title: string;
  status: WorkOrderStatus;
  assignee: string;
  startedAt?: string;
  completedAt?: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  durationDays: number;
  status: MembershipStatus;
  notes?: string;
}

export interface MemberProfile {
  id: string;
  fullName: string;
  email?: string;
  phone?: string;
  isActive: boolean;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface FormField {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "select"
    | "textarea"
    | "checkbox"
    | "time";
  required?: boolean;
  placeholder?: string;
  options?: SelectOption[];
  value?: string | number | boolean;
  error?: string;
}

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  width?: string;
  render?: (value: unknown, row: T) => ReactNode;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "operator" | "viewer";
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path?: string;
  flow?: FlowId;
  items?: MenuItem[];
  badge?: number;
}
