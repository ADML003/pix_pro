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
          {/* Enhanced Background */}
          <div className="login-background">
            {/* Animated Gradient Layers */}
            <div className="gradient-layer gradient-layer-1"></div>
            <div className="gradient-layer gradient-layer-2"></div>
            <div className="gradient-layer gradient-layer-3"></div>

            {/* Floating Elements */}
            <div className="floating-elements">
              <div className="floating-element floating-element-1"></div>
              <div className="floating-element floating-element-2"></div>
              <div className="floating-element floating-element-3"></div>
              <div className="floating-element floating-element-4"></div>
              <div className="floating-element floating-element-5"></div>
              <div className="floating-element floating-element-6"></div>
            </div>

            {/* Particle Effects */}
            <div className="particles">
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="login-content">
            <div className="login-card-wrapper">
              <div className="login-card">
                {/* Top Header with Logo and Login Button */}
                <div className="login-top-header">
                  <div className="login-logo-section">
                    <Image
                      src="/assets/images/logo-text.svg"
                      alt="PixPro logo"
                      width={160}
                      height={28}
                      className="login-logo"
                    />
                  </div>
                  <Link href="/sign-in" className="login-button">
                    Sign In
                  </Link>
                </div>

                <div className="login-header">
                  <h1 className="login-heading">
                    Professional AI Image Enhancement
                  </h1>
                  <p className="login-subtitle">
                    Sign in to elevate your images with professional AI magic
                  </p>
                </div>

                <div className="login-features">
                  {navLinks.slice(1, 5).map((link) => (
                    <div key={link.route} className="feature-item">
                      <div className="feature-icon">
                        <Image
                          src={link.icon}
                          alt="image"
                          width={20}
                          height={20}
                          className="w-5 h-5 icon-on-light-bg"
                        />
                      </div>
                      <p className="feature-text">{link.label}</p>
                    </div>
                  ))}
                </div>
              </div>
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
