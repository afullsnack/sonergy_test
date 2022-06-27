import withLayout from "../../components/Layout";
import OnboardCard from "../../components/OnboardCard";


 function Login() {

  return (
    <>
      <OnboardCard>

        {/* <Input placeholder="Username"  /> */}
        <input type="text" placeholder="Daisy UI input" className="input input-bordered bg-transparent w-full max-w-xs object-cover" />
      </OnboardCard>
    </>
  );
}

export default withLayout(Login);