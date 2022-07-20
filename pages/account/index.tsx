import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { AiOutlineRight } from "react-icons/ai";
import { useQuery, useQueryClient } from "react-query";
import { ButtonGhost } from "../../components/Button";
import withLayout from "../../components/Layout";
import OnboardCard from "../../components/OnboardCard";
import { getUserProfile } from "../../lib/queries";

function Account() {
  /**
   * @Page => Account page
   * @States => cookies
   * @Event => Call getUserProfile() query function to get user data and render appropriately
   */

  const queryClient = useQueryClient();
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies();

  // DONE: Setup query and render data from returned data
  const { token } = cookies;
  console.log(token, "Token");
  const { data, isLoading, error } = useQuery(
    ["getUser", token],
    () => getUserProfile(token),
    {
      onSuccess({ success, message, data }) {
        console.info(data, "Data returned from fetching users");
      },
      onError(err) {
        console.error(err, "Error occurred while getting user");
      },
    }
  );

  return (
    <div className="w-full">
      <div
        style={{ backgroundImage: `url('${data?.data?.cover}')` }}
        className="flex flex-col items-start justify-start w-full bg-white mobile:p-3 mb-5 bg-cover bg-center bg-no-repeat"
      >
        <div
          className={`w-full mx-auto bg-transparent rounded-lg flex items-center space-x-4`}
        >
          <div className="shrink-0 rounded-xl border-solid bg-transparent p-0">
            <img
              src={
                data?.data?.avatar
                  ? data?.data?.avatar
                  : "/profile/sonergy_logo_icon.svg"
              }
              width={70}
              height={70}
              alt="Update bio data"
              className="rounded-full shadow h-auto align-middle border-none"
            />
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex-[4]">
              <div className="text-[16px] font-[700] text-gray-700 mb-2">
                {data?.data?.username}
              </div>
              <p className="text-xs text-gray-600 font-[400]">
                {data?.data?.email}
              </p>
            </div>
            {/* <AiOutlineRight size={16} color="black" /> */}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start w-full bg-transparent mobile:p-3 mb-5">
        <div className="w-full mb-4">
          <span className="text-gray-700 text-left text-lg font-medium">
            Profile
          </span>
          <OnboardCard>
            <MenuItem
              title="Update biodata"
              subText="Complete your profile"
              extra={null}
              icon={
                <img
                  src="/profile/user_square_icon.svg"
                  alt="Update bio data"
                />
              }
              onClick={(e) => {
                console.log(e, "Update biodata clicked");
                router.push("/account/biodata");
              }}
            />
            <div className="divider my-2"></div>
            <MenuItem
              title="Verification status"
              subText="Supply KYC information"
              extra={
                data?.data?.isVerified ? (
                  <div className="badge bg-green-600 text-white text-xs font-light border-none mt-0 mr-2 mx-auto">
                    Verified
                  </div>
                ) : (
                  <div className="badge bg-orange-400 text-white text-xs font-light border-none mt-0 mr-2 mx-auto">
                    Pending
                  </div>
                )
              }
              icon={
                <img
                  src="/profile/verification_icon.svg"
                  alt="Verification status"
                />
              }
              onClick={(e) => {
                console.log(e, "verification status clicked");
                router.push("/account/verification");
              }}
            />
            <div className="divider my-2"></div>
            <MenuItem
              title="My collections"
              subText="View your purchased NFTs"
              extra={null}
              icon={<img src="/profile/box_icon.svg" alt="My Collection" />}
              onClick={(e) => {
                console.log(e, "My Collections clicked");
                router.push("/market?dSort=collections");
              }}
            />
          </OnboardCard>
        </div>
        <div className="w-full mb-4">
          <span className="text-gray-700 text-left text-lg font-medium">
            Settings
          </span>
          <OnboardCard>
            <MenuItem
              title="Transaction PIN"
              subText="Set / change your transaction PIN"
              extra={null}
              icon={
                <img src="/settings/trx_pin_icon.svg" alt="Transaction PIN" />
              }
              onClick={(e) => {
                console.log(e, "Trx pin clicked");
                router.push("/account/trx_pin");
              }}
            />
            <div className="divider my-2"></div>
            <MenuItem
              title="Theme"
              subText="Set theme"
              extra={
                <span className="text-xs text-center text-gray-600 font-light mr-2">
                  Light mode
                </span>
              }
              icon={<img src="/settings/theme_icon.svg" alt="Theme icon" />}
              onClick={(e) => {
                console.log(e, "theme data clicked");
                router.push("/account/theme");
              }}
            />
            <div className="divider my-2"></div>
            <MenuItem
              title="Change Password"
              subText="Update or change your password"
              extra={null}
              icon={
                <img
                  src="/settings/change_pass_icon.svg"
                  alt="Change password"
                />
              }
              onClick={(e) => {
                console.log(e, "change password clicked");
                router.push("/account/change_password");
              }}
            />
          </OnboardCard>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center space-x-3 bg-transparent w-full mobile:p-4">
        <ButtonGhost
          type="normal"
          text="Logout"
          icon={undefined}
          iconPosition={undefined}
          block={true}
          onClick={(e) => {
            // TODO: Clear cookie and redirect to the login screen
            console.log(e, "Logout clicked");
            removeCookie("token");
            router.push("/login");
          }}
          disabled={false}
          isLoading={false}
        />
      </div>
    </div>
  );
}

const MenuItem = ({ onClick, title, subText, icon, extra }) => {
  return (
    <div
      className="w-full mx-auto bg-white rounded-lg flex items-center space-x-4 hover:cursor-pointer"
      onClick={onClick}
    >
      <div className="shrink-0 rounded-xl border-solid bg-gray-100 p-3">
        {icon}
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex-[4]">
          <div className="text-[16px] font-medium text-gray-700 mb-2">
            {title}
          </div>
          <p className="text-sm text-gray-600 font-[400]">{subText}</p>
        </div>
        {extra}
        <AiOutlineRight size={16} color="black" />
      </div>
    </div>
  );
};

export default withLayout(Account);
