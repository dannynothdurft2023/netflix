import { signOut } from "next-auth/react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementUser } from "@/module/redux/reducer/user";
import { logout } from "@/module/auth";
import { useRouter } from "next/navigation";

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state: any) => state.user);

  if (!visible) {
    return null;
  }

  const _logout = async () => {
    const action = await logout();
    if (action) {
      dispatch(incrementUser(null));
      router.push("/auth");
    }
  };

  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <img
            className="w-8 rounded-md"
            src="/images/default-blue.png"
            alt=""
          />
          <p className="text-white text-sm group-hover/item:underline">
            {user?.username}
          </p>
        </div>
      </div>
      <hr className="bg-gray-600 border-0 h-px my-4" />
      <div
        onClick={_logout}
        className="px-3 text-center text-white text-sm hover:underline"
      >
        Sign out of Netflix
      </div>
    </div>
  );
};

export default AccountMenu;
