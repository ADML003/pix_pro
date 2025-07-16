import TopNavigation from "@/components/shared/TopNavigation";
import { Toaster } from "@/components/ui/toaster";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="clean-layout">
      <TopNavigation />

      {/* Animated Background */}
      <div className="animated-background">
        <div className="floating-tech-objects">
          {/* Camera Icons */}
          <div className="tech-object tech-object-1">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23 19A2 2 0 0 1 21 21H3A2 2 0 0 1 1 19V8A2 2 0 0 1 3 6H7L9 3H15L17 6H21A2 2 0 0 1 23 8V19Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="13"
                r="4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* AI Brain */}
          <div className="tech-object tech-object-2">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L14 7L19 4L16 9L22 10L17 12L21 17L15 15L13 22L11 17L6 20L9 15L3 14L8 12L4 7L10 9L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="12"
                r="3"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Image/Picture Frame */}
          <div className="tech-object tech-object-3">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                ry="2"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                cx="8.5"
                cy="8.5"
                r="1.5"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M21 15L16 10L5 21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Processor/Chip */}
          <div className="tech-object tech-object-4">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="4"
                y="4"
                width="16"
                height="16"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
              />
              <rect
                x="8"
                y="8"
                width="8"
                height="8"
                rx="1"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M9 1V3M15 1V3M9 21V23M15 21V23M1 9H3M1 15H3M21 9H23M21 15H23"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Magic Wand */}
          <div className="tech-object tech-object-5">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 4V2M15 16V14M8 9H10M20 9H22M17.8 11.8L19.2 13.2M17.8 6.2L19.2 4.8M12.2 13.2L10.8 11.8M12.2 4.8L10.8 6.2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 16L3 22L9 20L5 16Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Layers */}
          <div className="tech-object tech-object-6">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="12,2 2,7 12,12 22,7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="2,17 12,22 22,17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="2,12 12,17 22,12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Filter */}
          <div className="tech-object tech-object-7">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Scan Lines */}
          <div className="tech-object tech-object-8">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 7V5A2 2 0 0 1 5 3H7M17 3H19A2 2 0 0 1 21 5V7M21 17V19A2 2 0 0 1 19 21H17M7 21H5A2 2 0 0 1 3 19V17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="7"
                y1="12"
                x2="17"
                y2="12"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        <div className="floating-particles">
          <div className="particle"></div>
          <div className="particle"></div>
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

      <div className="main-content">
        <div className="content-wrapper">{children}</div>
      </div>

      <Toaster />
    </main>
  );
};

export default Layout;
