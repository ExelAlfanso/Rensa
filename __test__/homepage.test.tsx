import { render, screen } from "@testing-library/react";
import LandingPage from "@/app/home/page"; // adjust path if different

jest.mock("@/components/carousel/Carousel", () => {
  function CarouselMock() {
    return <div>CarouselMock</div>;
  }
  return CarouselMock;
});

jest.mock("@/components/navbar/HomeNavbar", () => {
  function NavbarMock() {
    return <nav>NavbarMock</nav>;
  }
  return NavbarMock;
});

jest.mock("@/components/footer/Footer", () => {
  function FooterMock() {
    return <footer>FooterMock</footer>;
  }
  return FooterMock;
});

jest.mock("@/sections/HeroSection", () => {
  function HeroMock() {
    return <section>HeroMock</section>;
  }
  return HeroMock;
});

// Mock Next.js <Image /> (because it doesn’t work well in Jest without mock)
jest.mock("next/image", () => {
  function NextImageMock(props: any) {
    // eslint-disable-next-line @next/next/no-img-element
    const { fill, ...rest } = props;
    return <img {...props} alt={props.alt || "mocked image"} />;
  }
  return NextImageMock;
});

// Mock Next.js <Link />
jest.mock("next/link", () => {
  function NextLinkMock({ href, children }: any) {
    return <a href={href}>{children}</a>;
  }
  return NextLinkMock;
});

describe("LandingPage", () => {
  it("renders main sections", () => {
    render(<LandingPage />);

    // Check if major sections are rendered
    expect(screen.getByText("NavbarMock")).toBeInTheDocument();
    expect(screen.getByText("HeroMock")).toBeInTheDocument();
    expect(screen.getByText("CarouselMock")).toBeInTheDocument();
    expect(screen.getByText("FooterMock")).toBeInTheDocument();
  });

  it("renders the CTA heading and button", () => {
    render(<LandingPage />);

    // Check for CTA heading
    expect(
      screen.getByRole("heading", { name: /Every Picture Holds a Secret/i })
    ).toBeInTheDocument();

    // Check for CTA button
    expect(
      screen.getByRole("button", { name: /Explore Now/i })
    ).toBeInTheDocument();
  });
});
