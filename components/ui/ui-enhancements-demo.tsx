"use client";

import { useState } from "react";
import { PageTransition } from "./page-transition";
import { LoadingScreen, MinimalLoadingScreen } from "./loading-screen";
import { ScrollProgressBar, CircularScrollProgress } from "./scroll-progress-bar";
import { BackgroundPattern } from "./background-pattern";
import { ToastProvider, useToast } from "./toast-notification";
import { ModalDialog } from "./modal-dialog";
import { ImageGallery } from "./image-gallery";
import { AnimatedAccordion } from "./animated-accordion";
import { AnimatedTabs } from "./animated-tabs";
import { LazyLoadAnimation, StaggeredAnimation } from "./lazy-load-animation";
import { Skeleton, CardSkeleton, ListSkeleton } from "./skeleton-loader";
import { InfiniteScroll } from "./infinite-scroll";
import { DragDropList, DraggableCard } from "./drag-drop";
import { Timeline } from "./timeline";
import { AnimatedInput, AnimatedTextarea, AnimatedCheckbox } from "./animated-form";
import { MegaMenu } from "./mega-menu";
import {
  AdvancedCardHover,
  GlowingCardHover,
  MagneticCardHover,
} from "./advanced-card-hover";
import { Rocket, Zap, Star, Code } from "lucide-react";

// Demo component to showcase all UI enhancements
export function UIEnhancementsDemo() {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const { showToast } = useToast();

  // Sample data
  const images = [
    { src: "/placeholder1.jpg", alt: "Sample 1", title: "Image 1" },
    { src: "/placeholder2.jpg", alt: "Sample 2", title: "Image 2" },
    { src: "/placeholder3.jpg", alt: "Sample 3", title: "Image 3" },
  ];

  const accordionItems = [
    {
      title: "What is this?",
      content: <p>This is a demo of all 17 UI enhancement components.</p>,
      icon: <Rocket className="h-5 w-5" />,
    },
    {
      title: "How to use?",
      content: <p>Check the UI_ENHANCEMENTS_GUIDE.md for detailed usage.</p>,
      icon: <Code className="h-5 w-5" />,
    },
  ];

  const tabItems = [
    {
      label: "Features",
      content: <p>Amazing features with smooth animations!</p>,
      icon: <Star className="h-5 w-5" />,
    },
    {
      label: "Performance",
      content: <p>Optimized for best performance.</p>,
      icon: <Zap className="h-5 w-5" />,
    },
  ];

  const timelineEvents = [
    {
      title: "Project Started",
      date: "2024 Q1",
      description: <p>Initial setup and planning phase.</p>,
      icon: <Rocket className="h-5 w-5" />,
    },
    {
      title: "Development",
      date: "2024 Q2",
      description: <p>Building all components with animations.</p>,
      icon: <Code className="h-5 w-5" />,
    },
  ];

  const menuItems = [
    { label: "Home", href: "/" },
    {
      label: "Services",
      sections: [
        {
          title: "Design",
          items: [
            { label: "Web Design", href: "/design", description: "Beautiful UI/UX" },
            { label: "Branding", href: "/branding", description: "Brand identity" },
          ],
        },
        {
          title: "Development",
          items: [
            { label: "Frontend", href: "/frontend", description: "React & Next.js" },
            { label: "Backend", href: "/backend", description: "Node.js & APIs" },
          ],
        },
      ],
    },
  ];

  const [dragItems, setDragItems] = useState([
    { id: "1", content: <div className="text-white">Drag Item 1</div> },
    { id: "2", content: <div className="text-white">Drag Item 2</div> },
    { id: "3", content: <div className="text-white">Drag Item 3</div> },
  ]);

  const [infiniteItems, setInfiniteItems] = useState(
    Array.from({ length: 10 }, (_, i) => ({ id: i, name: `Item ${i + 1}` }))
  );

  const loadMoreItems = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newItems = Array.from({ length: 5 }, (_, i) => ({
      id: infiniteItems.length + i,
      name: `Item ${infiniteItems.length + i + 1}`,
    }));
    setInfiniteItems([...infiniteItems, ...newItems]);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Pattern */}
      <BackgroundPattern variant="dots" />

      {/* Scroll Progress */}
      <ScrollProgressBar position="top" />
      <CircularScrollProgress />

      {/* Loading Screens */}
      <LoadingScreen isLoading={loading} />

      {/* Page Content with Transition */}
      <PageTransition>
        <div className="container relative z-10 mx-auto space-y-16 px-4 py-20">
          {/* Header */}
          <LazyLoadAnimation animation="fade">
            <h1 className="text-center text-5xl font-bold">
              <span className="bg-gradient-to-r from-[#ccff00] to-[#ff0080] bg-clip-text text-transparent">
                UI Enhancements Demo
              </span>
            </h1>
          </LazyLoadAnimation>

          {/* Mega Menu */}
          <section className="flex justify-center">
            <MegaMenu items={menuItems} />
          </section>

          {/* Toast Demo */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#ccff00]">Toast Notifications</h2>
            <div className="flex gap-4">
              <button
                onClick={() => showToast("Success message!", "success")}
                className="rounded-lg bg-[#ccff00] px-4 py-2 text-black"
              >
                Show Success
              </button>
              <button
                onClick={() => showToast("Error occurred!", "error")}
                className="rounded-lg bg-[#ff0080] px-4 py-2 text-white"
              >
                Show Error
              </button>
            </div>
          </section>

          {/* Modal Demo */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#ccff00]">Modal Dialog</h2>
            <button
              onClick={() => setModalOpen(true)}
              className="rounded-lg border border-[#ccff00] px-4 py-2 transition-colors hover:bg-[#ccff00] hover:text-black"
            >
              Open Modal
            </button>
            <ModalDialog
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              title="Demo Modal"
            >
              <p>This is an animated modal with backdrop blur!</p>
            </ModalDialog>
          </section>

          {/* Advanced Card Hover Effects */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#ccff00]">Card Hover Effects</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <AdvancedCardHover>
                <div className="rounded-lg border border-white/10 bg-black/40 p-6 backdrop-blur-sm">
                  <h3 className="font-bold">3D Tilt Card</h3>
                  <p className="text-gray-400">Hover to see 3D effect</p>
                </div>
              </AdvancedCardHover>

              <GlowingCardHover>
                <div className="rounded-lg border border-white/10 bg-black/40 p-6 backdrop-blur-sm">
                  <h3 className="font-bold">Glowing Card</h3>
                  <p className="text-gray-400">Move cursor for glow</p>
                </div>
              </GlowingCardHover>

              <MagneticCardHover>
                <div className="rounded-lg border border-white/10 bg-black/40 p-6 backdrop-blur-sm">
                  <h3 className="font-bold">Magnetic Card</h3>
                  <p className="text-gray-400">Card follows cursor</p>
                </div>
              </MagneticCardHover>
            </div>
          </section>

          {/* Accordion */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#ccff00]">Animated Accordion</h2>
            <AnimatedAccordion items={accordionItems} />
          </section>

          {/* Tabs */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#ccff00]">Animated Tabs</h2>
            <AnimatedTabs items={tabItems} variant="pills" />
          </section>

          {/* Forms */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#ccff00]">Animated Form Components</h2>
            <div className="space-y-4">
              <AnimatedInput label="Email" type="email" placeholder="" />
              <AnimatedTextarea label="Message" placeholder="" />
              <AnimatedCheckbox
                label="Accept terms and conditions"
                checked={checkboxChecked}
                onChange={setCheckboxChecked}
              />
            </div>
          </section>

          {/* Skeleton Loaders */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#ccff00]">Skeleton Loaders</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <CardSkeleton />
              <ListSkeleton items={3} />
            </div>
          </section>

          {/* Timeline */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#ccff00]">Timeline Component</h2>
            <Timeline items={timelineEvents} orientation="vertical" />
          </section>

          {/* Drag and Drop */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#ccff00]">Drag & Drop</h2>
            <DragDropList items={dragItems} onReorder={setDragItems} />
          </section>

          {/* Infinite Scroll */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#ccff00]">Infinite Scroll</h2>
            <InfiniteScroll
              items={infiniteItems}
              renderItem={(item) => (
                <div className="rounded-lg border border-white/10 bg-black/40 p-4">
                  {item.name}
                </div>
              )}
              loadMore={loadMoreItems}
              hasMore={infiniteItems.length < 50}
            />
          </section>
        </div>
      </PageTransition>
    </div>
  );
}

// Wrapper with ToastProvider
export default function UIEnhancementsDemoWrapper() {
  return (
    <ToastProvider>
      <UIEnhancementsDemo />
    </ToastProvider>
  );
}
