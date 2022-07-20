import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ButtonPrimary } from "../../components/Button";
import withLayout from "../../components/Layout";
import OnboardCard from "../../components/OnboardCard";
import { BioData, Gender, updateUserBio } from "../../lib/mutations";
import { getUserProfile } from "../../lib/queries";

function Biodata() {
  /**
   * @Page => Login page
   * @States => email, password, isHidden
   * @Event => Call loginUser() mutation function and store the user token in localStorage/cookie
   */
  const queryClient = useQueryClient();
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["token"]);

  const { token } = cookies;

  /* States */
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dob, setDOB] = useState<string>("");
  const [gender, setGender] = useState<string | undefined>();
  const [address, setAddress] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  // Query - getUser
  const { data, isFetching, error } = useQuery(
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

  // DONE: setup useMutation
  const updateUserMutate = useMutation(updateUserBio, {
    onSuccess: (data) => {
      console.log(data, "Returned update data");
      if (data?.success) {
        // Go back if successful
        router.back();
      }
    },
    onError: () =>
      console.error("There was an error trying to update user bio"),
    onSettled: () => queryClient.invalidateQueries("getUser"),
  });

  useEffect(() => {
    setFirstName(data?.data?.fullName?.split(" ")[0]);
    setLastName(data?.data?.fullName?.split(" ")[1]);
    setDOB(data?.data?.dateOfBirth?.split("T")[0]);
    setGender(data?.data?.gender);
    setAddress(data?.data?.location);
    setCountry(data?.data?.country);
  }, [data, isFetching]);

  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-start w-full bg-transparent mobile:p-3 mb-5">
        <OnboardCard>
          {/* <progress className="progress bg-blue-300 w-full mb-2" value="50" max="100"></progress> */}
          <span className="text-lg font-[600] text-gray-700 mb-1">
            Bio Data
          </span>
          <span className="text-[14px] font-[400] text-gray-600 mb-4">
            Complete / Update your personal information.
          </span>

          {/* <span className="text-sm font-medium text-gray-800 mb-3">
            Responses
          </span> */}
          <div className="form-control mb-5 flex flex-row items-center justify-center space-x-3">
            <div className="flex-1">
              <label className="label">
                <span className="label-text text-slate-700 font-medium">
                  First Name
                </span>
              </label>
              <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
                {/* <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                  <FaUser color="#B8C4CE" />
                </span> */}
                <input
                  type="text"
                  placeholder="John"
                  className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-3 w-[100%]"
                  value={firstName}
                  onChange={(e) => {
                    console.log("First name", e.target.value);
                    setFirstName(e.target.value);
                  }}
                />
                {/* <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                  <FaCalendarAlt color="#B8C4CE" />
                </span> */}
              </label>
            </div>
            <div className="flex-1">
              <label className="label">
                <span className="label-text text-slate-700 font-medium">
                  Last Name
                </span>
              </label>
              <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
                {/* <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                  <FaUser color="#B8C4CE" />
                </span> */}
                <input
                  type="text"
                  placeholder="Doe"
                  className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-3 w-[100%]"
                  value={lastName}
                  onChange={(e) => {
                    console.log("Last name", e.target.value);
                    setLastName(e.target.value);
                  }}
                />
                {/* <span>USD</span> */}
              </label>
            </div>
          </div>
          {/* <span className="text-sm font-medium text-gray-800 mb-3">
            Number of questions
          </span> */}
          <div className="form-control mb-5">
            <label className="label">
              <span className="label-text text-slate-700 font-medium">
                Date of Birth
              </span>
            </label>
            <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
              {/* <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                <FaUser color="#B8C4CE" />
              </span> */}
              <input
                type="date"
                placeholder="DD/MM/YYYY"
                className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-3 w-[100%]"
                value={dob}
                onChange={(e) => {
                  console.log("DoB", e.target.valueAsDate, e.target.value);
                  setDOB(e.target.value);
                }}
              />
              {/* <span>USD</span> */}
            </label>
          </div>
          <div className="form-control mb-5">
            <label className="label">
              <span className="label-text text-slate-700 font-medium">
                Gender
              </span>
            </label>
            <select
              className="select select-bordered w-full bg-transparent text-slate-400"
              value={gender}
              onChange={(e) => {
                console.log("Gender", e.target.value);
                setGender(e.target.value);
              }}
            >
              <option disabled selected>
                - Select -
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-control mb-5">
            <label className="label">
              <span className="label-text text-slate-700 font-medium">
                Address
              </span>
            </label>
            <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
              {/* <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                <FaUser color="#B8C4CE" />
              </span> */}
              <input
                type="text"
                placeholder="Enter address"
                className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-3 w-[100%]"
                value={address}
                onChange={(e) => {
                  console.log("Address", e.target.value);
                  setAddress(e.target.value);
                }}
              />
              {/* <span>USD</span> */}
            </label>
          </div>
          <div className="form-control mb-5">
            <label className="label">
              <span className="label-text text-slate-700 font-medium">
                Nationality
              </span>
            </label>
            <select
              className="select select-bordered w-full bg-transparent text-slate-400"
              value={country}
              onChange={(e) => {
                console.log("Country", e.target.value);
              }}
            >
              <option disabled selected>
                - Select -
              </option>
              <option>Nigeria</option>
              <option>Algeria</option>
              <option>Canada</option>
              <option>Mali</option>
              <option>Ghana</option>
            </select>
          </div>

          <ButtonPrimary
            type="normal"
            text="Save"
            icon={undefined}
            iconPosition={undefined}
            block={true}
            onClick={async (e) => {
              console.log(e, "Save bio data");
              const data: BioData = {
                fullName: `${firstName} ${lastName}`,
                location: address,
                gender: gender as Gender,
                bio: "",
                dateOfBirth: new Date(dob),
                country: country,
              };

              // Call mutate
              updateUserMutate.mutate({ data, token });
            }}
            isLoading={updateUserMutate.isLoading}
          />
        </OnboardCard>
      </div>
    </div>
  );
}

export default withLayout(Biodata);
