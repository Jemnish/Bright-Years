import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import DashboardHero from "@/app/components/Admin/sidebar/DashboardHero";
import AllUsers from "@/app/components/Admin/Users/AllUsers";
import Heading from "@/app/utils/Heading";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Heading
        title="Bright Years - Admin"
        description="Bright Years is an elderlearnig platform that supports lifelong learning."
        keywords="Bright Years, eLearning, Elderlearning, Lifelong learning"
      />
      <div className="flex h-screen">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHero />
          <AllUsers isTeam={false} />
        </div>
      </div>
    </div>
  );
};

export default page;
