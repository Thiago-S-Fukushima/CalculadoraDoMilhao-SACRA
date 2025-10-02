import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAuthGuard = () => {
    const router = useRouter();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            router.push("/");
        }
    }, []);
};