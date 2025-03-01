import { fetchUserAddress } from "@/app/lib/data";
import { Suspense } from "react";
import { LoginButton } from "../login-button/login-button";
import { LoginButtonSkeleton } from "../skeletons/login-button-skeleton";

export const Header = async () => {
    return (
    <header
        className="flex justify-between p-4"
    >
        <div className="flex items-center">
            <p className="text-center">
                logo
            </p>
        </div>
        <Suspense key={'login-button-key'} fallback={<LoginButtonSkeleton />}>
            <LoginButton />
        </Suspense>
    </header>
  )
}
