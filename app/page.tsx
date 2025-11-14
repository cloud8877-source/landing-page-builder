'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { enableDemoMode } from '@/lib/demo-mode';

export default function HomePage() {
  const router = useRouter();

  const handleTryDemo = () => {
    enableDemoMode();
    router.push('/builder/select-template');
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-body text-body-light dark:text-body-dark">
      {/* Hero Section */}
      <section className="py-20 sm:py-28 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-heading-light dark:text-heading-dark uppercase">
                Your Professional Property Website in 5 Minutes
              </h1>
              <h2 className="text-lg md:text-xl font-body text-muted-light dark:text-muted-dark">
                The #1 website builder for Malaysian property agents. Attract more clients, close more deals.
              </h2>
              <div className="flex justify-center lg:justify-start mt-4">
                <button
                  onClick={handleTryDemo}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden h-12 px-6 btn-brutalist"
                >
                  <span className="truncate">Create My Website for Free</span>
                </button>
              </div>
            </div>
            <div className="w-full laptop-wireframe aspect-video shadow-none"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-28 bg-surface-light dark:bg-surface-dark border-t border-b border-border-light dark:border-border-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-heading-light dark:text-heading-dark uppercase">
              Everything You Need to Succeed Online
            </h2>
            <p className="mt-4 text-lg font-body text-muted-light dark:text-muted-dark">
              PropSite Pro provides powerful features to help you build a stunning, professional website without any coding knowledge.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div className="flex flex-col items-center text-center p-6 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark shadow-none">
              <div className="size-12 mb-4 brutalist-icon">
                <span className="material-symbols-outlined text-3xl">bolt</span>
              </div>
              <h3 className="text-lg font-display font-bold text-heading-light dark:text-heading-dark uppercase">
                Instant Website Creation
              </h3>
              <p className="mt-2 text-sm font-body text-muted-light dark:text-muted-dark">
                Go from zero to a fully functional website in minutes. Just fill in your details and you&apos;re live!
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark shadow-none">
              <div className="size-12 mb-4 brutalist-icon">
                <span className="material-symbols-outlined text-3xl">touch_app</span>
              </div>
              <h3 className="text-lg font-display font-bold text-heading-light dark:text-heading-dark uppercase">
                No-Code, Easy to Use
              </h3>
              <p className="mt-2 text-sm font-body text-muted-light dark:text-muted-dark">
                Our intuitive builder is designed for non-technical agents. If you can fill a form, you can build a website.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark shadow-none">
              <div className="size-12 mb-4 brutalist-icon">
                <span className="material-symbols-outlined text-3xl">devices</span>
              </div>
              <h3 className="text-lg font-display font-bold text-heading-light dark:text-heading-dark uppercase">
                Mobile Responsive
              </h3>
              <p className="mt-2 text-sm font-body text-muted-light dark:text-muted-dark">
                Your website will look amazing on all devices—desktops, tablets, and smartphones.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark shadow-none">
              <div className="size-12 mb-4 brutalist-icon">
                <span className="material-symbols-outlined text-3xl">real_estate_agent</span>
              </div>
              <h3 className="text-lg font-display font-bold text-heading-light dark:text-heading-dark uppercase">
                Property Listings
              </h3>
              <p className="mt-2 text-sm font-body text-muted-light dark:text-muted-dark">
                Easily add, manage, and showcase your property listings with beautiful galleries and detailed info.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Builder Section */}
      <section className="py-20 sm:py-28 bg-white dark:bg-black" id="builder">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight text-heading-light dark:text-heading-dark uppercase">
              Build Your Website Instantly
            </h2>
            <p className="text-lg font-body text-muted-light dark:text-muted-dark">
              Follow the steps to create your professional online presence. No technical skills required.
            </p>
          </div>
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="pb-3 border-b border-border-light dark:border-border-dark">
              <div className="flex justify-center gap-4 sm:gap-8">
                <a className="flex flex-col items-center justify-center pb-3 pt-4 px-2 tab-brutalist active" href="#">
                  <p className="text-sm sm:text-base font-bold tracking-wide">1. Your Details</p>
                </a>
                <a className="flex flex-col items-center justify-center pb-3 pt-4 px-2 tab-brutalist" href="#">
                  <p className="text-sm sm:text-base font-bold tracking-wide">2. Your Listings</p>
                </a>
                <a className="flex flex-col items-center justify-center pb-3 pt-4 px-2 tab-brutalist" href="#">
                  <p className="text-sm sm:text-base font-bold tracking-wide">3. Final Touches</p>
                </a>
              </div>
            </div>
            <div className="pt-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 flex flex-col gap-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <label className="flex flex-col">
                      <p className="text-sm font-body font-medium pb-2 text-heading-light dark:text-heading-dark uppercase">Full Name</p>
                      <input className="form-input-brutalist flex w-full min-w-0 flex-1 resize-none overflow-hidden h-12 placeholder:text-muted-light dark:placeholder:text-muted-dark p-3 text-base font-normal" placeholder="e.g. Aina Binti Abdullah" />
                    </label>
                    <label className="flex flex-col">
                      <p className="text-sm font-body font-medium pb-2 text-heading-light dark:text-heading-dark uppercase">Agency Name</p>
                      <input className="form-input-brutalist flex w-full min-w-0 flex-1 resize-none overflow-hidden h-12 placeholder:text-muted-light dark:placeholder:text-muted-dark p-3 text-base font-normal" placeholder="e.g. Hartanah Realty" />
                    </label>
                    <label className="flex flex-col">
                      <p className="text-sm font-body font-medium pb-2 text-heading-light dark:text-heading-dark uppercase">Phone Number</p>
                      <input className="form-input-brutalist flex w-full min-w-0 flex-1 resize-none overflow-hidden h-12 placeholder:text-muted-light dark:placeholder:text-muted-dark p-3 text-base font-normal" placeholder="e.g. +60 12-345 6789" />
                    </label>
                    <label className="flex flex-col">
                      <p className="text-sm font-body font-medium pb-2 text-heading-light dark:text-heading-dark uppercase">Email Address</p>
                      <input className="form-input-brutalist flex w-full min-w-0 flex-1 resize-none overflow-hidden h-12 placeholder:text-muted-light dark:placeholder:text-muted-dark p-3 text-base font-normal" placeholder="you@example.com" type="email" />
                    </label>
                  </div>
                  <div>
                    <label className="flex flex-col">
                      <p className="text-sm font-body font-medium pb-2 text-heading-light dark:text-heading-dark uppercase">Agent Bio</p>
                      <textarea className="form-textarea-brutalist flex w-full min-w-0 flex-1 resize-y overflow-hidden min-h-[120px] placeholder:text-muted-light dark:placeholder:text-muted-dark p-3 text-base font-normal" placeholder="Tell your clients a little about yourself..."></textarea>
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-sm font-body font-medium text-heading-light dark:text-heading-dark uppercase">Upload Your Headshot</p>
                  <div className="relative flex flex-col items-center justify-center w-full aspect-square bg-background-light dark:bg-background-dark border-2 border-dashed border-border-light dark:border-border-dark cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center text-muted-light dark:text-muted-dark">
                      <span className="material-symbols-outlined text-4xl mb-3">cloud_upload</span>
                      <p className="mb-2 text-sm font-body"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs font-body">PNG, JPG or GIF (MAX. 800x800px)</p>
                    </div>
                    <input className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" id="dropzone-file" type="file" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-10">
                <button
                  onClick={handleTryDemo}
                  className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden h-12 px-6 btn-brutalist"
                >
                  <span className="truncate">Next: Add Listings</span>
                  <span className="material-symbols-outlined ml-2 text-lg">arrow_forward_ios</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="size-6 text-primary logo-svg-brutalist">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_6_543_footer)">
                    <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
                    <path clipRule="evenodd" d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z" fill="currentColor" fillRule="evenodd"></path>
                  </g>
                  <defs><clipPath id="clip0_6_543_footer"><rect fill="white" height="48" width="48"></rect></clipPath></defs>
                </svg>
              </div>
              <p className="text-base font-display font-bold text-heading-light dark:text-heading-dark uppercase">PropSite Pro</p>
            </div>
            <p className="text-sm font-body text-muted-light dark:text-muted-dark">&copy; 2024 PropSite Pro. All rights reserved.</p>
            <div className="flex gap-4">
              <a className="social-icon-brutalist hover:text-primary" href="#"><span className="sr-only">Facebook</span>
                <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fillRule="evenodd"></path></svg>
              </a>
              <a className="social-icon-brutalist hover:text-primary" href="#"><span className="sr-only">Instagram</span>
                <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.795 2.013 10.148 2 12.315 2zm0 1.623c-2.387 0-2.654.01-3.594.052a3.273 3.273 0 00-1.84.658 3.273 3.273 0 00-.658 1.84c-.042.94-.052 1.207-.052 3.594s.01 2.654.052 3.594c.048.838.217 1.483.658 1.84a3.273 3.273 0 001.84.658c.94.042 1.207.052 3.594.052s2.654-.01 3.594-.052a3.273 3.273 0 001.84-.658 3.273 3.273 0 00.658-1.84c.042-.94.052-1.207.052-3.594s-.01-2.654-.052-3.594a3.273 3.273 0 00-.658-1.84 3.273 3.273 0 00-1.84-.658c-.94-.042-1.207-.052-3.594-.052zM12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 1.623a3.512 3.512 0 110 7.024 3.512 3.512 0 010-7.024zM16.536 7.42a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" fillRule="evenodd"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
