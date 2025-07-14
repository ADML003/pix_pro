import { Collection } from "@/components/shared/Collection";
import { navLinks } from "@/constants";
import { getUserImages } from "@/lib/actions/image.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Home = async ({ searchParams }: SearchParamProps) => {
  const { userId } = auth();

  // Only show images if user is authenticated
  if (!userId) {
    return (
      <>
        <section className="home">
          <h1 className="home-heading">Professional AI Image Enhancement</h1>
          <p className="p-16-regular text-center text-white mt-4 px-4 max-w-md">
            Sign in to elevate your images with professional AI magic
          </p>
          <ul className="flex justify-center items-center w-full flex-wrap gap-3 sm:gap-6 md:gap-8 lg:gap-12 mt-8 px-2">
            {navLinks.slice(1, 5).map((link) => (
              <li
                key={link.route}
                className="flex-center flex-col gap-2 flex-shrink-0"
              >
                <Link href={link.route} className="flex-center flex-col gap-2">
                  <div className="flex-center w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full bg-white p-3 sm:p-4 shadow-lg hover:shadow-xl transition-shadow">
                    <Image
                      src={link.icon}
                      alt="image"
                      width={24}
                      height={24}
                      className="w-6 h-6 sm:w-7 sm:h-7 icon-on-light-bg"
                    />
                  </div>
                  <p className="p-12-medium sm:p-14-medium text-center text-white drop-shadow-md text-xs sm:text-sm max-w-16 sm:max-w-20">
                    {link.label}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </>
    );
  }

  const page = Number(searchParams?.page) || 1;

  // Get the user's database ID
  const user = await getUserById(userId);

  // Get only the current user's images
  const images = await getUserImages({
    page,
    userId: user._id,
  });

  return (
    <>
      <section className="home">
        <h1 className="home-heading">
          Elevate Your Images with Professional AI Magic
        </h1>
        <ul className="flex-center w-full gap-4 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 px-4">
          {navLinks.slice(1, 5).map((link) => (
            <li key={link.route} className="flex-center flex-col gap-2 min-w-0">
              <Link href={link.route} className="flex-center flex-col gap-2">
                <div className="flex-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white p-3 sm:p-4 shadow-lg hover:shadow-xl transition-shadow">
                  <Image
                    src={link.icon}
                    alt="image"
                    width={24}
                    height={24}
                    className="w-6 h-6 sm:w-6 sm:h-6 icon-on-light-bg"
                  />
                </div>
                <p className="p-12-medium sm:p-14-medium text-center text-white drop-shadow-md text-xs sm:text-sm">
                  {link.label}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="sm:mt-12">
        <Collection
          hasSearch={false}
          images={images?.data}
          totalPages={images?.totalPages}
          page={page}
        />
      </section>
    </>
  );
};

export default Home;
