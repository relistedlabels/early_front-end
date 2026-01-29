import Breadcrumbs from "@/common/ui/BreadcrumbItem";
import DashboardLayout from "../components/DashboardLayout";
import InventoryList from "../components/InventoryList";


export default function Page() {
    const path = [
      { label: "Dashboard", href: "/curators/dashboard" },
      { label: "Inventory", href: null }, // Current page, href is null
    ];
  return (
    <DashboardLayout>
      <div className=" mb-4 px-4 sm:px-0 ">
        <Breadcrumbs items={path} />{" "}
      </div>
      <InventoryList />
    </DashboardLayout>
  );
}
