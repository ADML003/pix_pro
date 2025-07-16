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
                  {navLinks.slice(1, 7).map((link) => (
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
      {/* Clean Home Dashboard */}
      <div className="home-dashboard">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h1 className="welcome-title">
            Welcome back, {user?.firstName || "User"}!
          </h1>
          <p className="welcome-subtitle">
            Transform your images with professional AI magic
          </p>
        </div>

        {/* Feature Cards */}
        <div className="feature-cards">
          {navLinks.slice(1, 7).map((link, index) => (
            <Link key={link.route} href={link.route} className="feature-card">
              <div className="card-icon">
                <Image
                  src={link.icon}
                  alt={link.label}
                  width={36}
                  height={36}
                />
              </div>
              <div className="card-content">
                <h3 className="card-title">{link.label}</h3>
                <p className="card-description">
                  {index === 0 &&
                    "Enhance image quality, sharpness, and clarity with advanced AI algorithms"}
                  {index === 1 &&
                    "Intelligently fill gaps and reconstruct missing parts of your images"}
                  {index === 2 &&
                    "Remove unwanted objects and backgrounds seamlessly with AI precision"}
                  {index === 3 &&
                    "Perfect color balance, contrast, and lighting for professional results"}
                  {index === 4 &&
                    "Intelligent cropping with automatic face and object detection"}
                  {index === 5 &&
                    "Optimize images for web while maintaining excellent visual quality"}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <div className="stat-item">
            <div className="stat-number">{user?.creditBalance || 0}</div>
            <div className="stat-label">Available Credits</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{images?.data?.length || 0}</div>
            <div className="stat-label">Images Processed</div>
          </div>
        </div>
      </div>

      {/* Recent Images Section */}
      <section className="recent-section">
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
