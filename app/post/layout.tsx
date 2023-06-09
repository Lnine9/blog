import SideBar from "@/app/components/siderBar/SideBar";
import { getAllPost } from "@/libs/postUtil";
import SmallMenu from "@/app/components/siderBar/SmallMenu";

const paths = getAllPost().map((item) => ({
  slug: item.data.slug,
  title: item.data.title,
}));

const DocLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen-xl max-w-screen-xl mx-auto flex flex-col md:flex-row shadow-neutral-300 shadow-2xl">
      <SideBar paths={paths} />
      <SmallMenu paths={paths} />
      <div className="md:border-l-[1px] border-neutral-300 flex-1">
        {children}
      </div>
    </div>
  );
};

export default DocLayout;
