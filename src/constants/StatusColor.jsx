import { GoDotFill } from "react-icons/go";
import React from "react";

export function StatusColor({ status }) {
  let colorClass = "";

  switch (status) {
    case "Awaiting Approval":
      colorClass = "text-orange-500";
      break;
    case "Approved":
      colorClass = "text-blue-500";
      break;
    case "Request Completed":
      colorClass = "text-blue-500";
      break;
    case "New":
      colorClass = "text-green-500";
      break;
    case "On Hold":
      colorClass = "text-red-500";
      break;
    case "Cancelled":
      colorClass = "text-gray-500";
      break;
    default:
      colorClass = "text-black";
      break;
  }

  return (
    <div className={colorClass}>
      <GoDotFill />
    </div>
  );
}

export function statusColor(status) {
  const lowerStatus = status?.toLowerCase();

  const statusMap = {
    awaiting: "text-orange-500",
    amendment: "text-purple-600",
    active: "text-green-600",
    signed: "text-blue-500",
    expired: "text-slate-500",
    new: "text-green-600",
    ready: "text-green-600",
    expired: "text-slate-500",
    replaced: "text-slate-500",
    hold: "text-red-500",
  };

  for (const key in statusMap) {
    if (lowerStatus?.includes(key)) {
      return statusMap[key];
    }
  }
}
