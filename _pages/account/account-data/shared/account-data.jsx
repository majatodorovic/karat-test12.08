"use client";

import { getActiveTab } from "@/_pages/account/sidebar";
import { getActiveScreen } from "@/_pages/account/account-data";

export const AccountData = () => {
  const active_tab = getActiveTab();
  const active_screen = getActiveScreen(active_tab);

  return (
    <div
      className={`col-span-5 rounded-[24px] border bg-white px-4 py-4 shadow md:col-span-4`}
    >
      {active_screen}
    </div>
  );
};
