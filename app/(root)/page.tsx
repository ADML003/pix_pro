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
        <div className="login-container">
          {/* Scrolling Background */}
          <div className="scrolling-bg">
            <div className="scroll-track scroll-track-1">
              <div className="scroll-item"></div>
              <div className="scroll-item"></div>
              <div className="scroll-item"></div>
              <div className="scroll-item"></div>
              <div className="scroll-item"></div>
              <div className="scroll-item"></div>
            </div>
            <div className="scroll-track scroll-track-2">
              <div className="scroll-item"></div>
              <div className="scroll-item"></div>
              <div className="scroll-item"></div>
              <div className="scroll-item"></div>
              <div className="scroll-item"></div>
              <div className="scroll-item"></div>
            </div>
            <div className="scroll-track scroll-track-3">
              <div className="scroll-item"></div>
              <div className="scroll-item"></div>
              <div className="scroll-item"></div>
              <div className="scroll-item"></div>
              <div className="scroll-item"></div>
              <div className="scroll-item"></div>
            </div>
          </div>

          {/* Overlay */}
          <div className="login-overlay"></div>

          {/* Content Card */}
          <div className="login-card">
            <h1 className="login-heading">Professional AI Image Enhancement</h1>
            <p className="login-subtitle">
              Sign in to elevate your images with professional AI magic
            </p>
            <div className="login-features">
              {navLinks.slice(1, 5).map((link) => (
                <div key={link.route} className="feature-item">
                  <div className="feature-icon">
                    <Image
                      src={link.icon}
                      alt="image"
                      width={24}
                      height={24}
                      className="w-6 h-6 icon-on-light-bg"
                    />
                  </div>
                  <p className="feature-text">{link.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
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
