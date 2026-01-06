import { redirect } from "next/navigation";

export default function AdminRedirect() {
    return redirect("/dashboard/admin");
}
