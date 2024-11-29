import { Status } from "@prisma/client";

export const issues = [
  {
    title: "Login Page Error",
    description: "Users are encountering an unexpected error when trying to log in.",
    status: Status.OPEN,
    createdAt: new Date("2024-07-01T08:15:00"),
    updatedAt: new Date("2024-07-01T08:15:00"),
    assignedToUserId: null,
  },
  {
    title: "Profile Picture Upload Failed",
    description: "Several users have reported that their profile picture uploads are failing.",
    status: Status.IN_PROGRESS,
    createdAt: new Date("2024-07-02T10:30:00"),
    updatedAt: new Date("2024-07-02T10:35:00"),
    assignedToUserId: null,
  },
  {
    title: "Dashboard Load Time",
    description: "The dashboard is taking an unusually long time to load for many users.",
    status: Status.CLOSED,
    createdAt: new Date("2024-07-03T12:00:00"),
    updatedAt: new Date("2024-07-03T12:10:00"),
    assignedToUserId: null,
  },
  {
    title: "Notification Bug",
    description: "Notifications are not being marked as read after being clicked.",
    status: Status.OPEN,
    createdAt: new Date("2024-07-04T09:20:00"),
    updatedAt: new Date("2024-07-04T09:20:00"),
    assignedToUserId: null,
  },
  {
    title: "Password Reset Issues",
    description: "Password reset emails are not being sent to users who request them.",
    status: Status.IN_PROGRESS,
    createdAt: new Date("2024-07-05T14:45:00"),
    updatedAt: new Date("2024-07-05T14:50:00"),
    assignedToUserId: null,
  },
  {
    title: "Search Functionality",
    description: "Search results are not displaying accurate information.",
    status: Status.CLOSED,
    createdAt: new Date("2024-07-06T11:05:00"),
    updatedAt: new Date("2024-07-06T11:15:00"),
    assignedToUserId: null,
  },
  {
    title: "User Registration Error",
    description: "New users are unable to complete the registration process.",
    status: Status.OPEN,
    createdAt: new Date("2024-07-07T15:30:00"),
    updatedAt: new Date("2024-07-07T15:30:00"),
    assignedToUserId: null,
  },
  {
    title: "Email Verification",
    description: "Email verification links are not working properly.",
    status: Status.IN_PROGRESS,
    createdAt: new Date("2024-07-08T08:50:00"),
    updatedAt: new Date("2024-07-08T08:55:00"),
    assignedToUserId: null,
  },
  {
    title: "File Download Issue",
    description: "Files are not downloading correctly from the user portal.",
    status: Status.CLOSED,
    createdAt: new Date("2024-07-09T10:25:00"),
    updatedAt: new Date("2024-07-09T10:35:00"),
    assignedToUserId: null,
  },
  {
    title: "Account Suspension Error",
    description: "Accounts are being suspended without valid reasons.",
    status: Status.OPEN,
    createdAt: new Date("2024-07-10T13:00:00"),
    updatedAt: new Date("2024-07-10T13:00:00"),
    assignedToUserId: null,
  },
  {
    title: "Mobile App Crash",
    description: "The mobile app crashes on the latest OS update.",
    status: Status.IN_PROGRESS,
    createdAt: new Date("2024-07-11T09:45:00"),
    updatedAt: new Date("2024-07-11T09:50:00"),
    assignedToUserId: null,
  },
  {
    title: "Payment Gateway Failure",
    description: "Payments are failing during checkout.",
    status: Status.CLOSED,
    createdAt: new Date("2024-07-12T11:20:00"),
    updatedAt: new Date("2024-07-12T11:25:00"),
    assignedToUserId: null,
  },
  {
    title: "Profile Edit Bug",
    description: "Users cannot save changes to their profiles.",
    status: Status.OPEN,
    createdAt: new Date("2024-07-13T14:40:00"),
    updatedAt: new Date("2024-07-13T14:40:00"),
    assignedToUserId: null,
  },
  {
    title: "Session Timeout",
    description: "User sessions are timing out too quickly.",
    status: Status.IN_PROGRESS,
    createdAt: new Date("2024-07-14T16:30:00"),
    updatedAt: new Date("2024-07-14T16:35:00"),
    assignedToUserId: null,
  },
  {
    title: "Multi-Factor Authentication",
    description: "MFA codes are not being sent to users.",
    status: Status.CLOSED,
    createdAt: new Date("2024-07-15T08:10:00"),
    updatedAt: new Date("2024-07-15T08:20:00"),
    assignedToUserId: null,
  },
  {
    title: "Language Translation Errors",
    description: "Several translation errors are present in the UI.",
    status: Status.OPEN,
    createdAt: new Date("2024-07-16T12:55:00"),
    updatedAt: new Date("2024-07-16T12:55:00"),
    assignedToUserId: null,
  },
  {
    title: "API Rate Limiting",
    description: "API rate limits are being exceeded too quickly.",
    status: Status.IN_PROGRESS,
    createdAt: new Date("2024-07-17T14:10:00"),
    updatedAt: new Date("2024-07-17T14:15:00"),
    assignedToUserId: null,
  },
  {
    title: "User Feedback Submission",
    description: "Feedback forms are not submitting properly.",
    status: Status.CLOSED,
    createdAt: new Date("2024-07-18T09:00:00"),
    updatedAt: new Date("2024-07-18T09:10:00"),
    assignedToUserId: null,
  },
  {
    title: "Theme Customization",
    description: "Custom themes are not being applied to user profiles.",
    status: Status.OPEN,
    createdAt: new Date("2024-07-19T11:35:00"),
    updatedAt: new Date("2024-07-19T11:35:00"),
    assignedToUserId: null,
  },
  {
    title: "Data Export Failure",
    description: "Data exports are failing to generate.",
    status: Status.IN_PROGRESS,
    createdAt: new Date("2024-07-20T15:20:00"),
    updatedAt: new Date("2024-07-20T15:25:00"),
    assignedToUserId: null,
  },
];
