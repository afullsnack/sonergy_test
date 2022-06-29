import withLayout from "../../components/Layout";
import OnboardCard from "../../components/OnboardCard";


function Market() {

  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-start w-full bg-transparent mobile:p-3 mb-8">
        <OnboardCard>
          <h2>Market Page Comming soon...</h2>
        </OnboardCard>
      </div>
    </div>
  );
}


export default withLayout(Market);